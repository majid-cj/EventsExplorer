import React, {FC, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert, RefreshControl} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {LanguageIcon, Screen, ThemeIcon, ToolBar, Spacer, BackButton} from '~/core/components'
import {useAppStore} from '~/hooks'
import {strings} from '~/locale'
import {AppNavigationProps} from '~/navigation/types'

const ProfileScreen: FC = () => {
  const {navigate} = useNavigation<AppNavigationProps>()
  const {
    toggleAppLanguages,
    toggleTheme,
    favorites,
    favoriteEvents,
    toggleFavorite,
    getFavoriteEvents,
    theme,
    language,
  } = useAppStore()

  const [refreshing, setRefreshing] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  const styles = profileScreenStyles(theme)

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      if (favorites.length > 0) {
        getFavoriteEvents()
      }
    }
  }, [])

  useEffect(() => {
    if (hasInitialized && favorites.length > 0) {
      getFavoriteEvents()
    }
  }, [favorites.length])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await getFavoriteEvents()
    } catch (error) {
      console.error('Error refreshing favorites:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleEventPress = (id: string) => {
    navigate('DETAIL', {screen: 'EVENT', params: {id}})
  }

  const handleRemoveFavorite = (event: Event) => {
    Alert.alert(strings('removeFavorite'), strings('removeFavoriteConfirm').replace('{{eventName}}', event.name), [
      {
        text: strings('cancel'),
        style: 'cancel',
      },
      {
        text: strings('remove'),
        style: 'destructive',
        onPress: () => toggleFavorite(event),
      },
    ])
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return strings('dateTBA')
    }
  }

  const getEventImage = (event: Event): string => {
    const preferredImage = event.images?.find((img) => img.width >= 300 && img.height >= 200)
    return preferredImage?.url || event.images?.[0]?.url || ''
  }

  const getVenueName = (event: Event): string => {
    return event._embedded?.venues?.[0]?.name || strings('venueTBA')
  }

  const renderFavoriteItem = ({item}: {item: Event}) => {
    const imageUrl = getEventImage(item)
    const venueName = getVenueName(item)

    return (
      <TouchableOpacity style={styles.favoriteCard} onPress={() => handleEventPress(item.id)} activeOpacity={0.8}>
        <View style={styles.favoriteImageContainer}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.favoriteImage} resizeMode='cover' />
          ) : (
            <View style={styles.favoriteImagePlaceholder}>
              <Text style={styles.favoriteImagePlaceholderText}>🎫</Text>
            </View>
          )}
        </View>

        <View style={styles.favoriteContent}>
          <Text style={styles.favoriteEventName} numberOfLines={2}>
            {item.name}
          </Text>

          <View style={styles.favoriteDetails}>
            <Text style={styles.favoriteDetailText}>
              📅 {item.dates?.start?.localDate ? formatDate(item.dates.start.localDate) : strings('dateTBA')}
            </Text>
            <Text style={styles.favoriteDetailText} numberOfLines={1}>
              📍 {venueName}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.removeFavoriteButton}
          onPress={() => handleRemoveFavorite(item)}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Text style={styles.removeFavoriteIcon}>❤️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
      </View>

      <Text style={styles.profileTitle}>{strings('myProfile')}</Text>
      <Text style={styles.profileSubtitle}>
        {strings('favoriteEventsCount').replace('{{count}}', favorites.length.toString())}
      </Text>
    </View>
  )

  const renderSettingsSection = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>{strings('settings')}</Text>

      <View style={styles.settingsCard}>
        <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
          <View style={styles.settingLeft}>
            <ThemeIcon />
            <Text style={styles.settingText}>{strings('theme')}</Text>
          </View>
          <Text style={styles.settingValue}>{theme.dark ? strings('dark') : strings('light')}</Text>
        </TouchableOpacity>

        <View style={styles.settingDivider} />

        <TouchableOpacity style={styles.settingItem} onPress={toggleAppLanguages}>
          <View style={styles.settingLeft}>
            <LanguageIcon />
            <Text style={styles.settingText}>{strings('language')}</Text>
          </View>
          <Text style={styles.settingValue}>{language === 'en' ? strings('english') : strings('arabic')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderFavoritesSection = () => (
    <View style={styles.favoritesSection}>
      <View style={styles.favoritesHeader}>
        <Text style={styles.sectionTitle}>{strings('myFavorites')}</Text>
        <Text style={styles.favoritesCount}>
          {favorites.length} {favorites.length === 1 ? strings('event') : strings('events')}
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyFavorites}>
          <Text style={styles.emptyFavoritesIcon}>💔</Text>
          <Text style={styles.emptyFavoritesText}>{strings('noFavoriteEvents')}</Text>
          <Text style={styles.emptyFavoritesSubtext}>{strings('noFavoriteEventsSubtext')}</Text>
        </View>
      ) : favoriteEvents.loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{strings('loading')}</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteEvents.data || []}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
          ListEmptyComponent={
            favorites.length > 0 ? (
              <View style={styles.emptyFavorites}>
                <Text style={styles.emptyFavoritesText}>{strings('errorLoadingFavorites')}</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  )

  return (
    <Screen scroll header={<ToolBar back center={strings('profile')} />}>
      <View style={styles.container}>
        {renderProfileHeader()}
        {renderSettingsSection()}
        {renderFavoritesSection()}
        <Spacer size={'l128'} />
      </View>
    </Screen>
  )
}

const profileScreenStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerButton: {
      padding: 8,
    },
    profileHeader: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 20,
    },
    avatarContainer: {
      marginBottom: 16,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 32,
      color: 'white',
    },
    profileTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    profileSubtitle: {
      fontSize: 16,
      color: theme.colors.lightText,
    },
    settingsSection: {
      marginHorizontal: 20,
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 12,
    },
    settingsCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 4,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    settingText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    settingValue: {
      fontSize: 14,
      color: theme.colors.lightText,
      fontWeight: '500',
    },
    settingDivider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: 16,
    },
    favoritesSection: {
      marginHorizontal: 20,
    },
    favoritesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    favoritesCount: {
      fontSize: 14,
      color: theme.colors.lightText,
      fontWeight: '500',
    },
    emptyFavorites: {
      alignItems: 'center',
      paddingVertical: 48,
      paddingHorizontal: 20,
    },
    emptyFavoritesIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    emptyFavoritesText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyFavoritesSubtext: {
      fontSize: 14,
      color: theme.colors.lightText,
      textAlign: 'center',
      lineHeight: 20,
    },
    favoriteCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    favoriteImageContainer: {
      marginRight: 12,
    },
    favoriteImage: {
      width: 70,
      height: 70,
      borderRadius: 12,
    },
    favoriteImagePlaceholder: {
      width: 70,
      height: 70,
      borderRadius: 12,
      backgroundColor: theme.colors.branchBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoriteImagePlaceholderText: {
      fontSize: 20,
      opacity: 0.5,
    },
    favoriteContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    favoriteEventName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
      lineHeight: 20,
    },
    favoriteDetails: {
      gap: 4,
    },
    favoriteDetailText: {
      fontSize: 13,
      color: theme.colors.lightText,
    },
    removeFavoriteButton: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    removeFavoriteIcon: {
      fontSize: 20,
    },
    separator: {
      height: 12,
    },
    loadingContainer: {
      paddingVertical: 32,
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: theme.colors.lightText,
    },
  })

export default ProfileScreen

import {useNavigation} from '@react-navigation/native'
import React, {FC, useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'

import {EmptyList, Screen, Spacer, Spinner} from '~/core/components'
import {SearchView} from '~/core/components/cards'
import {useAppStore} from '~/hooks'
import {AppNavigationProps} from '~/navigation/types'
import SuggestedEvents from './components/SuggestedEvents'
import {strings} from '~/locale'

const HomeScreen: FC = () => {
  const {navigate} = useNavigation<AppNavigationProps>()
  const {suggestions, eventList, getSuggestedEvents, getEventsList, language, theme} = useAppStore()
  const [searchKeyword, setSearchKeyword] = useState('')

  const styles = homeScreenStyles(theme)

  useEffect(() => {
    getSuggestedEvents()
    getEventsList('')
  }, [language])

  const handleOnPress = (id: string) => {
    navigate('DETAIL', {screen: 'EVENT', params: {id}})
  }

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    getEventsList(keyword)
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
      return ''
    }
  }

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(`2000-01-01T${timeString}`)
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    } catch {
      return ''
    }
  }

  const getEventImage = (event: Event): string => {
    const preferredImage = event.images?.find((img) => img.width >= 300 && img.height >= 200)
    return preferredImage?.url || event.images?.[0]?.url || ''
  }

  const getVenueName = (event: Event): string => {
    return event._embedded?.venues?.[0]?.name || 'Venue TBA'
  }

  const getEventGenre = (event: Event): string => {
    return event.classifications?.[0]?.genre?.name || ''
  }

  const getCityState = (event: Event): string => {
    const venue = event._embedded?.venues?.[0]
    if (!venue) return ''

    const city = venue.city?.name || ''
    const state = venue.state?.stateCode || venue.state?.name || ''

    if (city && state) return `${city}, ${state}`
    return city || state || ''
  }

  const renderEventItem = ({item, index}: {item: Event; index: number}) => {
    const imageUrl = getEventImage(item)
    const venueName = getVenueName(item)
    const genre = getEventGenre(item)
    const cityState = getCityState(item)
    const isLastItem = index === (eventList.data?._embedded?.events?.length || 0) - 1

    return (
      <TouchableOpacity
        style={[styles.eventCard, isLastItem && styles.lastCard]}
        onPress={() => handleOnPress(item.id)}
        activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.eventImage} resizeMode='cover' />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>🎫</Text>
            </View>
          )}

          {item.dates?.status?.code && item.dates.status.code !== 'onsale' && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.dates.status.code.toUpperCase()}</Text>
            </View>
          )}
        </View>

        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventName} numberOfLines={2}>
              {item.name}
            </Text>
            {genre && (
              <View style={styles.genreChip}>
                <Text style={styles.genreChipText}>{genre}</Text>
              </View>
            )}
          </View>

          <View style={styles.eventDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📅</Text>
              <Text style={styles.detailText}>
                {item.dates?.start?.localDate ? formatDate(item.dates.start.localDate) : 'Date TBA'}
              </Text>
              {item.dates?.start?.localTime && (
                <Text style={styles.timeText}>• {formatTime(item.dates.start.localTime)}</Text>
              )}
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📍</Text>
              <Text style={styles.detailText} numberOfLines={1}>
                {venueName}
              </Text>
            </View>
            {cityState && (
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>🏙️</Text>
                <Text style={styles.detailText}>{cityState}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderHeader = () => (
    <>
      {suggestions.data && (
        <SuggestedEvents events={suggestions.data._embedded.events} title={strings('suggestedEvents')} />
      )}
      {eventList.data && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchKeyword ? `${strings('searchResults')} "${searchKeyword}"` : strings('allEvents')}
          </Text>
          {eventList.data?._embedded?.events && (
            <Text style={styles.resultCount}>
              {eventList.data._embedded.events.length === 1
                ? strings('oneResult')
                : strings('resultCount').replace('{{count}}', eventList.data._embedded.events.length.toString())}
            </Text>
          )}
        </View>
      )}
    </>
  )

  return (
    <Screen>
      <View style={{width: '100%'}}>
        <SearchView onSearch={handleSearch} />
      </View>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={eventList.data?._embedded?.events}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderEventItem}
        ListEmptyComponent={
          eventList.loading ? (
            <Spinner />
          ) : (
            <EmptyList error={searchKeyword ? strings('noEventsFound') : strings('noEventsAvailable')} />
          )
        }
        ListFooterComponent={<Spacer size={'l128'} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}

const homeScreenStyles = (theme: any) =>
  StyleSheet.create({
    eventCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.card,
      marginHorizontal: 16,
      marginVertical: 6,
      borderRadius: 16,
      padding: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    lastCard: {
      marginBottom: 20,
    },
    imageContainer: {
      position: 'relative',
    },
    eventImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
    },
    imagePlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: theme.colors.branchBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 24,
      opacity: 0.5,
    },
    statusBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: theme.colors.danger,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      minWidth: 16,
    },
    statusText: {
      color: 'white',
      fontSize: 8,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    eventContent: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'space-between',
    },
    eventHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    eventName: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      lineHeight: 20,
      marginRight: 8,
    },
    genreChip: {
      backgroundColor: theme.colors.accent,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    genreChipText: {
      color: 'white',
      fontSize: 10,
      fontWeight: '600',
    },
    eventDetails: {
      gap: 4,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailIcon: {
      fontSize: 12,
      marginRight: 6,
      width: 16,
    },
    detailText: {
      fontSize: 13,
      color: theme.colors.lightText,
      flex: 1,
    },
    timeText: {
      fontSize: 13,
      color: theme.colors.lightText,
      marginLeft: 4,
    },
    chevron: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 8,
    },
    chevronText: {
      fontSize: 20,
      color: theme.colors.lightText,
      fontWeight: '300',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
    },
    resultCount: {
      fontSize: 14,
      color: theme.colors.lightText,
    },
  })

export default HomeScreen

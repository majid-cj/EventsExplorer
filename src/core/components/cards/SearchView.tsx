import React, {FC, useState, useCallback} from 'react'
import {AppTheme, useNavigation} from '@react-navigation/native'
import {StyleSheet, TextInput, View, TouchableOpacity, Animated, Easing, Text, Pressable} from 'react-native'

import {SearchIcon, UserIcon} from '~/core/resource/icons/common'
import {useAppStore} from '~/hooks'
import {strings} from '~/locale'
import {AppNavigationProps} from '~/navigation/types'

interface SearchViewProps {
  onSearch: (input: string) => void
}

export const SearchView: FC<SearchViewProps> = ({onSearch}) => {
  const {theme} = useAppStore()
  const {navigate} = useNavigation<AppNavigationProps>()
  const [searchText, setSearchText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [scaleValue] = useState(new Animated.Value(1))

  const styles = searchViewStyle(theme)

  const handleTextChange = useCallback(
    (text: string) => {
      setSearchText(text)
      onSearch(text)
    },
    [onSearch]
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    Animated.timing(scaleValue, {
      toValue: 1.02,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start()
  }, [scaleValue])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start()
  }, [scaleValue])

  const clearSearch = useCallback(() => {
    setSearchText('')
    onSearch('')
  }, [onSearch])

  const handleOnProfile = () => {
    navigate('PROFILE')
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={handleOnProfile}>
        <UserIcon size={32} />
      </Pressable>
      <Animated.View
        style={[
          styles.searchContainer,
          {
            transform: [{scale: scaleValue}],
            borderColor: isFocused ? theme.colors.primary : theme.colors.border,
            borderWidth: isFocused ? 2 : 1,
          },
        ]}>
        <SearchIcon color={isFocused ? theme.colors.primary : theme.colors.lightText} size={20} />

        <TextInput
          value={searchText}
          placeholder={strings('search') || 'Search events...'}
          placeholderTextColor={theme.colors.lightText}
          style={styles.searchField}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType='search'
          autoCapitalize='none'
          autoCorrect={false}
          blurOnSubmit={false}
          clearButtonMode='never'
          autoFocus={false}
        />

        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={clearSearch}
            style={styles.clearButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            activeOpacity={0.7}>
            <View style={styles.clearIcon}>
              <Text style={styles.clearText}>✕</Text>
            </View>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  )
}

const searchViewStyle = ({colors, space}: AppTheme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: space.medium,
      marginVertical: space.medium,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profileContainer: {
      flex: 0,
      marginEnd: space.small,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.lightBackground,
      borderRadius: space.medium + 4,
      paddingHorizontal: space.medium,
      paddingVertical: space.small + 2,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    searchField: {
      flex: 1,
      marginLeft: space.small,
      fontSize: 16,
      color: colors.text,
      paddingVertical: 0,
      minHeight: 20,
    },
    clearButton: {
      padding: 4,
    },
    clearIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.lightText,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearText: {
      color: colors.lightBackground,
      fontSize: 12,
      fontWeight: 'bold',
    },
  })

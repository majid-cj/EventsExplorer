import React from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useTheme} from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import {strings} from '~/locale'
import {AppNavigationProps} from '~/navigation/types'

interface SuggestedEventsProps {
  events: Event[]
  title?: string
}

const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

const SuggestedEvents: React.FC<SuggestedEventsProps> = ({events, title = 'Suggested Events'}) => {
  const navigation = useNavigation<AppNavigationProps>()
  const theme = useTheme()

  const handleOnPress = (id: string) => {
    navigation.navigate('DETAIL', {screen: 'EVENT', params: {id}})
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
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
    const preferredImage = event.images?.find((img) => img.ratio === '16_9' && img.width >= 640)
    return preferredImage?.url || event.images?.[0]?.url || ''
  }

  const getVenueName = (event: Event): string => {
    return event._embedded?.venues?.[0]?.name || ''
  }

  const getEventGenre = (event: Event): string => {
    return event.classifications?.[0]?.genre?.name || ''
  }

  const cardWidth = screenWidth * 0.9
  const cardHeight = screenHeight * 0.2

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: theme.colors.text}]}>{title || strings('suggestedEvents')}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate='fast'
        snapToInterval={cardWidth + 16}
        snapToAlignment='start'>
        {events.map((event, index) => {
          const imageUrl = getEventImage(event)
          const venueName = getVenueName(event)
          const genre = getEventGenre(event)

          return (
            <TouchableOpacity
              key={event.id}
              style={[
                styles.card,
                {
                  width: cardWidth,
                  height: cardHeight,
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
                index === 0 && styles.firstCard,
                index === events.length - 1 && styles.lastCard,
              ]}
              onPress={() => handleOnPress(event.id)}
              activeOpacity={0.8}>
              {imageUrl ? (
                <Image source={{uri: imageUrl}} style={styles.image} resizeMode='cover' />
              ) : (
                <View style={[styles.imagePlaceholder, {backgroundColor: theme.colors.branchBackground}]}>
                  <Text style={[styles.placeholderText, {color: theme.colors.lightText}]}>{strings('noImage')}</Text>
                </View>
              )}
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.gradient} />

              <View style={styles.cardContent}>
                <View style={styles.topContent}>
                  {genre && (
                    <View style={[styles.genreTag, {backgroundColor: theme.colors.accent}]}>
                      <Text style={styles.genreText}>{genre.toUpperCase()}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.bottomContent}>
                  <Text style={styles.eventName} numberOfLines={2} ellipsizeMode='tail'>
                    {event.name}
                  </Text>

                  <View style={styles.eventDetails}>
                    <View style={styles.dateTimeContainer}>
                      {event.dates?.start?.localDate && (
                        <Text style={styles.dateText}>{formatDate(event.dates.start.localDate)}</Text>
                      )}
                      {event.dates?.start?.localTime && (
                        <Text style={styles.timeText}>{formatTime(event.dates.start.localTime)}</Text>
                      )}
                    </View>

                    {venueName && (
                      <Text style={styles.venueText} numberOfLines={1} ellipsizeMode='tail'>
                        📍 {venueName}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              {event.dates?.status?.code && event.dates.status.code !== 'onsale' && (
                <View style={[styles.statusBadge, {backgroundColor: theme.colors.danger}]}>
                  <Text style={styles.statusText}>{event.dates.status.code.toUpperCase()}</Text>
                </View>
              )}
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  scrollContainer: {
    paddingLeft: 16,
  },
  card: {
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    position: 'relative',
  },
  firstCard: {
    marginLeft: 0,
  },
  lastCard: {
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  genreTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genreText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomContent: {
    gap: 8,
  },
  eventName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  eventDetails: {
    gap: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  venueText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})

export default SuggestedEvents

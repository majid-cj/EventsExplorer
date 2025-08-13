import React, {FC, useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Linking, Alert} from 'react-native'
import {Screen, ToolBar} from '~/core/components'
import {useAppStore} from '~/hooks'
import {ScreenProps} from '~/navigation/types'
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import {strings} from '~/locale'

const {width: screenWidth} = Dimensions.get('window')

const DetailsScreen: FC<ScreenProps> = ({route}) => {
  const {getEventDetail, event, toggleFavorite, eventToggled, theme} = useAppStore()
  const [imageHeight, setImageHeight] = useState(250)
  const [mapReady, setMapReady] = useState(false)

  const styles = detailsScreenStyles(theme)

  useEffect(() => {
    const {id = ''} = route.params as {id: string}
    if (id) {
      getEventDetail(id)
    }
  }, [route])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return strings('dateTBA')
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

  const getEventImage = () => {
    if (!event.data?.images) return ''
    const preferredImage = event.data.images.find((img) => img.width >= 1024 && img.height >= 576)
    return preferredImage?.url || event.data.images[0]?.url || ''
  }

  const getVenue = () => {
    return event.data?._embedded?.venues?.[0]
  }

  const getAttraction = () => {
    return event.data?._embedded?.attractions?.[0]
  }

  const isValidLocation = (venue: any) => {
    if (!venue?.location) return false
    const lat = parseFloat(venue.location.latitude)
    const lng = parseFloat(venue.location.longitude)

    return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && lat !== 0 && lng !== 0
  }

  const handleFavoriteToggle = () => {
    if (event.data) {
      toggleFavorite(event.data)
    }
  }

  const handleTicketPress = () => {
    if (event.data?.url) {
      Linking.openURL(event.data.url).catch(() => {
        Alert.alert(strings('error'), strings('unableToOpenTicketLink'))
      })
    }
  }

  const handleDirections = () => {
    const venue = getVenue()
    if (venue?.location) {
      const {latitude, longitude} = venue.location
      const url = `https://maps.google.com/?q=${latitude},${longitude}`
      Linking.openURL(url).catch(() => {
        Alert.alert(strings('error'), strings('unableToOpenDirections'))
      })
    }
  }

  const isFavorite = event.data ? eventToggled(event.data.id) : false
  const venue = getVenue()
  const attraction = getAttraction()
  const eventImage = getEventImage()

  const renderHeader = () => (
    <ToolBar
      back
      center={event.data?.classifications?.[0]?.segment?.name || strings('event')}
      menuButton={
        event.data && (
          <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        )
      }
    />
  )
  const renderMap = () => {
    if (!venue || !isValidLocation(venue)) {
      return null
    }

    const latitude = parseFloat(venue.location.latitude)
    const longitude = parseFloat(venue.location.longitude)

    return (
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          cacheEnabled={true}
          onMapReady={() => setMapReady(true)}
          loadingEnabled={true}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}>
          {mapReady && (
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
              title={venue.name}
            />
          )}
        </MapView>
        <TouchableOpacity style={styles.directionsButton} onPress={handleDirections}>
          <Text style={styles.directionsText}>{strings('getDirections')}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (event.loading) {
    return <Screen loading={true} header={<ToolBar back center={strings('loading')} />} />
  }

  if (!event.data) {
    return (
      <Screen header={renderHeader()}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{strings('eventNotFound')}</Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen header={renderHeader()}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {eventImage ? (
            <Image
              source={{uri: eventImage}}
              style={[styles.heroImage, {height: imageHeight}]}
              resizeMode='cover'
              onLayout={(event) => {
                const {width} = event.nativeEvent.layout
                setImageHeight(width * 0.6)
              }}
            />
          ) : (
            <View style={[styles.imagePlaceholder, {height: imageHeight}]}>
              <Text style={styles.placeholderText}>🎫</Text>
              <Text style={styles.placeholderSubtext}>{strings('noImageAvailable')}</Text>
            </View>
          )}
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.imageGradient} />
          {event.data.dates?.status?.code && event.data.dates.status.code !== 'onsale' && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{event.data.dates.status.code.toUpperCase()}</Text>
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.eventTitle}>{event.data.name}</Text>
          {event.data.classifications && (
            <View style={styles.tagsContainer}>
              {event.data.classifications.map((classification, index) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreTagText}>{classification.genre?.name || classification.segment?.name}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>📅 {strings('when')}</Text>
            <Text style={styles.infoText}>
              {event.data.dates?.start?.localDate ? formatDate(event.data.dates.start.localDate) : strings('dateTBA')}
            </Text>
            {event.data.dates?.start?.localTime && (
              <Text style={styles.infoSubtext}>{formatTime(event.data.dates.start.localTime)}</Text>
            )}
          </View>
          {venue && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>📍 {strings('where')}</Text>
              <Text style={styles.infoText}>{venue.name}</Text>
              {venue.city && (
                <Text style={styles.infoSubtext}>
                  {venue.city.name}
                  {venue.state?.name && `, ${venue.state.name}`}
                  {venue.country?.name && `, ${venue.country.name}`}
                </Text>
              )}
              {renderMap()}
            </View>
          )}
          {attraction && (
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>🎭 {strings('artist')}</Text>
              <Text style={styles.infoText}>{attraction.name}</Text>
              {attraction.externalLinks && (
                <View style={styles.socialLinks}>
                  {attraction.externalLinks.homepage && (
                    <TouchableOpacity
                      style={styles.socialButton}
                      onPress={() => Linking.openURL(attraction.externalLinks.homepage[0].url)}>
                      <Text style={styles.socialButtonText}>{strings('website')}</Text>
                    </TouchableOpacity>
                  )}
                  {attraction.externalLinks.spotify && (
                    <TouchableOpacity
                      style={styles.socialButton}
                      onPress={() => Linking.openURL(attraction.externalLinks.spotify[0].url)}>
                      <Text style={styles.socialButtonText}>Spotify</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.ticketButton} onPress={handleTicketPress}>
              <Text style={styles.ticketButtonText}>🎫 {strings('getTickets')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.favoriteActionButton, isFavorite && styles.favoriteActive]}
              onPress={handleFavoriteToggle}>
              <Text style={styles.favoriteActionText}>
                {isFavorite ? `❤️ ${strings('favorited')}` : `🤍 ${strings('addToFavorites')}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
}

const detailsScreenStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      marginBottom: 24,
    },
    favoriteButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoriteIcon: {
      fontSize: 24,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      color: theme.colors.lightText,
    },
    imageContainer: {
      position: 'relative',
    },
    heroImage: {
      width: screenWidth,
    },
    imagePlaceholder: {
      width: screenWidth,
      backgroundColor: theme.colors.branchBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 48,
      marginBottom: 8,
    },
    placeholderSubtext: {
      fontSize: 16,
      color: theme.colors.lightText,
    },
    imageGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 100,
    },
    statusBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: theme.colors.danger,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    statusBadgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    contentContainer: {
      padding: 20,
    },
    eventTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
      lineHeight: 34,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 24,
      gap: 8,
    },
    genreTag: {
      backgroundColor: theme.colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    genreTagText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    infoSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    infoText: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 4,
      fontWeight: '500',
    },
    infoSubtext: {
      fontSize: 14,
      color: theme.colors.lightText,
    },
    mapContainer: {
      marginTop: 12,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      height: 200,
    },
    map: {
      flex: 1,
    },
    directionsButton: {
      position: 'absolute',
      bottom: 12,
      right: 12,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    directionsText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    socialLinks: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    socialButton: {
      backgroundColor: theme.colors.branchBackground,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
    },
    socialButtonText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: '500',
    },
    actionButtons: {
      gap: 12,
      marginTop: 12,
      marginBottom: 40,
    },
    ticketButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    ticketButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    favoriteActionButton: {
      backgroundColor: theme.colors.branchBackground,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    favoriteActive: {
      backgroundColor: theme.colors.accent + '20',
      borderColor: theme.colors.accent,
    },
    favoriteActionText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
  })

export default DetailsScreen

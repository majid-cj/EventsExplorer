import {useEffect, useState} from 'react'

import ReactNativeBiometrics from 'react-native-biometrics'
import {strings} from '~/locale'

interface AuthenticationProps {
  callBack: () => void
  onError?: (error: any) => void
}

type Compatible = 'compatible' | 'not_compatible' | 'initiate'

type Authentication = {
  compatible: Compatible
  checkAuthentication: () => Promise<void>
  isLoading: boolean
}

const useAuthentication = ({callBack, onError}: AuthenticationProps): Authentication => {
  const [compatible, setCompatible] = useState<Compatible>('initiate')
  const [isLoading, setIsLoading] = useState(false)

  const rnBiometrics = new ReactNativeBiometrics()

  useEffect(() => {
    checkBiometrics()
  }, [])

  async function checkAuthentication(): Promise<void> {
    if (isLoading) return

    setIsLoading(true)

    try {
      const {available} = await rnBiometrics.isSensorAvailable()

      if (!available) {
        setCompatible('not_compatible')
        throw new Error(strings('biometricsNotAvailable'))
      }

      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: strings('biometricPromptMessage'),
        cancelButtonText: strings('cancel'),
      })

      if (success) {
        callBack()
      } else if (error) {
        throw new Error(error)
      }
    } catch (error) {
      console.error('Authentication failed:', error)
      if (onError) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function checkBiometrics() {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable()

      console.log('Biometry available:', available, 'Type:', biometryType)

      setCompatible(available ? 'compatible' : 'not_compatible')
    } catch (error) {
      console.error('Error checking biometrics:', error)
      setCompatible('not_compatible')
    }
  }

  return {
    compatible,
    checkAuthentication,
    isLoading,
  }
}

export default useAuthentication

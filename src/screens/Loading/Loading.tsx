import {ActivityIndicator, View} from 'react-native'
import React, {useEffect} from 'react'
import {walletStore} from '@/stores/wallet.store'
import {useNavigation} from 'react-navigation-hooks'

export const Loading: React.FC = () => {
  const {navigate} = useNavigation()
  
  async function auth() {
    try {
      const key = await walletStore.getPrivateKey()
      
      if (key) {
        await walletStore.init(key)
        navigate('Home')
      } else {
        navigate('AccessWallet')
      }
    } catch (e) {
      return e
    }
  }
  
  useEffect(() => {
    auth().then(() => {
      console.log('Auth')
    })
  }, [])
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ActivityIndicator size={'large'} color={'tomato'}/>
    </View>
  )
}

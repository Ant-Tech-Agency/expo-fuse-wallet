import {ActivityIndicator, View} from 'react-native'
import React, {useEffect} from 'react'
import {walletStore} from '@/stores/wallet.store'
import {useNavigation} from 'react-navigation-hooks'

export const Loading: React.FC = () => {
  const {navigate} = useNavigation()
  
  useEffect(() => {
    walletStore.getPrivateKey()
      .then(key => {
        console.log(key)
        if (key) {
          navigate('Home')
        } else {
          navigate('AccessWallet')
        }
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

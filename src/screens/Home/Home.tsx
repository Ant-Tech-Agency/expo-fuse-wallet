import {SafeAreaView, Text, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {walletEffect} from '@/effects/wallet.effect'
import {useNavigation} from 'react-navigation-hooks'
import {walletStore} from '@/stores/wallet.store'

export const Home: React.FC = () => {
  const {navigate} = useNavigation()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  
  useEffect(() => {
    setLoading(true)
    walletEffect.balance()
      .then((value) => {
        console.log(value)
        setBalance(value)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <Text style={{
        fontSize: 20,
        textAlign: 'center'
      }}>Fusion Balance: </Text>
      <Text style={{
        fontSize: 20,
        textAlign: 'center'
      }}>
        {
          loading ?
            'Loading...' :
            `${balance} FSN`
        }
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#81AFE0',
          padding: 10,
          margin: 10,
          width: '100%'
        }}
        onPress={async () => {
          await walletStore.deletePrivateKey()
          navigate('AccessWallet')
        }}
      >
        <Text style={{
          color: 'white',
          fontSize: 16,
        }}>
          Log out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

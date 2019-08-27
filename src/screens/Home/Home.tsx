import {SafeAreaView, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {walletEffect} from '@/effects/wallet.effect'

export const Home: React.FC = () => {
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
    </SafeAreaView>
  )
}

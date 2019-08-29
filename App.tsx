import './global'
import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {Navigator} from '@/navigator'
import {web3Store} from '@/stores/web3.store'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

web3Store.init()

export default function App() {
  useEffect(() => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status !== 'granted') {
          throw new Error('Error location')
        }
        
        return Location.getCurrentPositionAsync({})
      })
      .then(location => {
        console.log(location)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  
  return (
    <View style={s.container}>
      <Navigator/>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
})

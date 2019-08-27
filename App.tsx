import './global'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Navigator} from '@/navigator'
import {web3Store} from '@/stores/web3.store'

web3Store.init()

export default function App() {
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

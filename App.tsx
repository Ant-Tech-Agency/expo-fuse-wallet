import './global'
import React, {useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Web3 from 'web3'
import Web3FusionExtend from 'web3-fusion-extend'

// 46688
const provider = new Web3.providers.WebsocketProvider(
  'wss://testnetpublicgateway1.fusionnetwork.io:10001'
)

provider.on('data', () => {
  console.log('connected')
})

provider.on('error', () => {
  console.log('error')
})

const web3 = new Web3(provider)
const web3FusionExtend = Web3FusionExtend.extend(web3)

export default function App() {
  useEffect(() => {
    web3.eth
      .getBlock(200)
      .then(block => {
        console.log(block)
      })
      .catch(err => {
        console.log('error', err)
      })
  }, [])
  
  function getAllBalances() {
    web3FusionExtend.fsn
      .getAllBalances('0xC4A9441afB052cB454240136CCe71Fb09316EA94')
      .then(balances => {
        console.log(balances)
      })
      .catch(err => {
        console.log('error', err)
      })
  }
  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableOpacity onPress={getAllBalances}>
        <Text>Get all balance</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

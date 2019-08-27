import './global'
import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {walletStore} from './src/stores/wallet.store'
import {MyEtherWallet} from './src/libs/myetherwallet'
import {web3Store} from './src/stores/web3.store'

web3Store.init()

export default function App() {
  const [privateKey, setPrivateKey] = useState('B2A6B4E1E510FE05AB051C9944B433427D90F2D117E1B32248A1B811BCDB54F9')
  
  function onUnlock() {
    walletStore.wallet = new MyEtherWallet(privateKey)
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          borderWidth: 1,
          width: '100%',
          padding: 20,
          fontSize: 16
        }}
        value={privateKey}
        onChangeText={setPrivateKey}
      />
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: 'tomato'
        }}
        onPress={onUnlock}
      >
        <Text>Unlock</Text>
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

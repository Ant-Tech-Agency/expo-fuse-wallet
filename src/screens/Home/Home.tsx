import {Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {WalletEffect, walletEffect} from '@/effects/wallet.effect'
import {useNavigation} from 'react-navigation-hooks'
import {walletStore} from '@/stores/wallet.store'
import styles from './Styles'
import {images} from '@/themes'
import {AInput} from '@/components'
import Styles from '@/screens/AccessWallet/Styles'

export const Home: React.FC = () => {
  const {navigate} = useNavigation()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [assets, setAssets] = useState({})
  
  useEffect(() => {
    setLoading(true)
    walletEffect.getAllBalances()
      .then(balances => {
        setBalance(balances[walletEffect.FSN_TOKEN_ADDRESS] / WalletEffect.normalizeBalance(18))
        setAssets(balances)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <Image style={Styles.logo} source={require('../../../assets/logo.png')}/>
          <Text style={styles.titleScreen}>
            Wallet Info
          </Text>
          <View style={{flex: 1}}>
            <Text style={styles.textCategory}>Fusion Balance: </Text>
            <View style={styles.wrapBalance}>
              <Text style={styles.textBalance}>
                {
                  loading ?
                    'Loading...' :
                    `${balance}`
                } <Text style={styles.textCategory}>FSN</Text>
              </Text>
            </View>
            <Text style={styles.textCategory}>Public Address:</Text>
            <Text style={styles.textPublicAddress}>{walletStore.wallet.address}</Text>
          </View>
          <View style={styles.wrapInput}>
            <Text style={styles.titleFeature}>
              Asset Creation
            </Text>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <AInput name={'Asset Name:'}/>
              <AInput name={'Supply:'}/>
              <TouchableOpacity
                style={styles.button}
              >
                <Text style={styles.titleButton}>
                  Create Asset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapInput}>
            <Text style={styles.titleFeature}>
              Send Asset
            </Text>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <AInput name={'To:'}/>
              <AInput name={'Quantity:'}/>
              <TouchableOpacity
                style={styles.button}
              >
                <Text style={styles.titleButton}>
                  Send Asset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
              fontSize: 16
            }}>
              Log out
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

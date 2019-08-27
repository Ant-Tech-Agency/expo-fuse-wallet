import { Image, KeyboardAvoidingView, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import {WalletEffect, walletEffect} from '@/effects/wallet.effect'
import {useNavigation} from 'react-navigation-hooks'
import {walletStore} from '@/stores/wallet.store'
import {images, metrics} from '@/themes'
import {AInput} from '@/components'
import Styles from '@/screens/AccessWallet/Styles'
import { HomeBalance } from '@/screens/Home/components/HomeBalance'
import { HomeInfo } from '@/screens/Home/components/HomeInfo'

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior="position" enabled style={styles.container}>
        <Image style={styles.logo} source={images.logo} />
        <Text style={styles.titleScreen}>
          Wallet Info
        </Text>
        <HomeBalance
	        balance={balance}
	        loading={loading}
        />
        <HomeInfo
	        name={'Asset Creation'}
	        titleField1={'Asset Name:'}
	        titleField2={'Supply:'}
	        titleButton={'Create Asset'}
        />
        <HomeInfo
	        name={'Send Asset'}
	        titleField1={'To:'}
	        titleField2={'Quantity:'}
	        titleButton={'Send Asset'}
        />
        <TouchableOpacity
        	style={styles.buttonLogOut}
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
  )
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: '5%',
		marginBottom: 30
	},
	logo: {
		position: 'absolute',
		height: metrics.screenWidth / 7,
		width: metrics.screenWidth / 3,
		top: 20,
		left: '-5%'
	},
	titleScreen: {
		marginTop: '20%',
		marginBottom: 30,
		textDecorationLine: 'underline',
		fontWeight: '700',
		fontSize: 20,
		textAlign: 'center'
	},
	textCategory: {
		fontSize: 20
	},
	buttonLogOut: {
		alignSelf: 'center',
		backgroundColor: '#81AFE0',
		padding: 10,
		margin: 10,
		width: '100%'
	}
})
import { Image, KeyboardAvoidingView, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {WalletEffect, walletEffect} from '@/effects/wallet.effect'
import {useNavigation} from 'react-navigation-hooks'
import {walletStore} from '@/stores/wallet.store'
import {images, metrics} from '@/themes'
import {AInput} from '@/components'
import { HomeBalance, HomeInfo } from '@/screens/Home/components'

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
      <KeyboardAvoidingView behavior="position" enabled style={s.container}>
        <Image style={s.logo} source={images.logo} />
        <Text style={s.titleScreen}>
          Wallet Info
        </Text>
        <HomeBalance
	        balance={balance}
	        loading={loading}
        />
        <HomeInfo
	        name={'Asset Creation'}
	        titleButton={'Create Asset'}
        >
	        <AInput name={'Asset Name:'}/>
	        <AInput name={'Supply:'}/>
        </HomeInfo>
        <HomeInfo
	        name={'Send Asset'}
	        titleButton={'Send Asset'}
        >
	        <AInput name={'To:'}/>
	        <AInput name={'Quantity:'}/>
        </HomeInfo>
        <TouchableOpacity
        	style={s.buttonLogOut}
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


const s = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: '5%',
		marginBottom: metrics.tripleBase
	},
	logo: {
		position: 'absolute',
		height: metrics.screenWidth / 7,
		width: metrics.screenWidth / 3,
		top: metrics.doubleBase,
		left: '-5%'
	},
	titleScreen: {
		marginTop: '20%',
		marginBottom: metrics.tripleBase,
		textDecorationLine: 'underline',
		fontWeight: '700',
		fontSize: metrics.doubleBase,
		textAlign: 'center'
	},
	textCategory: {
		fontSize: metrics.doubleBase
	},
	buttonLogOut: {
		alignSelf: 'center',
		backgroundColor: '#81AFE0',
		padding: metrics.base,
		margin: metrics.base,
		width: '100%'
	}
})
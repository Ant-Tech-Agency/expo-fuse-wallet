import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { walletStore } from '@/stores/wallet.store'

export const HomeBalance = (props) => {
	const {balance, loading} = props
	return (
		<View style={styles.container}>
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
	)
}


const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
		flex: 1
	},
	wrapBalance: {

		marginVertical: 10,
		justifyContent: 'center'
	},
	textBalance: {
		fontSize: 40,
		fontWeight: '700'
	},
	textPublicAddress: {
		fontSize: 20,
		fontWeight: '600'
	},
	textCategory: {
		fontSize: 20
	}
})
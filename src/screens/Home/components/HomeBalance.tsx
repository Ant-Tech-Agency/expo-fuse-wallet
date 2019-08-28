import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { walletStore } from '@/stores/wallet.store'
import { metrics } from '@/themes'
type Props = {
	balance: number,
	loading: boolean
}
export const HomeBalance: React.FC <Props> = (props) => {
	const {balance, loading} = props
	return (
		<View style={s.container}>
			<Text style={s.textCategory}>Fusion Balance: </Text>
			<View style={s.wrapBalance}>
				<Text style={s.textBalance}>
					{
						loading ?
							'Loading...' :
							`${balance}`
					} <Text style={s.textCategory}>FSN</Text>
				</Text>
			</View>
			<Text style={s.textCategory}>Public Address:</Text>
			<Text style={s.textPublicAddress}>{walletStore.wallet.address}</Text>
		</View>
	)
}


const s = StyleSheet.create({
	container: {
		marginBottom: metrics.doubleBase,
		flex: 1
	},
	wrapBalance: {

		marginVertical: metrics.base,
		justifyContent: 'center'
	},
	textBalance: {
		fontSize: 40,
		fontWeight: '700'
	},
	textPublicAddress: {
		fontSize: metrics.doubleBase,
		fontWeight: '600'
	},
	textCategory: {
		fontSize: metrics.doubleBase
	}
})
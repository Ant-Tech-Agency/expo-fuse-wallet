import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AInput } from '@/components'

export const HomeInfo = (props) => {
	const {name, titleButton, titleField1, titleField2} = props
	return (
		<View style={styles.wrapInput}>
			<Text style={styles.titleFeature}>
				{name}
			</Text>
			<View style={{flex: 1, justifyContent: 'center'}}>
				<AInput name={titleField1}/>
				<AInput name={titleField2}/>
				<TouchableOpacity
					style={styles.button}
				>
					<Text style={styles.titleButton}>
						{titleButton}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	titleFeature: {
		fontSize: 25,
		fontWeight: '700',
		textDecorationLine: 'underline'
	},
	wrapInput: {
		flex: 1,
		paddingRight: '5%'
	},
	button: {
		borderWidth: 0.5,
		marginTop: 5,
		alignSelf: 'flex-end',
		backgroundColor: '#81AFE0',
		paddingHorizontal: 10,
		paddingVertical: 3
	},
	titleButton: {
		textAlign: 'right',
		color: 'white',
		fontSize: 15
	}
})
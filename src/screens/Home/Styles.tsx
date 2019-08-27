import {StyleSheet} from 'react-native'
import {metrics} from '@/themes'

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: '5%',
		marginBottom: 30
	},
	logo: {
		height: metrics.screenWidth / 6,
		width: metrics.screenWidth / 3,
		marginLeft: '-5%'
	},
	titleScreen: {
		flex: 0.4,
		textDecorationLine: 'underline',
		fontWeight: '700',
		marginTop: '5%',
		fontSize: 20,
		textAlign: 'center'
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
	},
	titleFeature: {
		fontSize: 25,
		fontWeight: '700',
		textDecorationLine: 'underline'
	},
	wrapInput: {
		flex: 1,
		paddingLeft: '10%',
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
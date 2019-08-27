import React, {useRef} from 'react'
import { Text, TextInput, View } from 'react-native'
export const AInput = (props) => {
	const inputEl = useRef(null)
	function focus () {
		inputEl.current.focus()
	}
	const {name} = props
	return (
		<View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
			<Text style={{flex: 1, fontSize: 18}}>
				{name}
			</Text>
			<TextInput {...props} style={{borderWidth: 1, flex: 1, height: 40}}/>
		</View>
	)
}

import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')
export const metrics = {
	screenWidth: width < height ? width : height,
	screenHeight: width < height ? height : width,
  padding: {
    base: 12,
    double: this.base * 2
  },
  
  font: {
    h1: 32,
    h2: 24
  }
}

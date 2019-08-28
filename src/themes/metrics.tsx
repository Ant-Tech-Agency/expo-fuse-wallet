import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')
export const metrics = {
	screenWidth: width < height ? width : height,
	screenHeight: width < height ? height : width,
	base: 10,
	doubleBase: 20,
	tripleBase: 30,
  padding: {
    base: 12,
    double: this.base * 2
  },
  
  font: {
		medium: 16,
    h1: 32,
    h2: 24
  }
}

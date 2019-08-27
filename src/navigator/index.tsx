import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {Home} from '@/screens/Home/Home'
import {AccessWallet} from '@/screens/AccessWallet/AccessWallet'
import {Loading} from '@/screens/Loading/Loading'

export const PublicStack = createStackNavigator({
  Home
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})

export const PrivateStack = createStackNavigator({
  AccessWallet
}, {
  initialRouteName: 'AccessWallet',
  headerMode: 'none'
})

export const SwitchStack = createSwitchNavigator({
  PublicStack,
  PrivateStack,
  Loading
}, {
  initialRouteName: 'Loading'
})

export const Navigator = createAppContainer(SwitchStack)

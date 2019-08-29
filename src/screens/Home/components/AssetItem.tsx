import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { WalletEffect } from '@/effects/wallet.effect'
type Asset = {
  AssetID: string
  CanChange: boolean
  Decimals: number
  Description: string
  ID: string
  Name: string
  Owner: string | undefined
  Symbol: string
  Total: number
}

type Props = {
  element: Asset
  index: number
  onPress: (element: Asset) => void
}
export const AssetItem: React.FC<Props> = props => {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.element)}>
      <View style={{ marginVertical: 5 }}>
        <Text numberOfLines={1}>
          <Text style={{ fontWeight: 'bold' }}>name: </Text>{' '}
          {props.element.Name}
        </Text>
        <Text numberOfLines={1}>
          <Text style={{ fontWeight: 'bold' }}>address: </Text>{' '}
          {props.element.ID}
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Value : </Text>
          {props.element.Total /
            WalletEffect.normalizeBalance(props.element.Decimals)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

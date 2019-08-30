import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { AssetData } from "web3-fusion-extend"
import { BigNumber } from "@/shared/big-number"

type Props = {
  asset: AssetData
  index: number
  onPress: (element: AssetData) => void
}

export const AssetItem: React.FC<Props> = ({ onPress, asset }) => {
  const amount = asset.Amount || 0
  return (
    <TouchableOpacity onPress={() => onPress(asset)}>
      <View style={{ marginVertical: 5 }}>
        <Text numberOfLines={1}>
          <Text style={{ fontWeight: 'bold' }}>name: </Text> {asset.Name}
        </Text>
        <Text numberOfLines={1}>
          <Text style={{ fontWeight: 'bold' }}>address: </Text> {asset.ID}
        </Text>
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Value : </Text>
          {amount / BigNumber.generateDecimal(asset.Decimals)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

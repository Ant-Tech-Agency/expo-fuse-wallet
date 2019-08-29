import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { WalletEffect, walletEffect } from '@/effects/wallet.effect'
import { useNavigation } from 'react-navigation-hooks'
import { walletStore } from '@/stores/wallet.store'
import { colors, images, metrics } from '@/themes'
import { AInput } from '@/components'
import { AButton } from '@/components/AButton/AButton'
import I18n from '@/i18n'
import { assetEffect } from '@/effects/asset.effect'
import { AssetData } from 'web3-fusion-extend'
import { AssetItem } from '@/screens/Home/components'

export const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [assets, setAssets] = useState([])
  const [assetName, setAssetName] = useState('')
  const [toAddress, setToAddress] = useState(
    '0X373974CA4F8985F6FA51AB3F7DE3DD61473BA702'
  )
  const [quantity, setQuantity] = useState('')
  const [supply, setSupply] = useState('')
  const [pickedAsset, setPickedAsset] = useState<AssetData>(null)
  const [symbol, setSymbol] = useState('')
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    setLoading(true)
    init()
      .then(e => console.log(e))
      .finally(() => setLoading(false))
  }, [])

  async function init() {
    const balances = await walletEffect.getAllBalances()
    const assets = await assetEffect.getAssets()
    const balance = balances[WalletEffect.FSN_TOKEN_ADDRESS] || 0
    const userAssets = Object.keys(balances).reduce((acc, key) => {
      const asset = assets[key]
      asset.Amount = balances[key]
      return acc.concat(assets[key])
    }, [])
    setBalance(balance / WalletEffect.normalizeBalance(18))
    setAssets(userAssets)
  }

  async function onLogOut() {
    await walletStore.deletePrivateKey()
    navigate('AccessWallet')
  }

  async function onCreateAsset() {
    await walletEffect.createAsset({
      supply,
      decimals: 18,
      name: assetName,
      symbol,
      canChange: false,
    })
  }

  async function onSendAsset() {
    await walletEffect.sendAsset({
      asset: pickedAsset.ID,
      amount: quantity,
      to: toAddress,
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={'padding'} style={s.container}>
        <Image style={s.logo} source={images.logo} />
        <Text style={s.titleScreen}>{I18n.t('walletInfo')}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text style={s.textCategory}>{I18n.t('fusionBalance')}: </Text>
            <View style={s.wrapBalance}>
              <Text style={s.textBalance}>
                {loading ? 'Loading...' : `${balance}`}{' '}
                <Text style={s.textCategory}>FSN</Text>
              </Text>
            </View>
            <View style={s.publicAddressCover}>
              <Text style={s.textCategory}>{I18n.t('publicAddress')}:</Text>
              <Text style={s.textPublicAddress}>
                {walletStore.wallet.address}
              </Text>
            </View>
          </View>

          <View style={s.wrapInput}>
            <Text style={s.titleFeature}>{I18n.t('assetCreation')}</Text>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <AInput
                value={assetName}
                onChangeText={asset => setAssetName(asset)}
                name={I18n.t('assetName')}
              />
              <AInput
                value={supply}
                onChangeText={value => setSupply(value)}
                name={I18n.t('supply')}
              />
              <AInput
                onChangeText={s => setSymbol(s.toUpperCase())}
                autoCapitalize={'characters'}
                maxLength={4}
                name={I18n.t('assetSymbol')}
              />
              <AInput name={I18n.t('decimals')} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: metrics.margin.base,
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', color: colors.text.primary }}
                >
                  {isFixed ? 'Fixed' : 'Changeable'}
                </Text>
                <Switch
                  style={{ alignSelf: 'flex-end' }}
                  value={isFixed}
                  onValueChange={() => setIsFixed(!isFixed)}
                />
              </View>
              <AButton
                positions="right"
                size="small"
                title={I18n.t('createAssets')}
                onPress={onCreateAsset}
              />
            </View>
          </View>

          <View style={s.wrapInput}>
            <Text style={s.titleFeature}>{I18n.t('sendAsset')}</Text>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <AInput
                value={toAddress}
                onChangeText={text => setToAddress(text)}
                name={I18n.t('to')}
              />
              <AInput
                value={quantity}
                onChangeText={text => setQuantity(text)}
                name={I18n.t('quantity')}
              />
              {pickedAsset && (
                <Text numberOfLines={1}>
                  <Text style={{ fontWeight: 'bold' }}>Asset Picked :</Text>{' '}
                  {pickedAsset.Name}
                </Text>
              )}
              <AButton
                positions="right"
                size="small"
                title={I18n.t('sendAsset')}
                onPress={onSendAsset}
              />
            </View>
            {assets.length > 0 &&
              assets.map((asset: AssetData, i) => {
                return (
                  <AssetItem
                    key={i.toString()}
                    asset={asset}
                    index={i}
                    onPress={e => setPickedAsset(e)}
                  />
                )
              })}
          </View>
          <AButton onPress={onLogOut} title={I18n.t('logout')} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.padding.base,
    marginBottom: metrics.margin.base,
  },
  logo: {
    height: metrics.logo.height,
    width: metrics.logo.width,
    marginLeft: -metrics.margin.base,
  },
  titleScreen: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    marginTop: metrics.margin.base,
    marginBottom: metrics.margin.double,
    fontSize: metrics.font.header.h1,
    textAlign: 'center',
    color: colors.text.primary,
  },
  wrapBalance: {
    marginVertical: metrics.margin.base,
    justifyContent: 'center',
  },
  textBalance: {
    fontSize: metrics.font.coin,
    fontWeight: '700',
    color: colors.text.primary,
  },
  publicAddressCover: {
    marginBottom: metrics.margin.triple,
  },
  textPublicAddress: {
    fontSize: metrics.font.text.t3,
    fontWeight: '600',
    color: colors.text.primary,
  },
  textCategory: {
    fontSize: metrics.font.header.h2,
    color: colors.text.primary,
  },
  titleFeature: {
    fontSize: metrics.font.header.h2,
    fontWeight: '700',
    textDecorationLine: 'underline',
    color: colors.text.primary,
    marginBottom: metrics.margin.double,
  },
  wrapInput: {
    flex: 1,
    paddingHorizontal: metrics.padding.base,
    marginBottom: metrics.padding.base,
  },
})

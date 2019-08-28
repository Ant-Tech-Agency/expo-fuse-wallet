import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { web3Store } from '@/stores/web3.store'

function makeBigNumber(amount, decimals) {
  const BN = web3Store.web3.utils.BN as any

  try {
    if (amount.substr(0, 1) == '.') {
      let a = '0' + amount
      amount = a
    }
    let pieces = amount.split('.')
    let d = parseInt(decimals)
    if (pieces.length === 1) {
      amount = parseInt(amount)
      if (isNaN(amount) || amount < 0) {
        return
      }
      amount = new BN(amount + '0'.repeat(parseInt(decimals)))
    } else if (pieces.length > 2) {
      console.log('error')
      return
    } else if (pieces[1].length >= d) {
      console.log('error')
      return // error
    } else {
      let dec = parseInt(pieces[1])
      let reg = new RegExp('^\\d+$') // numbers only
      if (isNaN(pieces[1]) || dec < 0 || !reg.test(pieces[1])) {
        console.log('error')
        return
      }
      dec = pieces[1]
      let declen = d - dec.toString().length
      amount = parseInt(pieces[0])
      if (isNaN(amount) || amount < 0) {
        console.log('error')
        return
      }
      amount = new BN(amount + dec + '0'.repeat(declen))
    }
    return amount
  } catch (err) {}
}

export const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [assets, setAssets] = useState([])
  const [assetName, setAssetName] = useState('')
  const [supply, setSupply] = useState('')
  const [pickedAsset, setPickedAsset] = useState(null)
  useEffect(() => {
    setLoading(true)
    walletEffect
      .getAllBalances()
      .then(balances => {
        const balance = balances[walletEffect.FSN_TOKEN_ADDRESS] || 0
        setBalance(balance / WalletEffect.normalizeBalance(18))
        const preArr = []
        for (let a in balances) {
          let pre = {
            address: a,
            value: balances[a],
          }
          preArr.push(pre)
        }
        setAssets(preArr)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  console.log(assets)

  async function onLogOut() {
    await walletStore.deletePrivateKey()
    navigate('AccessWallet')
  }
  async function onCreateAsset() {
    const BN = web3Store.web3.utils.BN as any

    const privateKey = await walletStore.getPrivateKey()
    console.log(privateKey)
    const publicKey = walletStore.wallet.address
    const account: any = web3Store.web3.eth.accounts.privateKeyToAccount(
      '0x' + privateKey
    )
    const sup = supply.toString()
    const totalSupBN = makeBigNumber(sup, 18)
    const totalSupBNHex = '0x' + totalSupBN.toString(16)
    web3Store.fusion.fsntx
      .buildGenAssetTx({
        from: publicKey,
        name: assetName,
        symbol: 'VTV3',
        decimals: 18,
        total: totalSupBNHex,
        description: '{}',
        canChange: false,
      })
      .then(tx => {
        tx.chainId = 46688
        tx.from = publicKey
        const gasPrice = web3Store.web3.utils.toWei(new BN(100), 'gwei' as any)
        tx.gasPrice = gasPrice.toString()

        return web3Store.fusion.fsn
          .signAndTransmit(tx, account.signTransaction)
          .then(txHash => {
            console.log('txHash ', txHash)
          })
          .catch(err => {
            console.log('err1', err)
          })
      })
      .catch(err => {
        console.log(err)
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
                onChangeText={asset => setAssetName(asset)}
                name={I18n.t('assetName')}
              />
              <AInput
                onChangeText={sup => setSupply(sup)}
                name={I18n.t('supply')}
              />
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
            {assets.map((e, i) => {
              return (
                i !== assets.length - 1 && (
                  <TouchableOpacity onPress={() => setPickedAsset(e)}>
                    <View style={{ marginVertical: 5 }}>
                      <Text numberOfLines={1}>
                        <Text style={{ fontWeight: 'bold' }}>address: </Text>{' '}
                        {e.address}
                      </Text>
                      <Text>
                        <Text style={{ fontWeight: 'bold' }}>Value : </Text>
                        {e.value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              )
            })}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <AInput name={I18n.t('to')} />
              <AInput name={I18n.t('quantity')} />
              {pickedAsset && (
                <Text numberOfLines={1}>
                  <Text style={{ fontWeight: 'bold' }}>Address Picked :</Text>{' '}
                  {pickedAsset.address}
                </Text>
              )}
              <AButton
                positions="right"
                size="small"
                title={I18n.t('sendAsset')}
              />
            </View>
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

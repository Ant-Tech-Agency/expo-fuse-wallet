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
import axios from 'axios'

const cacheAssets = {
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff': {
    AssetID:
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    CanChange: false,
    Decimals: 18,
    Description: '',
    ID: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    Name: 'FUSION',
    Symbol: 'FSN',
    Total: 81920000000000000000000000,
  },
  '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe': {
    AssetID:
      '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
    CanChange: false,
    Decimals: 0,
    Description: '',
    ID: '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
    Name: 'USAN',
    Symbol: '',
    Total: 0,
  },
}

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

function getApiServer() {
  return 'https://testnetasiaapi.fusionnetwork.io'
}

async function getAllAssets() {
  try {
    const resFsn = await axios(getApiServer() + '/fsnprice')
    const totalAssets = resFsn.data.totalAssets
    const promises = []
    for (let i = 0; i < Math.ceil(totalAssets / 100); i++) {
      promises.push(axios(`${getApiServer()}/assets/all?page=${i}&size=100`))
    }

    const resAssets = await Promise.all(promises)
    console.log(resAssets)
    for (let i = 0; i < resAssets.length; i++) {
      const assets = resAssets[i].data
      assets.forEach(asset => {
        const data = JSON.parse(asset.data)
        cacheAssets[data.AssetID] = data
        cacheAssets[data.AssetID].ID = data.AssetID
        cacheAssets[data.AssetID].Owner = data.fromAddress
      })
    }
    return cacheAssets
  } catch (e) {
    console.log(e)
  }
}

export const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [assets, setAssets] = useState([])
  const [assetName, setAssetName] = useState('')
	const [toAddress, setToAddress] = useState('')
	const [quantity, setQuantity] = useState('')
  const [supply, setSupply] = useState('')
  const [pickedAsset, setPickedAsset] = useState(null)
  const [allAsset, setAllAsset] = useState({})
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

    getAllAssets().then(data => {
      setAllAsset(data)
    })
  }, [])

  async function onLogOut() {
    await walletStore.deletePrivateKey()
    navigate('AccessWallet')
  }

  async function onCreateAsset() {
    const BN = web3Store.web3.utils.BN as any

    const privateKey = await walletStore.getPrivateKey()
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
	async function onSendAsset() {
		const BN = web3Store.web3.utils.BN as any
		const privateKey = await walletStore.getPrivateKey()
		const asset = '0x6d8b839b25cae5d9316e2d422983b4b32e54979cb05163d08d61e64b95c8dd68'
		const account: any = web3Store.web3.eth.accounts.privateKeyToAccount(
			"0x"+privateKey
		)
		const amountBNString = new BN(quantity).toString()
		const amount = makeBigNumber(amountBNString, 0)

		console.log(amount)

		web3Store.fusion.fsntx.buildSendAssetTx({
			from: walletStore.wallet.address,
			to: toAddress,
		//	to: '0X373974CA4F8985F6FA51AB3F7DE3DD61473BA702',
			value: amount.toString(),
			asset,
		})
		.then(tx => {
			tx.from = walletStore.wallet.address
			tx.chainId = 46688

			return web3Store.fusion.fsn.signAndTransmit(tx, account.signTransaction)
		})
		.then(txHash => {
			console.log(txHash)
		})
		.catch(err => {
			console.log('err ', err)
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
              const d = allAsset[e.address]
              return (
                i !== assets.length - 1 &&
                d &&
                (
                  <TouchableOpacity
                    key={i.toString()}
                    onPress={() => setPickedAsset(e)}
                  >
                    <View style={{ marginVertical: 5 }}>
                      <Text numberOfLines={1}>
                        <Text style={{ fontWeight: 'bold' }}>name: </Text>{' '}
                        {d.Name}
                      </Text>
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
              <AInput onChangeText={text => setToAddress(text)} name={I18n.t('to')} />
              <AInput onChangeText={text => setQuantity(text)} name={I18n.t('quantity')} />
              {pickedAsset && allAsset[pickedAsset.address] && (
                <Text numberOfLines={1}>
                  <Text style={{ fontWeight: 'bold' }}>Address Picked :</Text>{' '}
                  {allAsset[pickedAsset.address].Name}
                </Text>
              )}
              <AButton positions="right" size="small" title={I18n.t('sendAsset')}
                       onPress={onSendAsset}
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

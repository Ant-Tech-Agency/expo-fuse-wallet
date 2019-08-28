import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"
import React, { useEffect, useState } from "react"
import { WalletEffect, walletEffect } from "@/effects/wallet.effect"
import { useNavigation } from "react-navigation-hooks"
import { walletStore } from "@/stores/wallet.store"
import { colors, images, metrics } from "@/themes"
import { AInput } from "@/components"
import { AButton } from "@/components/AButton/AButton"
import I18n from '@/i18n'

export const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [assets, setAssets] = useState({})

  useEffect(() => {
    setLoading(true)
    walletEffect
      .getAllBalances()
      .then(balances => {
        setBalance(
          balances[walletEffect.FSN_TOKEN_ADDRESS] /
            WalletEffect.normalizeBalance(18)
        )
        setAssets(balances)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  async function onLogOut() {
    await walletStore.deletePrivateKey()
    navigate("AccessWallet")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={"padding"} style={s.container}>
        <Image style={s.logo} source={images.logo} />
        <Text style={s.titleScreen}>{I18n.t('walletInfo')}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text style={s.textCategory}>{I18n.t('fusionBalance')}: </Text>
            <View style={s.wrapBalance}>
              <Text style={s.textBalance}>
                {loading ? "Loading..." : `${balance}`}{" "}
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
            <View style={{ flex: 1, justifyContent: "center" }}>
              <AInput name={I18n.t('assetName')} />
              <AInput name={I18n.t('supply')} />
              <AButton positions="right" size="small" title={I18n.t('createAssets')} />
            </View>
          </View>

          <View style={s.wrapInput}>
            <Text style={s.titleFeature}>{I18n.t('sendAsset')}</Text>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <AInput name={I18n.t('to')} />
              <AInput name={I18n.t('quantity')} />
              <AButton positions="right" size="small" title={I18n.t('sendAsset')} />
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
    marginBottom: metrics.margin.base
  },
  logo: {
    height: metrics.logo.height,
    width: metrics.logo.width,
    marginLeft: -metrics.margin.base
  },
  titleScreen: {
    textDecorationLine: "underline",
    fontWeight: "700",
    marginTop: metrics.margin.base,
    marginBottom: metrics.margin.double,
    fontSize: metrics.font.header.h1,
    textAlign: "center",
    color: colors.text.primary
  },
  wrapBalance: {
    marginVertical: metrics.margin.base,
    justifyContent: "center"
  },
  textBalance: {
    fontSize: metrics.font.coin,
    fontWeight: "700",
    color: colors.text.primary
  },
  publicAddressCover: {
    marginBottom: metrics.margin.triple
  },
  textPublicAddress: {
    fontSize: metrics.font.text.t3,
    fontWeight: "600",
    color: colors.text.primary
  },
  textCategory: {
    fontSize: metrics.font.header.h2,
    color: colors.text.primary
  },
  titleFeature: {
    fontSize: metrics.font.header.h2,
    fontWeight: "700",
    textDecorationLine: "underline",
    color: colors.text.primary,
    marginBottom: metrics.margin.double
  },
  wrapInput: {
    flex: 1,
    paddingHorizontal: metrics.padding.base,
    marginBottom: metrics.padding.base
  }
})

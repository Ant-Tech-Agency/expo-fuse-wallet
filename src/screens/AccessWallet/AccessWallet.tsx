import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform
} from "react-native"
import React, { useState } from "react"
import { MyEtherWallet } from "@/libs/myetherwallet"
import { walletStore } from "@/stores/wallet.store"
import { useNavigation } from "react-navigation-hooks"
import { AButton } from "@/components/AButton/AButton"
import { colors, images, metrics } from "@/themes"
import I18n from "@/i18n"
export const AccessWallet: React.FC = () => {
  const [privateKey, setPrivateKey] = useState(
    "B2A6B4E1E510FE05AB051C9944B433427D90F2D117E1B32248A1B811BCDB54F9"
  )
  const { navigate } = useNavigation()

  async function onUnlock() {
    if (privateKey) {
      walletStore.wallet = new MyEtherWallet(privateKey)
      await walletStore.persistPrivateKey(privateKey)
      navigate("Home")
    } else {
      alert("Please enter your private key")
    }
  }

  return (
    <SafeAreaView style={s.Container}>
      <Image style={s.logo} source={images.logo} />
      <Text style={s.title}>{I18n.t("accessExitsTitle")}</Text>
      <KeyboardAvoidingView behavior={"position"} style={s.form}>
        <Text style={s.textKey}>{I18n.t("privateKey")}:</Text>
        <View style={s.inputCover}>
          <TextInput
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder={I18n.t("enterPrivateKey")}
            style={s.input}
            value={privateKey}
            onChangeText={setPrivateKey}
          />
        </View>
        <AButton onPress={onUnlock} title={I18n.t('openWallet')} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? metrics.padding.base : 0
  },
  logo: {
    width: metrics.logo.width,
    height: metrics.logo.height
  },
  title: {
    alignSelf: "center",
    fontSize: metrics.font.header.h1,
    color: colors.text.primary,
    textDecorationLine: "underline",
    marginVertical: metrics.margin.triple
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: metrics.margin.triple,
    paddingVertical: metrics.padding.base
  },
  textKey: {
    fontSize: metrics.font.header.h2,
    color: colors.text.primary,
    marginVertical: metrics.margin.base,
    alignSelf: "center",
    fontWeight: "500"
  },
  inputCover: {
    borderWidth: 1,
    borderColor: colors.border.primary,
    marginVertical: metrics.margin.base,
    height: metrics.input.large.height,
    justifyContent: "center",
    width: metrics.input.large.width,
    paddingHorizontal: 10
  },
  input: {
    width: "100%",
    fontSize: metrics.font.text.t1,
    textAlign: "center"
  }
})

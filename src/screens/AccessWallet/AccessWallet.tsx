import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import React, { useState } from "react";
import { MyEtherWallet } from "@/libs/myetherwallet";
import { walletStore } from "@/stores/wallet.store";
import { useNavigation } from "react-navigation-hooks";
import { AButton } from "@/components/AButton/AButton";
import {colors, metrics} from '@/themes'

const { width, height } = Dimensions.get("window");

export const AccessWallet: React.FC = () => {
  const [privateKey, setPrivateKey] = useState(
    "B2A6B4E1E510FE05AB051C9944B433427D90F2D117E1B32248A1B811BCDB54F9"
  );
  const { navigate } = useNavigation();

  async function onUnlock() {
    if (privateKey) {
      walletStore.wallet = new MyEtherWallet(privateKey);
      await walletStore.persistPrivateKey(privateKey);

      navigate("Home");
    } else {
      alert("Please enter your private key");
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
      <Text style={styles.title}>Access Existing Wallet</Text>

      <KeyboardAvoidingView behavior={"position"} style={styles.form}>
        <Text style={styles.textKey}>Private Key:</Text>
        <View style={styles.inputCover}>
          <TextInput
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder={"Enter your private key"}
            style={styles.input}
            value={privateKey}
            onChangeText={setPrivateKey}
          />
        </View>
        <AButton onPress={onUnlock} title={"Open the wallet"} />
        {/*<TouchableOpacity style={Styles.button} onPress={onUnlock}>*/}
        {/*  <Text style={Styles.buttonTitle}>Open the wallet</Text>*/}
        {/*</TouchableOpacity>*/}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0
  },
  logo: {
    width: (width * 60) / 100,
    height: (width * 15) / 100,
    marginTop: (width * 3) / 100
  },
  title: {
    alignSelf: "center",
    fontSize: metrics.font.header.h1,
    color: colors.text.primary,
    textDecorationLine: "underline",
    marginVertical: (width * 11.5) / 100
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: (width * 10) / 100,
    paddingVertical: (width * 5) / 100
  },
  textKey: {
    fontSize: metrics.font.header.h2,
    color: colors.text.primary,
    marginVertical: (width * 5) / 100,
    alignSelf: "center",
    fontWeight: "500"
  },
  inputCover: {
    borderWidth: 1,
    borderColor: colors.border.primary,
    marginVertical: (width * 5) / 100,
    height: (width * 12) / 100,
    justifyContent: "center",
    width: (width * 85) / 100,
    paddingHorizontal: 10
  },
  input: {
    width: "100%",
    fontSize: metrics.font.text.t1,
    textAlign: "center"
  }
});

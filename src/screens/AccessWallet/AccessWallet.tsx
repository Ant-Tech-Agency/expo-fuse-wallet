import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View
} from "react-native";
import React, { useState } from "react";
import { MyEtherWallet } from "@/libs/myetherwallet";
import { walletStore } from "@/stores/wallet.store";
import { useNavigation } from "react-navigation-hooks";
import Styles from "./Styles";
import { AButton } from "@/components/AButton/AButton";
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
    <SafeAreaView style={Styles.Container}>
      <Image style={Styles.logo} source={require("../../../assets/logo.png")} />
      <Text style={Styles.title}>Access Existing Wallet</Text>

      <KeyboardAvoidingView behavior={"position"} style={Styles.form}>
        <Text style={Styles.textKey}>Private Key:</Text>
        <View style={Styles.inputCover}>
          <TextInput
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder={"Enter your private key"}
            style={Styles.input}
            value={privateKey}
            onChangeText={setPrivateKey}
          />
        </View>
        <AButton  onPress={onUnlock} title={"Open the wallet"} />
        {/*<TouchableOpacity style={Styles.button} onPress={onUnlock}>*/}
        {/*  <Text style={Styles.buttonTitle}>Open the wallet</Text>*/}
        {/*</TouchableOpacity>*/}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

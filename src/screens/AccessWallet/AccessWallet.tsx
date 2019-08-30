import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "react-navigation-hooks";
import { MyEtherWallet } from "@/libs/myetherwallet";
import { walletStore } from "@/stores/wallet.store";

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
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <Text
        style={{
          fontSize: 20,
          textAlign: "center"
        }}
      >
        Access Existing Wallet
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            padding: 20
          }}
        >
          Private Key:
        </Text>
        <TextInput
          placeholder="Enter your private key"
          style={{
            borderWidth: 1,
            padding: 10,
            fontSize: 16
          }}
          value={privateKey}
          onChangeText={setPrivateKey}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#81AFE0",
            padding: 10,
            margin: 10,
            width: "100%"
          }}
          onPress={onUnlock}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16
            }}
          >
            Open the wallet
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

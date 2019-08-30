import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "react-navigation-hooks";
import { walletStore } from "@/stores/wallet.store";
import { MyEtherWallet } from "@/libs/myetherwallet";

export const Loading: React.FC = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    walletStore.getPrivateKey().then(key => {
      console.log(key);
      if (key) {
        walletStore.wallet = new MyEtherWallet(key);
        navigate("Home");
      } else {
        navigate("AccessWallet");
      }
    });
  }, [navigate]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

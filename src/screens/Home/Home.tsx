import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { WalletEffect, walletEffect } from "@/effects/wallet.effect";
import { useNavigation } from "react-navigation-hooks";
import { walletStore } from "@/stores/wallet.store";
import { colors, images, metrics } from "@/themes";
import { AInput } from "@/components";
import { AButton } from "@/components/AButton/AButton";

export const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState({});

  useEffect(() => {
    setLoading(true);
    walletEffect
      .getAllBalances()
      .then(balances => {
        setBalance(
          balances[walletEffect.FSN_TOKEN_ADDRESS] /
            WalletEffect.normalizeBalance(18)
        );
        setAssets(balances);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <KeyboardAvoidingView behavior={"padding"} style={s.container}>
        <Image style={s.logo} source={require("../../../assets/logo.png")} />
        <Text style={s.titleScreen}>Wallet Info</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text style={s.textCategory}>Fusion Balance: </Text>
            <View style={s.wrapBalance}>
              <Text style={s.textBalance}>
                {loading ? "Loading..." : `${balance}`}{" "}
                <Text style={s.textCategory}>FSN</Text>
              </Text>
            </View>
            <View style={s.publicAddressCover}>
              <Text style={s.textCategory}>Public Address:</Text>
              <Text style={s.textPublicAddress}>
                {walletStore.wallet.address}
              </Text>
            </View>
          </View>
          <View style={s.wrapInput}>
            <Text style={s.titleFeature}>Asset Creation</Text>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <AInput name={"Asset Name:"} />
              <AInput name={"Supply:"} />
              <AButton right isSmall title={"Create Asset"} />
            </View>
          </View>

          <View style={s.wrapInput}>
            <Text style={s.titleFeature}>Send Asset</Text>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <AInput name={"To:"} />
              <AInput name={"Quantity:"} />
              <AButton right isSmall title={"Send Asset"} />
            </View>
          </View>
          <AButton
            onPress={async () => {
              await walletStore.deletePrivateKey();
              navigate("AccessWallet");
            }}
            title={"Log Out"}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    marginBottom: 30,
  },
  logo: {
    height: metrics.screenWidth / 6,
    width: metrics.screenWidth / 3,
    marginLeft: "-5%"
  },
  titleScreen: {
    textDecorationLine: "underline",
    fontWeight: "700",
    marginTop: "5%",
    marginBottom: "15%",
    fontSize: metrics.font.header.h1,
    textAlign: "center",
    color: colors.text.primary
  },
  wrapBalance: {
    marginVertical: 10,
    justifyContent: "center"
  },
  textBalance: {
    fontSize: metrics.font.coin,
    fontWeight: "700",
    color: colors.text.primary
  },
  publicAddressCover: {
    marginBottom: 30
  },
  textPublicAddress: {
    fontSize: metrics.font.text.t2,
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
    marginBottom: 30
  },
  wrapInput: {
    flex: 1,
    paddingLeft: "10%",
    paddingRight: "5%",
    marginBottom: 20
  },
  button: {
    borderWidth: 0.5,
    marginTop: 5,
    alignSelf: "flex-end",
    backgroundColor: "#81AFE0",
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  titleButton: {
    textAlign: "right",
    color: "white",
    fontSize: 15
  }
});

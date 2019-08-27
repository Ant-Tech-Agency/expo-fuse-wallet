import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "@/themes";

const { width, height } = Dimensions.get("window");

type Props = {
  onPress?: () => void;
  title: String;
  isSmall?: Boolean;
  right?: Boolean;
};
export const AButton: React.FC<Props> = (props: Props) => {
  let styles = props.isSmall ? small : large;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.right && r.right]}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const large = StyleSheet.create({
  container: {
    width: (width * 85) / 100,
    height: (width * 12) / 100,
    borderWidth: 1,
    borderColor: colors.border.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.button.primary
  },
  title: {
    color: "white",
    fontSize: (width * 5) / 100
  }
});
const small = StyleSheet.create({
  container: {
    width: (width * 30) / 100,
    height: (width * 6) / 100,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.button.primary,
    marginVertical: 10
  },
  title: {
    color: "white",
    fontSize: (width * 4) / 100
  }
});

const r = StyleSheet.create({
  right: {
    alignSelf: "flex-end"
  }
});

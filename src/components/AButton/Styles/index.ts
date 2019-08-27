import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const large = StyleSheet.create({
  container: {
    width: (width * 85) / 100,
    height: (width * 12) / 100,
    borderWidth: 1,
    borderColor: "#CACACA",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#81AFE0"
  },
  title: {
    color: "white",
    fontSize: (width * 5) / 100
  }
});
export const small = StyleSheet.create({
  container: {
    width: (width * 85) / 100,
    height: (width * 12) / 100,
    borderWidth: 1,
    borderColor: "#CACACA",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#81AFE0"
  },
  title: {
    // color: "white",
    // fontSize: (width * 5) / 100
  }
});
export default {
  large,
  small
};
// export default StyleSheet.create({
//   container: {
//     width
//   }
// });

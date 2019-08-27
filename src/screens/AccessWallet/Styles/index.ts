import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  Container: {
    flex: 1
  },
  logo: {
    width: (width * 60) / 100,
    height: (width * 15) / 100,
    marginTop: (width * 3) / 100
  },
  title: {
    alignSelf: "center",
    fontSize: (width * 7) / 100,
    color: "#585858",
    textDecorationLine: "underline",
    marginVertical: (width * 11.5) / 100
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: (width * 10) / 100
  },
  textKey: {
    fontSize: (width * 5) / 100,
    color: "#585858",
    marginVertical: (width * 5) / 100,
    alignSelf: "center"
  },
  inputCover: {
    borderWidth: 1,
    borderColor: "#CACACA",
    marginVertical: (width * 5) / 100,
    height: (width * 12) / 100,
    justifyContent: "center",
    width: (width * 85) / 100,
    paddingHorizontal: 10
  },
  input: {
    width: "100%",
    fontSize: (width * 4) / 100,
    textAlign: "center"
  },

});

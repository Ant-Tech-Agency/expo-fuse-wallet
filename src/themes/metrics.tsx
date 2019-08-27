import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  padding: {
    base: 12,
    double: this.base * 2
  },

  font: {
    header: {
      h1: (width * 7) / 100,
      h2: (width * 5) / 100
    },
    text: {
      t1: (width * 4) / 100,
      t2: (width * 3.5) / 100,
      t3: (width * 2) / 100
    },
    coin: (width * 10) / 100
  }
};

import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { colors, metrics } from "@/themes"

export type AButtonProps = {
  onPress?: () => void
  title: String
  size?: String
  positions?: String
}

export const AButton: React.FC<AButtonProps> = (props) => {
  function s() {
    switch (props.size) {
      case "small":
        return small
      case "large":
        return large
      default:
        return large
    }
  }

  //check position
  function p() {
    switch (props.positions) {
      case "right":
        return position.right
      case "left":
        return position.left
      case "center":
        return position.center
      default:
        return position.center
    }
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={[s().container, p()]}>
      <Text style={s().title}>{props.title}</Text>
    </TouchableOpacity>
  )
}

//style for large size
const large = StyleSheet.create({
  container: {
    width: metrics.button.large.width,
    height: metrics.button.large.height,
    borderWidth: 1,
    borderColor: colors.border.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.button.primary
  },
  title: {
    color: "white",
    fontSize: metrics.font.text.t1
  }
})

//style for small size
const small = StyleSheet.create({
  container: {
    width: metrics.button.small.width,
    height: metrics.button.small.height,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.button.primary,
    marginVertical: 10
  },
  title: {
    color: "white",
    fontSize: metrics.font.text.t2
  }
})

//style for position
const position = StyleSheet.create({
  right: {
    alignSelf: "flex-end"
  },
  center: {
    alignSelf: "center"
  },
  left: {
    alignSelf: "flex-start"
  }
})

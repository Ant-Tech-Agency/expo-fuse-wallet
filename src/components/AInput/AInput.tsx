import React, { useRef } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { colors, metrics } from "@/themes"

export const AInput = props => {
  const inputEl = useRef(null)
  function focus() {
    inputEl.current.focus()
  }
  const { name } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.inputCover}>
        <TextInput {...props} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: metrics.margin.base,
    alignItems: "center"
  },
  text: {
    flex: 1,
    fontSize: metrics.font.text.t1,
    color: colors.text.primary,
    fontWeight: "bold"
  },
  inputCover: {
    borderWidth: 1,
    flex: 1.5,
    height: metrics.input.large.height,
    paddingHorizontal: metrics.padding.base,
    justifyContent: "center"
  }
})

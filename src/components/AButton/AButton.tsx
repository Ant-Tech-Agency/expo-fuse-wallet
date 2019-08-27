import React from "react";
import { TouchableOpacity, Text } from "react-native";
import {large, small} from './Styles'
type Props = {
  onPress: () => void;
  title: String;
  isSmall?: Boolean
};
export const AButton: React.FC<Props> = (props: Props) => {
  let styles = props.isSmall ? small : large
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

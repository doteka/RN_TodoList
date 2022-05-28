import React from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { theme } from "./theme";
import PropTypes from "prop-types";

const Input = ({ placeholder, value, onChangeText, onSubmitEditing }) => {
  //   const width = Dimensions.get("window").width;
  const width = useWindowDimensions().width;
  return (
    <TextInput
      style={[
        Styles.TextInput,
        theme.itemBackground,
        theme.text,
        { width: width - 40 },
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholderTextColor="#778bdd"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      maxLength={50}
      keyboardAppearance="dark"
    />
  );
};

Input.prototype = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onchangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
};

const Styles = StyleSheet.create({
  TextInput: {
    width: "100%",
    height: 60,
    marginVertical: 3,
    marginHorizontal: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 25,
  },
});

export default Input;

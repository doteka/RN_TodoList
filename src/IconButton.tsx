import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { images } from "./Image";

const IconButton = ({ type, onPressOut }) => {
  return (
    <Pressable style={Styles.Icon} onPressOut={onPressOut}>
      <Image source={{ uri: type }} />
    </Pressable>
  );
};

const Styles = StyleSheet.create({
  Icon: {
    width: 30,
    height: 30,
    margin: 10,
  },
});

IconButton.prototype = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
};

export default IconButton;

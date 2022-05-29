import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { images } from "./Image";
import { theme } from "./theme";

const IconButton = ({ type, onPressOut, id, completed }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <Pressable onPressOut={_onPressOut}>
      <Image
        source={type}
        style={[
          Styles.Icon,
          completed ? theme.tintColor_Done : theme.tintColor_Text,
        ]}
        completed={completed}
      />
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
IconButton.defaultProps = {
  onPressOut: () => {},
};

IconButton.prototype = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
};

export default IconButton;

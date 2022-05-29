import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "./IconButton";
import { images } from "./Image";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { theme } from "./theme";
import Input from "./Input";
const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };
  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };

  const _onBlur = () => {
    if (isEditing) {
      setIsEditing(false);
      setText(item.text);
    }
  };

  return isEditing ? (
    <Input
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={_onSubmitEditing}
      onBlur={_onBlur}
    />
  ) : (
    <SafeAreaView style={[Styles.View, theme.itemBackground]}>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Text
        completed={item.completed}
        style={[
          Styles.Contents,
          theme.text,
          item.completed ? theme.done : theme.text,
          item.completed ? Styles.line_through : Styles.line_none,
        ]}
      >
        {item.text}
      </Text>
      {item.completed || (
        <IconButton type={images.edit} onPressOut={_handleUpdateButtonPress} />
      )}
      {/* <IconButton type={images.edit} /> */}
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  View: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 0,
    // backgroundColor: theme.itemBackground
  },
  Contents: {
    flex: 1,
    fontSize: 24,
    // color -> theme.text
  },
  line_through: {
    textDecorationLine: "line-through",
  },
  line_none: {
    textDecorationLine: "none",
  },
});

Task.proptypes = {
  text: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;

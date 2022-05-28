import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import { theme } from "./theme";
import Input from "./input";
import IconButton from "./IconButton";
import images from "./Image";

const App = () => {
  const [newTask, setNewTask] = useState("");

  const _addTask = () => {
    alert(`Add: ${newTask}`);
    console.log(`Add: ${newTask}`);
    setNewTask("");
  };
  const _handleTextChange = (text) => {
    setNewTask(text);
    console.log(newTask);
  };
  return (
    <SafeAreaView style={[Styles.safeAreaView, theme.background]}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <Text style={[Styles.title, theme.main]}>ToDo List</Text>
      <Input
        placeholder={"+ Add a Task"}
        value={newTask}
        onChangeText={_handleTextChange}
        onSubmitEditing={_addTask}
      />
      <IconButton type={images.uncompleted} />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginHorizontal: 20,
  },
});

export default App;

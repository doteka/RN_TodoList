import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { theme } from "./theme";
import Input from "./Input";
import IconButton from "./IconButton";
import images from "./Image";
import Task from "./Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const width = Dimensions.get("window").width;

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});

  const _saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.log(e);
    }
  };
  const _loadTasks = async (tasks) => {
    const loadedTasks = await AsyncStorage.getItem("tasks");
    setTasks(JSON.parse(loadedTasks || "{"));
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask("");
    _saveTasks({ ...tasks, ...newTaskObject });
  };
  const _deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };
  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    _saveTasks(currentTasks);
  };
  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  };
  const _handleTextChange = (text) => {
    setNewTask(text);
    console.log(newTask);
  };
  const _onBlur = () => {
    setNewTask("");
  };
  return isReady ? (
    <SafeAreaView style={[Styles.safeAreaView, theme.background]}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <Text style={[Styles.title, theme.main]}>ToDo List</Text>
      <Input
        placeholder={"+ Add a Task"}
        value={newTask}
        onChangeText={_handleTextChange}
        onSubmitEditing={_addTask}
        onBlur={_onBlur}
      />
      <ScrollView style={Styles.ScrollView}>
        {Object.values(tasks)
          .reverse()
          .map((item) => (
            <Task
              key={item.id}
              item={item}
              deleteTask={_deleteTask}
              toggleTask={_toggleTask}
              updateTask={_updateTask}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <AppLoading
      startAsync={_loadTasks}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
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
  ScrollView: {
    flex: 1,
    width: width - 40,
  },
});

export default App;

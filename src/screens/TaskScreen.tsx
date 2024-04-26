import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { BottomNavi } from "../components/BottomNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { getTasks, saveTasks } from "../async/asyncConfigTasks";
import { PlusCircleIcon, TrashIcon } from "react-native-heroicons/outline";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export function Task({}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) {
  {
    /** Func. of data storage */
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await getTasks();
        setTasks(storedTasks);
      } catch (error) {
        console.error("Error retrieving tasks:", error);
      }
    };

    loadTasks();
  }, []);

  const addTask = async () => {
    if (newTaskName.trim() !== "") {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTaskName,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      try {
        await saveTasks(updatedTasks);
        setNewTaskName("");
        setShowNewTaskInput(false);
      } catch (error) {
        console.error("Error saving tasks:", error);
      }
    }
  };

  const handleTaskPress = async (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    try {
      await saveTasks(updatedTasks);
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const clearTask = async (taskId: number) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
    } catch (error) {
      console.error("Error clearing task:", error);
    }
  };

  {
    /** Navigation */
  }
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    taskText: {
      flex: 1,
      fontSize: 18,
      color: "#fff",
      backgroundColor: "#333",
      borderColor: "#333",
      borderRadius: 8,
      borderWidth: 1,
      padding: 15,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    completedTask: {
      textDecorationLine: "line-through",
    },
    addButton: {
      borderRadius: 5,
      padding: 10,
      alignItems: "flex-end",
      justifyContent: "flex-end",
      alignSelf: "flex-end",
      marginBottom: 4,
      marginRight: 4,
    },
    addButtonInput: {
      padding: 10,
      backgroundColor: "#000",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      alignSelf: "flex-end",
      marginBottom: 4,
      marginRight: 4,
      borderColor: "#ccc",
      borderRadius: 8,
      borderWidth: 1,
    },
    addButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      color: "#fff",
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginRight: 10,
      fontWeight: "bold",
      fontSize: 20,
    },
    newTaskContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
    },
  });

  {
    /**Screen */
  }

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 bg-neutral-800">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <View className="py-2 flex-1 justify-center items-center">
            <Text className="text-white font-bold text-3xl">Your Tasks</Text>
          </View>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              className="px-10 py-5 pt- border-bottom-width-1 border-bottom-color-gray-400 flex-row mt-4"
              onPress={() => handleTaskPress(task.id)}
            >
              <Text
                style={[
                  styles.taskText,
                  task.completed && styles.completedTask,
                ]}
              >
                {task.title}
              </Text>
              <TouchableOpacity onPress={() => clearTask(task.id)}>
                <TrashIcon size={40} color={"#fff"} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}

          {showNewTaskInput && (
            <View style={styles.newTaskContainer}>
              <TextInput
                value={newTaskName}
                onChangeText={setNewTaskName}
                placeholder="Enter task name"
                placeholderTextColor={"#fff"}
                style={styles.input}
              />
              <TouchableOpacity onPress={addTask} style={styles.addButtonInput}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setShowNewTaskInput(true)}
          style={styles.addButton}
        >
          <PlusCircleIcon size={50} color="#fff" />
        </TouchableOpacity>
      </View>
      <BottomNavi />
    </SafeAreaView>
  );
}

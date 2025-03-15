import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, Button, CheckBox, Platform } from 'react-native'; // Ensure Platform is imported here

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default function App() {
  // Initialize state for tasks
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy stuff', completed: false },
    { key: '2', description: 'Do assignment', completed: false },
  ]);

  // Initialize state for the input value
  const [taskInput, setTaskInput] = useState('');

  // Handle adding new task
  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        key: (tasks.length + 1).toString(),
        description: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput(''); // Clear input field after adding task
    }
  };

  // Handle toggling task completion
  const toggleTaskCompletion = (taskKey) => {
    setTasks(
      tasks.map((task) =>
        task.key === taskKey ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Render each task item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.task}>
        <CheckBox
          value={item.completed}
          onValueChange={() => toggleTaskCompletion(item.key)}
        />
        <Text
          style={[
            styles.taskText,
            item.completed && {
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            },
          ]}
        >
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Task list */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      {/* Input box and Add button */}
      <TextInput
        style={styles.input}
        value={taskInput}
        onChangeText={setTaskInput}
        placeholder="Enter new task"
      />
      <Button title="Add" onPress={addTask} />
    </SafeAreaView>
  );
}

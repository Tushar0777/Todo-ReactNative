import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { addTask } from "@/src/services/api";

export default function AddTaskScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask({ title, description });
    router.back(); // go back to task list
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Task title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginVertical: 8, borderRadius: 5 },
});

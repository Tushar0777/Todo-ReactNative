import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getTasks } from "@/src/services/api";
import { Task } from "../src/types/Task";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getTasks();
      const found = res.data.find((t: Task) => t.id === Number(id));
      setTask(found);
    };
    fetch();
  }, [id]);

  if (!task) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>Created At: {new Date(task.created_at).toLocaleString()}</Text>
      <Text>Deadline: {task.deadline || "Not Set"}</Text>
      <Text>Created By: {task.created_by || "Anonymous"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

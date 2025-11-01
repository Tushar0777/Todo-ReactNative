import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getTasks, deleteTask, toggleTask } from "@/src/services/api";
import colors from "@/src/constants/colors";
import { Task } from "@/src/types/Task";

export default function TaskListScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleToggle = async (id: number, completed: boolean) => {
    await toggleTask(id, !completed);
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Add Task ➕" onPress={() => router.push("./add-task")} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.task, index === 0 && styles.latest]}
            onPress={() => router.push(`./${item.id}`)}
          >
            <Text style={[styles.title, item.completed && styles.completed]}>{item.title}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button title={item.completed ? "Undo" : "Done"} onPress={() => handleToggle(item.id, item.completed)} />
              <Button title="❌" onPress={() => handleDelete(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  task: { padding: 15, backgroundColor: colors.taskBg, borderRadius: 8, marginVertical: 6 },
  latest: { backgroundColor: colors.latestTaskBg },
  title: { fontSize: 18, fontWeight: "600" },
  completed: { textDecorationLine: "line-through", color: colors.textLight },
});

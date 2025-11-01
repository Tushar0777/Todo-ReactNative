import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Task } from "../types/Task";
import colors from "../constants/colors";

type Props = {
  task: Task;
  onPress?: (task: Task) => void;
  onToggle?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  isLatest?: boolean;
};

export default function TaskItem({ task, onPress, onToggle, onDelete, isLatest }: Props) {
  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(task);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[styles.container, isLatest && styles.latest]}
    >
      <View style={styles.left}>
        <Text style={[styles.title, task.completed && styles.completed]} numberOfLines={1}>
          {task.title}
        </Text>
        {task.deadline ? <Text style={styles.deadline}>Due: {task.deadline}</Text> : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggle?.(task)} style={styles.actionBtn}>
          <Text style={styles.actionText}>{task.completed ? "Undo" : "Done"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete?.(task)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>❌</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.taskBg,
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
  },
  latest: {
    backgroundColor: colors.latestTaskBg,
  },
  left: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  completed: {
    textDecorationLine: "line-through",
    color: colors.textLight,
  },
  deadline: {
    marginTop: 6,
    color: colors.textLight,
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "rgba(76,175,80,0.12)",
    marginRight: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#2e7d32",
  },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  deleteText: {
    fontSize: 16,
  },
});

import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Task } from "../types/Task";
import colors from "../constants/colors";

type Props = {
  visible: boolean;
  task?: Task | null;
  onClose: () => void;
};

export default function BottomSheet({ visible, task, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {!task ? (
          <Text style={styles.loading}>No task selected</Text>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.small}>{task.completed ? "Completed" : "In progress"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Created by</Text>
              <Text style={styles.value}>{task.created_by ?? "Unknown"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Created at</Text>
              <Text style={styles.value}>
                {task.created_at ? new Date(task.created_at).toLocaleString() : "—"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Deadline</Text>
              <Text style={styles.value}>{task.deadline ?? "Not set"}</Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.desc}>{task.description ?? "No description"}</Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#fff",
    padding: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: "60%",
    // place at bottom
  },
  loading: { textAlign: "center", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "700" },
  small: { color: colors.textLight, fontSize: 12 },
  row: { marginTop: 10, flexDirection: "row", justifyContent: "space-between" },
  label: { color: colors.textLight, fontSize: 12 },
  value: { fontSize: 13 },
  desc: { marginTop: 6, color: "#222" },
  closeBtn: {
    marginTop: 16,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    minWidth: 120,
  },
  closeText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

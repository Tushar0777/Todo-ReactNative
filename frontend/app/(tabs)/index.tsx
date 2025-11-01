import React, { JSX, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

// ⚙️ Replace with your local IP address
// const API_URL = "http://192.168.101.12:3000/tasks"; 
const API_URL = process.env.LOCAL_HOST_URL||"";

// ✅ Define TypeScript types
interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const fetchTasks = async (): Promise<void> => {
    try {
      const res = await axios.get<Task[]>(API_URL);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (): Promise<void> => {
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleComplete = async (id: number, completed: boolean): Promise<void> => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity onPress={() => toggleComplete(item.id, item.completed)}>
        <Text 
          style={{
            textDecorationLine: item.completed ? 'line-through' : 'none', 
            fontSize: 18,
          }}
        >
          {item.title}
        </Text>
        {item.description ? <Text>{item.description}</Text> : null}
      </TouchableOpacity>
      <Button title="❌" onPress={() => deleteTask(item.id)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>📝 Todo App</Text>

      <TextInput
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
      />
    </SafeAreaView>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { 
    borderWidth: 1, 
    padding: 8, 
    marginVertical: 5, 
    borderRadius: 5, 
    backgroundColor: 'white' 
  },
  taskCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 10, 
    backgroundColor: '#fff', 
    marginVertical: 5, 
    borderRadius: 5 
  },
});

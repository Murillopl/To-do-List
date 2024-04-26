import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks) as Task[];
    }
  } catch (error) {
    console.error('Error retrieving tasks:', error);
  }
  return [];
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const clearTasks = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('tasks');
  } catch (error) {
    console.error('Error clearing tasks:', error);
  }
};

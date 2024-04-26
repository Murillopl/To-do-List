import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: number;
  content: string;
}

export const getNotes = async (): Promise<Note[]> => {
  try {
    const storedNotes = await AsyncStorage.getItem('notes');
    if (storedNotes) {
      return JSON.parse(storedNotes) as Note[];
    }
  } catch (error) {
    console.error('Error retrieving notes:', error);
  }
  return [];
};

export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const clearNotes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('notes');
  } catch (error) {
    console.error('Error clearing notes:', error);
  }
};


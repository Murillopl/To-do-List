import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getNotes, saveNotes } from "../async/configHome";
import { PlusCircleIcon, TrashIcon } from "react-native-heroicons/outline";
import { Note } from "../components/types";
import { BottomNavi } from "../components/BottomNavigation";

export function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [newNoteContent, setNewNoteContent] = useState<string>("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await getNotes();
        if (Array.isArray(storedNotes)) {
          setNotes(storedNotes as Note[]);
        } else {
          console.error("Stored notes is not an array:", storedNotes);
        }
      } catch (error) {
        console.error("Error retrieving notes:", error);
      }
    };

    loadNotes();
  }, []);
  const addNote = async () => {
    if (newNoteTitle.trim() !== "" && newNoteContent.trim() !== "") {
      const newNote: Note = {
        id: notes.length + 1,
        title: newNoteTitle,
        content: newNoteContent,
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      try {
        await saveNotes(updatedNotes);
        setNewNoteContent("");
        setNewNoteTitle("");
      } catch (error) {
        console.error("Error saving notes:", error);
      }
    }
  };
  const clearNote = async (noteId: number) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
      await saveNotes(updatedNotes);
    } catch (error) {
      console.error("Error clearing note:", error);
    }
  };
  const NoteCard = ({
    note,
    onPress,
    children,
  }: {
    note: Note;
    onPress: () => void;
    children?: React.ReactNode;
  }) => {
    return (
      <TouchableOpacity className="flex-row justify-between" style={styles.noteItem} onPress={onPress}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {note.title}
        </Text>
        {children}
      </TouchableOpacity>
    );
  };

  const handleEditNote = (note: Note) => {
    navigation.navigate("NoteScreen", {
      setNewNote: (editedNote: Note) => {
        const updatedNotes = notes.map((n) =>
          n.id === editedNote.id ? editedNote : n
        );
        setNotes(updatedNotes);
        saveNotes(updatedNotes);
      },
      noteToEdit: note,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    noteItem: {
      backgroundColor: "#333",
      padding: 20,
      marginTop: 30,
      borderRadius: 12,
      alignItems: "center",
    },
    addButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: "blue",
      borderRadius: 25,
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>

      <View className="flex-1 bg-neutral-800">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <View className="py-2 flex-1 justify-center items-center">
            <Text className="text-white font-bold text-3xl">Your Notes</Text>
          </View>
          {/* Mapeando as notas para renderizar os cards */}
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onPress={() => handleEditNote(note)}
            >
              <TouchableOpacity onPress={()=> clearNote(note.id)}>
              <TrashIcon size={30} color={'#fff'}></TrashIcon>
              </TouchableOpacity>
            </NoteCard>
          ))}
        </ScrollView>
        <View className=" w-96 h-6 ">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NoteScreen", {
                setNewNote: (newNote: Note) => {
                  setNotes([...notes, newNote]);
                  saveNotes([...notes, newNote]);
                },
              })
            }
            className=" items-end justify-end mb-4 mr-4"
          >
            <PlusCircleIcon size={50} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavi />
    </SafeAreaView>
  );
}

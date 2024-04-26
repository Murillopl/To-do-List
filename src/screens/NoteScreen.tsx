import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {  useLayoutEffect, useState } from "react";
import { CheckIcon } from "react-native-heroicons/outline";
import { Note } from "../components/types";
import { useEffect } from "react";

interface NoteScreenProps {
  route: { params: { setNewNote: (newNote: Note) => void; noteToEdit?: Note } };
}

export function NoteScreen({ route }: NoteScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [newNoteTitle, setNewNoteTitle] = useState<string>(
    route.params?.noteToEdit?.title || ""
  );
  const [newNoteContent, setNewNoteContent] = useState<string>(
    route.params?.noteToEdit?.content || ""
  );

  const addNote = async () => {
    if (route.params && route.params.setNewNote) {
      if (newNoteTitle.trim() !== "" && newNoteContent.trim() !== "") {
        const newNote: Note = {
          id: route.params.noteToEdit?.id || Math.floor(Math.random() * 1000), // Use o ID existente ou gere um novo ID se for uma nova nota
          title: newNoteTitle,
          content: newNoteContent,
        };
        route.params.setNewNote(newNote);
        navigation.goBack();
      } else {
        console.error("Error saving note: Title and content cannot be empty.");
      }
    } else {
      console.error("Error saving note: setNewNote is undefined or not provided.");
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (route.params && route.params.noteToEdit) {
      const { title, content } = route.params.noteToEdit;
      setNewNoteTitle(title || "");
      setNewNoteContent(content || "");
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View className="bg-neutral-800 py-2 items-center">
        <Text className="text-white font-bold text-3xl">Write Your Note</Text>
      </View>
      
      <View className="flex-1 bg-neutral-800">
      <TouchableOpacity className="flex-end justify-end items-end mr-3" onPress={addNote}>
        <CheckIcon size={30} color={'#fff'}></CheckIcon>
      </TouchableOpacity>
        <TextInput
          value={newNoteTitle}
          onChangeText={(text) => setNewNoteTitle(text)}
          placeholder="Title..."
          placeholderTextColor={"#ccc"}
          className=" py-4 items-start justify-start font-bold text-lg mb-2 text-white"
        ></TextInput>

        <TextInput
          value={newNoteContent}
          onChangeText={(text) => setNewNoteContent(text)}
          placeholder="Type..."
          placeholderTextColor={"#ccc"}
          className=" py-4 items-start justify-start font-bold text-lg border-t-2 border-white text-white"
        ></TextInput>
        <ScrollView
          className=""
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        ></ScrollView>
      </View>
    </SafeAreaView>
  );
}



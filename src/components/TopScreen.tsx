import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React from "react"; // Import React directly
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { PlusCircleIcon } from "react-native-heroicons/outline";

interface Props {
  currentScreen: string;
}

export const TopScreen: React.FC<Props> = ({ currentScreen }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
  });


  const handleNavigation = (targetScreen: string, ) => {
    if (currentScreen === 'Home' && targetScreen === 'AddPage') {
      navigation.navigate(targetScreen);
    } else {
      navigation.navigate('AddPageTask');
    }
  };

  return (
      <View className="flex-1 bg-neutral-800">
        <ScrollView
          className=""
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
        </ScrollView>
        <View className=" w-96 h-6 ">
          <TouchableOpacity
            onPress={() => handleNavigation("AddPage")}
            className=" items-end justify-end mb-4 mr-4"
          >
            <PlusCircleIcon size={50} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
  );
};

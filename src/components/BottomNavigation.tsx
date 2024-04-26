import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import { ClipboardDocumentCheckIcon, NewspaperIcon } from "react-native-heroicons/outline";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width: windowWidth } = Dimensions.get("window");

export function BottomNavi() {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView>
    <View className="bg-neutral-900 items-end { width: windowWidth } h-24 justify-center items-center border-t-2 border-white ">
          <View className="flex-1 flex-row ">
            <TouchableOpacity className="flex-1 items-center justify-center" onPress={() => navigation.navigate('Home')}>
              <NewspaperIcon size={50} color="#fff"></NewspaperIcon>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center justify-center " onPress={() => navigation.navigate('Task')} >
              <ClipboardDocumentCheckIcon
                size={50}
                color="#fff"
              ></ClipboardDocumentCheckIcon>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

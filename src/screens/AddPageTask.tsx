import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export function AddPageTask() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight,
        },
      });

  return (
    <SafeAreaView style={styles.container}>
    <View>
        <Text>Hello</Text>
    </View>
    </SafeAreaView>
  );
}

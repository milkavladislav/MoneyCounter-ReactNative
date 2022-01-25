import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useCallback, useState } from "react";
import { useEffect } from "react";

export const Transactions = () => {
  const [text, setText] = useState("");
  const [budget, setBudget] = useState<null | number>(null);

  const updateBudget = async (amount: number, typeOfTransaction: string) => {
    try {
        let changes = typeOfTransaction === 'profit' ? amount : (0 - amount);
        let newBudget = budget !== null ? budget + changes : changes;
        const jsonValue = JSON.stringify(newBudget);
        await AsyncStorage.setItem("@budget", jsonValue);
        console.log(newBudget)
        setBudget(newBudget);
    } catch (e) {
      alert("data don`t store(((");
    }
  };


  const getBudget = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@budget");
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      setBudget(value)
    } catch (e) {
      alert("data don`t read(((");
    }
  };

  useEffect(
    () => {
        getBudget();
    }, []
  )

  return (
    <View style={styles.container}>
      <Text>Our budget: {budget}</Text>
      <TextInput
        autoComplete
        label="amount"
        keyboardType='numeric'
        value={text}
        right={<TextInput.Affix text="грн" />}
        onChangeText={(text) => {
            isNaN(+text) ? alert('Enter valid number') :  setText(text)}
        }
      />
      <View style={styles.buttonsContainer}>
        <Button children="Profit" onPress={() => updateBudget(+text, 'profit')} icon="plus-circle" />
        <Button children="Loss" onPress={() => updateBudget(+text, 'loss')} icon="minus-circle" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ff0",
    paddingTop: 50,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});

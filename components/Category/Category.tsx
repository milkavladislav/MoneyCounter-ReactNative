import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Chip, Card, Avatar, IconButton } from "react-native-paper";
import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { getAllAccounts } from "../../storeFunctions/accounts";
import { IAccount, ICategory, TransactionType } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { FlatGrid } from "react-native-super-grid";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTransaction } from "../../storeFunctions/transactions";
import { deleteCategory } from "../../storeFunctions/categries";

export const Category = () => {
  const [categories, setCategories] = useState<null | ICategory[]>(null);

  const [type, setType] = useState(TransactionType.Income);

  const getData = async () => {
    setCategories(mockCategories);
  };

  useEffect(() => {
    getData();
  }, []);

  const mockCategories: ICategory[] = [
    {
      id: 100,
      name: "Sport",
      icon: "volleyball",
      type: TransactionType.Expenses,
      amount: 0,
    },
    {
      id: 101,
      name: "Gift",
      icon: "gift",
      type: TransactionType.Expenses,
      amount: 0,
    },
    {
      id: 102,
      name: "Gift",
      icon: "gift",
      type: TransactionType.Income,
      amount: 0,
    },
    {
      id: 103,
      name: "Education",
      icon: "teach",
      type: TransactionType.Expenses,
      amount: 0,
    },
    {
      id: 104,
      name: "Work",
      icon: "laptop",
      type: TransactionType.Income,
      amount: 0,
    },
    {
      id: 105,
      name: "Deposit",
      icon: "bank-plus",
      type: TransactionType.Expenses,
      amount: 0,
    },
    {
      id: 106,
      name: "Credit",
      icon: "bank-minus",
      type: TransactionType.Income,
      amount: 0,
    },
    {
      id: 107,
      name: "Food",
      icon: "food",
      type: TransactionType.Expenses,
      amount: 0,
    },
    {
      id: 108,
      name: "Home",
      icon: "home",
      type: TransactionType.Expenses,
      amount: 0,
    },
  ];

  return (
    <LinearGradient colors={["#f7ff00", "#db36a4"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView style={styles.scrollView} nestedScrollEnabled scrollEnabled>
          <Text style={styles.header}>Manage categories</Text>
          <View style={styles.buttonsContainer}>
            <Button
              children={TransactionType.Income}
              style={styles.typeButton}
              color="green"
              mode={type === TransactionType.Income ? "contained" : "text"}
              onPress={() => setType(TransactionType.Income)}
              icon="plus-circle"
            />
            <Button
              children={TransactionType.Expenses}
              style={styles.typeButton}
              color="red"
              mode={type === TransactionType.Expenses ? "contained" : "text"}
              onPress={() => setType(TransactionType.Expenses)}
              icon="minus-circle"
            />
          </View>
          {
            categories && categories.filter((category) => category.type === type).map((category) => (
              <Card key={category.id} elevation={1} style={{padding: 15, marginVertical: 10, marginHorizontal: 5, borderRadius: 10, backgroundColor: '#CFDAFF'}}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Icon icon={category.icon} size={80} />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    flexDirection: "row",
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{fontSize: 20}}>{category.name}</Text>
                  <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20}}>{category.amount}$</Text>
                </View>
                <View
                  style={{
                    marginLeft: 20,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton icon={"pencil"} color="black" onPress={() => alert('test edit')}  size={30} style={{backgroundColor: '#fff59d'}} />
                  <IconButton icon={"delete"} color="black" onPress={() => alert('test delete')}  size={30} style={{backgroundColor: '#ff7043'}}/>
                </View>
              </View>
            </View>
          </Card>
            ))
          }
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <Button
              children="New category"
              style={styles.addButton}
              labelStyle={styles.addButtonLabel}
              color="green"
              mode={"contained"}
              onPress={() => alert('Test mode')}
              icon="plus-circle-outline"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  header: {
    marginVertical: 30,
    textAlign: "center",
    fontSize: 30,
  },
  buttonsContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  categoriesContainer: {
    flex: 15,
    flexDirection: "row",
  },
  optionsTitle: {
    fontSize: 14,
    marginTop: 15,
  },
  typeButton: {
    height: 40,
    width: 150,
  },
  categoriesButton: {},
  activeCategoriesButton: {
    backgroundColor: "#FBD786",
    borderColor: "#f5af19",
    borderWidth: 2,
  },
  addButton: {
    borderRadius: 20,
    marginBottom: 30,
    width: "80%",
  },
  addButtonLabel: {
    fontSize: 20,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
});

import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  Button,
  TextInput,
  Chip,
  Card,
  Avatar,
  IconButton,
  Portal,
  Dialog,
} from "react-native-paper";
import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { getAllAccounts } from "../../storeFunctions/accounts";
import { IAccount, ICategory, TransactionType } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { FlatGrid } from "react-native-super-grid";
import { addTransaction } from "../../storeFunctions/transactions";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../storeFunctions/categries";
import { AddDialog } from "./AddDialog";
import { EditDialog } from "./EditDialog";

export const Category = () => {
  const [categories, setCategories] = useState<null | ICategory[]>(null);
  const [type, setType] = useState(TransactionType.Income);

  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const showAddDialog = () => setAddVisible(true);
  const closeAddDialog = () => setAddVisible(false);

  const showEditDialog = () => setEditVisible(true);
  const closeEditDialog = () => setEditVisible(false);

  const getData = async () => {
    setCategories(await getAllCategories());
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
          {categories &&
            categories
              .filter((category) => category.type === type)
              .map((category) => (
                <Card
                  key={category.id}
                  elevation={1}
                  style={styles.categoryCard}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Avatar.Icon icon={category.icon} size={80} />
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 20,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>{category.name}</Text>
                        <Text
                          style={styles.amount}
                        >
                          {category.amount}$
                        </Text>
                      </View>
                      <View
                        style={styles.cardButtons}
                      >
                        <IconButton
                          icon={"pencil"}
                          color="black"
                          onPress={showEditDialog}
                          size={30}
                          style={{ backgroundColor: "#fff59d" }}
                        />
                        <IconButton
                          icon={"delete"}
                          color="black"
                          onPress={async () => {
                            category.id && (await deleteCategory(category.id));
                            await getData();
                            alert("Category deleted");
                          }}
                          size={30}
                          style={{ backgroundColor: "#ff7043" }}
                        />
                      </View>
                      <EditDialog
                          oldCategory={category}
                          visible={editVisible}
                          closeDialog={closeEditDialog}
                          editCategory={async (
                            newCategoryName,
                            newCategoryIcon
                          ) => {
                            category.id &&
                              (await updateCategory(
                                category.id,
                                newCategoryName,
                                newCategoryIcon
                              ));
                            getData();
                            alert("Category updated");
                          }}
                        />
                    </View>
                  </View>
                </Card>
              ))}
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <Button
              children="New category"
              style={styles.addButton}
              labelStyle={styles.addButtonLabel}
              color="green"
              mode={"contained"}
              onPress={showAddDialog}
              icon="plus-circle-outline"
            />
            <AddDialog
              visible={addVisible}
              closeDialog={closeAddDialog}
              addCategory={async (category: ICategory) => {
                await addCategory(category);
                getData();
                alert("Category added");
              }}
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
  categoryCard: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#CFDAFF",
  },
  cardButtons: {
    marginLeft: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  }
});

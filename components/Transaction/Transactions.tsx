import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Chip } from "react-native-paper";
import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { AccountPopup } from "./AccountPopup";
import { getAllAccounts } from "../../storeFunctions/accounts";
import { IAccount, ICategory, TransactionType } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { FlatGrid } from "react-native-super-grid";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTransaction } from "../../storeFunctions/transactions";
import { getAllCategories } from "../../storeFunctions/categries";

export const Transactions = () => {
  const [accounts, setAccounts] = useState<null | IAccount[]>(null);
  const [categories, setCategories] = useState<null | ICategory[]>(null);
  const [currentAccount, setCurrentAccount] = useState<null | IAccount>(null);

  const [transactionAmount, setTransactionAmount] = useState("");
  const [account, setAccount] = useState<null | IAccount>(null);
  const [category, setCategory] = useState<null | ICategory>(null);
  const [type, setType] = useState(TransactionType.Expenses);
  const [comment, setComment] = useState("");

  const getData = async () => {
    const accounts = await getAllAccounts();
    setCurrentAccount(accounts[0]);

    setAccounts(accounts);
    setAccount(accounts[0]);

    const categories = await getAllCategories();
    setCategories(categories);
    setCategory(categories[0]);
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

  const changeAccount =
    (setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>) =>
    (newCurrentAccount: string) => {
      const foundAccount = accounts?.find(
        (account) => account.name === newCurrentAccount
      );
      if (foundAccount === undefined) return;
      setAccount(foundAccount);
    };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const handleAddTransaction = () => {
    if (account && category && account.id && category.id)
      addTransaction({
        idAccount: account?.id,
        idCategory: category?.id,
        amount: type === TransactionType.Expenses ? (0 - +transactionAmount) : +transactionAmount,
        date: date,
        comment: comment,
        photos: [],
      }).then(() => {
        getData();
        alert("Transaction add successfully");
      });
  };

  return (
    <LinearGradient colors={["#f7ff00", "#db36a4"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView style={styles.scrollView} nestedScrollEnabled scrollEnabled>
          {accounts && currentAccount && (
            <AccountPopup
              changeAccount={changeAccount(setCurrentAccount)}
              accounts={accounts}
              currentAccount={currentAccount}
              buttonStyle="big"
            />
          )}
          <Text style={styles.optionsTitle}>Amount</Text>
          <TextInput
            autoComplete
            keyboardType="numeric"
            value={transactionAmount}
            mode="outlined"
            right={<TextInput.Affix text="$" />}
            onChangeText={(text) => {
              isNaN(+text)
                ? alert("Enter valid number")
                : setTransactionAmount(text);
            }}
          />
          <Text style={styles.optionsTitle}>Account</Text>
          {accounts && account && (
            <AccountPopup
              changeAccount={changeAccount(setAccount)}
              accounts={accounts}
              currentAccount={account}
              buttonStyle="small"
            />
          )}
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
          <Text style={styles.optionsTitle}>Categories</Text>
          {categories && (
            <FlatGrid
              nestedScrollEnabled
              itemDimension={110}
              data={categories.filter((category) => category.type === type)}
              fixed
              scrollEnabled
              spacing={10}
              renderItem={({ item }) => (
                <Chip
                  icon={item.icon}
                  onPress={() => setCategory(item)}
                  style={
                    item.id === category?.id
                      ? styles.activeCategoriesButton
                      : styles.categoriesButton
                  }
                >
                  {item.name}
                </Chip>
              )}
            />
          )}
          <Text style={styles.optionsTitle}>Date</Text>
          <Button onPress={showMode} children="Show date picker!" />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Text style={styles.optionsTitle}>Comment</Text>
          <TextInput
            autoComplete
            keyboardType="default"
            value={comment}
            mode="outlined"
            multiline
            numberOfLines={3}
            onChangeText={(text) => setComment(text)}
          />
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <Button
              children="Add transaction"
              style={styles.addButton}
              labelStyle={styles.addButtonLabel}
              color="green"
              mode={"contained"}
              onPress={handleAddTransaction}
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
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
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

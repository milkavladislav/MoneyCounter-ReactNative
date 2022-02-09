import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, Chip } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { AccountPopup } from "../Transaction/AccountPopup";
import { getAllAccounts } from "../../storeFunctions/accounts";
import {
  IAccount,
  ICategory,
  ITransaction,
  TransactionType,
} from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { FlatGrid } from "react-native-super-grid";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAllCategories } from "../../storeFunctions/categories";
import { getAllTransactions } from "../../storeFunctions/transactions";
import { TransactionCard } from "./TransactionCard";
import { Reload } from "../ReloadButton";

export const History = () => {
  const [accounts, setAccounts] = useState<null | IAccount[]>(null);
  const [categories, setCategories] = useState<null | ICategory[]>(null);
  const [transactions, setTransactions] = useState<null | ITransaction[]>(null);

  const [account, setAccount] = useState<null | IAccount>(null);
  const [category, setCategory] = useState<null | ICategory>(null);
  const [type, setType] = useState<"All" | TransactionType>(
    TransactionType.Expenses
  );

  const [expanded, setExpanded] = useState(true);

  const hideFilter = () => setExpanded(false);
  const showFilter = () => setExpanded(true);

  const getData = async () => {
    const accounts = await getAllAccounts();
    setAccounts(accounts);
    setAccount(accounts[0]);

    const categories = await getAllCategories();
    setCategories(categories);
    setCategory(categories[0]);

    setTransactions(await getAllTransactions());
  };

  useEffect(() => {
    getData();
  }, []);

  const changeAccount =
    (setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>) =>
    (newCurrentAccount: string) => {
      const foundAccount = accounts?.find(
        (account) => account.name === newCurrentAccount
      );
      if (foundAccount === undefined) return;
      setAccount(foundAccount);
    };

  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);

  const onChangeStartDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || endDate;
    setShowEndDate(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showModeStartDate = () => {
    setShowStartDate(true);
  };

  const showModeEndDate = () => {
    setShowEndDate(true);
  };

  return (
    <><LinearGradient colors={["#f7ff00", "#db36a4"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView style={styles.scrollView} nestedScrollEnabled scrollEnabled>
          <Text style={styles.header}>Transactions history</Text>
          {expanded ? (
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                margin: 5,
                borderRadius: 10,
                padding: 10
              }}
            >
              <Text style={styles.optionsTitle}>Account</Text>
              {accounts && account && (
                <AccountPopup
                  changeAccount={changeAccount(setAccount)}
                  accounts={accounts}
                  currentAccount={account}
                  buttonStyle="small" />
              )}
              <Text style={styles.optionsTitle}>Type</Text>
              <View style={styles.buttonsContainer}>
                <Button
                  labelStyle={{ fontSize: 10 }}
                  children={"All"}
                  style={styles.typeButton}
                  color="yellow"
                  mode={type === "All" ? "contained" : "text"}
                  onPress={() => setType("All")} />
                <Button
                  children={TransactionType.Income}
                  style={styles.typeButton}
                  labelStyle={{ fontSize: 10 }}
                  color="green"
                  mode={type === TransactionType.Income ? "contained" : "text"}
                  onPress={() => setType(TransactionType.Income)} />
                <Button
                  children={TransactionType.Expenses}
                  style={styles.typeButton}
                  labelStyle={{ fontSize: 10 }}
                  color="red"
                  mode={type === TransactionType.Expenses ? "contained" : "text"}
                  onPress={() => setType(TransactionType.Expenses)} />
              </View>
              <Text style={styles.optionsTitle}>Categories</Text>
              {categories && (
                <FlatGrid
                  nestedScrollEnabled
                  itemDimension={100}
                  data={categories.filter(
                    (category) => type === "All" || category.type === type
                  )}
                  fixed
                  scrollEnabled
                  spacing={10}
                  renderItem={({ item }) => (
                    <Chip
                      icon={item.icon}
                      onPress={() => setCategory(item)}
                      style={item.id === category?.id &&
                        styles.activeCategoriesButton}
                    >
                      {item.name}
                    </Chip>
                  )} />
              )}
              <View style={styles.buttonsContainer}>
                <View>
                  <Text style={styles.dateOptionsTitle}>Start date</Text>
                  <Button
                    onPress={showModeStartDate}
                    children={startDate.toDateString()} />
                </View>
                <View>
                  <Text style={styles.dateOptionsTitle}>End date</Text>
                  <Button
                    onPress={showModeEndDate}
                    children={endDate.toDateString()} />
                </View>
              </View>
              {showStartDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  maximumDate={endDate}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeStartDate} />
              )}
              {showEndDate && (
                <DateTimePicker
                  testID="dateTimePicker2"
                  value={endDate}
                  mode={"date"}
                  minimumDate={startDate}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeEndDate} />
              )}
              <Button onPress={hideFilter} icon="arrow-up-drop-circle">
                Hide filter
              </Button>
            </View>
          ) : (
            <Button onPress={showFilter} icon="arrow-down-drop-circle">
              Show filter
            </Button>
          )}
          {transactions &&
            transactions
              .filter(
                (transaction) => new Date(transaction.date).getTime() <=
                  new Date(endDate).getTime() &&
                  new Date(transaction.date).getTime() >=
                  new Date(startDate).getTime() &&
                  transaction.idCategory === category?.id &&
                  transaction.idAccount === account?.id
              )
              .map((transaction: ITransaction) => (
                <TransactionCard
                  key={transaction.id}
                  updateData={getData}
                  transaction={transaction}
                  category={categories?.find(
                    (category) => category.id === transaction.idCategory
                  )}
                  account={accounts?.find(
                    (account) => account.id === transaction.idAccount
                  )} />
              ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
    <Reload getData={getData} /></>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 30,
    textAlign: "center",
    fontSize: 30,
  },
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
  dateOptionsTitle: {
    fontSize: 14,
    marginTop: 15,
    textAlign: "center",
  },
  typeButton: {
    height: 35,
    width: 120,
  },
  activeCategoriesButton: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
    borderWidth: 2,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BottomNavigation, DefaultTheme,  Provider as PaperProvider, Button } from "react-native-paper";
import { useState } from "react";
import { Transactions } from "./components/Transaction/Transactions";
import { addAccount, deleteAllAccounts, getAllAccounts, updateAccount } from "./storeFunctions/accounts";
import { deleteAllTransactions, getAllTransactions } from "./storeFunctions/transactions";
import { Category } from "./components/Category/Category";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'yellow',
  },
};

export default () => {


  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'statistic', title: 'Statistic', icon: 'chart-histogram', color: '#f64f59'},
    { key: 'category', title: 'Category', icon: 'vector-triangle', color: '#f64f59'},
    { key: 'transactions', title: 'Transactions', icon: 'wallet', color: '#c471ed' },
    { key: 'account', title: 'Account', icon: 'account-outline', color: '#6dd5ed' },
  ]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@budget");
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      alert(
        value != null
          ? value
          : "not found"
      );
    } catch (e) {
      alert("data don`t read(((");
    }
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      alert(keys);
    } catch (e) {
      alert("data don`t read(((");
    }
  };

    const MusicRoute = () => <Text>Music</Text>;

    const RecentsRoute = () => (<View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableOpacity onPress={getData}>
        <Text>Read Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getAllKeys}>
        <Text>GetAllKeys</Text>
      </TouchableOpacity>
      <Button icon="content-save" dark mode="contained" onPress={() => addAccount({name: 'Caq', amount: 0})}>
        Add account
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => getAllAccounts()}>
        Show all accounts
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => deleteAllAccounts()}>
        Delete all accounts
      </Button>
      {/* <Button icon="content-save" dark mode="contained" onPress={() => updateAccount({name: 'Caw', amount: 29}, {name: 'Caw', amount: 100})}>
        Update accounts
      </Button> */}
      <Button icon="content-save" dark mode="contained" onPress={() => addAccount({name: 'Caq', amount: 29})}>
        Add category
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => getAllAccounts()}>
        Show all categories
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => deleteAllAccounts()}>
        Delete all categories
      </Button>
      {/* <Button icon="content-save" dark mode="contained" onPress={() => updateAccount({name: 'Caw', amount: 29}, {name: 'Caw', amount: 100})}>
        Update category
      </Button> */}
      <Button icon="content-save" dark mode="contained" onPress={() => getAllTransactions()}>
        Show all transactions
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => deleteAllTransactions()}>
        Delete all transactions
      </Button>
    </View>);
    

    const renderScene = BottomNavigation.SceneMap({
      statistic: MusicRoute,
      category: Category,
      transactions: Transactions,
      account: RecentsRoute,
    });


  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
      shifting
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

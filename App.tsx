import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BottomNavigation, DefaultTheme,  Provider as PaperProvider, Button } from "react-native-paper";
import { useState } from "react";
import { Transactions } from "./components/Transaction/Transactions";
import { addAccount, deleteAllAccounts, getAllAccounts, updateAccount } from "./storeFunctions/accounts";

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
    { key: 'transactions', title: 'Transactions', icon: 'wallet', color: '#c471ed' },
    { key: 'account', title: 'Account', icon: 'account-outline', color: '#6dd5ed' },
  ]);

  const saveData = () => {
    storeData({
      user: {
        name: "Vlad",
        surname: "Milka",
      },
    });
  };

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Ke", jsonValue);
      alert('data was saved')
    } catch (e) {
      alert("data don`t store(((");
    }
  };

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
      <Button icon="content-save" dark mode="contained" onPress={saveData}>
        Press me
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => addAccount({name: 'Caq', amount: 29})}>
        Add account
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => getAllAccounts()}>
        Show all accounts
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => deleteAllAccounts()}>
        Delete all accounts
      </Button>
      <Button icon="content-save" dark mode="contained" onPress={() => updateAccount({name: 'Caw', amount: 29}, {name: 'Caw', amount: 100})}>
        Update accounts
      </Button>
    </View>);
    

    const renderScene = BottomNavigation.SceneMap({
      statistic: MusicRoute,
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

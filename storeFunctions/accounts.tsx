import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAccount } from "../types";

const accountsKey = "@accounts";

const addAccount = async (newAccount: IAccount) => {
  try {
    const value = await getAllAccounts();
    console.log(value)
    if(value.filter((account: IAccount) => account.name === newAccount.name).length !== 0) {
        throw new Error("Account already exist");
    }
    value.push(newAccount)
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(accountsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const getAllAccounts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(accountsKey);
    console.log(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : [] ;
  } catch (e) {
    alert(e);
  }
};

const deleteAllAccounts = async () => {
  try {
    await AsyncStorage.removeItem(accountsKey);
  } catch (e) {
    alert(e);
  }
};

const updateAccount = async (oldAccount: IAccount, newAccount: IAccount) => {
  try {
    const value = await getAllAccounts();
    const updateAccounts = value.map((account: IAccount) =>
      account.name === oldAccount.name ? newAccount : account
    );
    const jsonValue = JSON.stringify(updateAccounts);
    await AsyncStorage.setItem(accountsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

export { addAccount, getAllAccounts, deleteAllAccounts, updateAccount };

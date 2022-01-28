import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAccount } from "../types";

const accountsKey = "@accounts";

const addAccount = async (newAccount: IAccount) => {
  try {
    const value = await getAllAccounts();
    if(value.filter((account: IAccount) => account.name === newAccount.name).length !== 0) {
        throw new Error("Account already exist");
    }
    newAccount.id = new Date().getTime();
    value.push(newAccount)
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(accountsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const getAllAccounts = async (): Promise<IAccount[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(accountsKey);
    console.log(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : [] ;
  } catch (e) {
    alert(e);
  }
  return [];
};

const deleteAllAccounts = async () => {
  try {
    await AsyncStorage.removeItem(accountsKey);
  } catch (e) {
    alert(e);
  }
};

const updateAccount = async (oldAccountId: number, newAccountName: string) => {
  try {
    const value = await getAllAccounts();
    value.map((account: IAccount) => {
      if(account.id === oldAccountId){
        account.name = newAccountName;
      }
    });
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(accountsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const updateAccountAmount = async (accountId: number, transactionAmount: number) => {
  try {
    const value = await getAllAccounts();
    value.map((account: IAccount) => {
      if(account.id === accountId){
        account.amount += transactionAmount;
      }
    });
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(accountsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

export { addAccount, getAllAccounts, deleteAllAccounts, updateAccount, updateAccountAmount };

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITransaction } from "../types";
import { updateAccountAmount } from "./accounts";
import { updateCategoryAmount } from "./categries";

const transactionsKey = "@transactions";

const addTransaction = async (newTransaction: ITransaction) => {
  try {
    const transactions = await getAllTransactions();
    newTransaction.id = new Date().getTime();
    await updateAccountCategoryAmount(
      newTransaction.idAccount,
      newTransaction.idCategory,
      newTransaction.amount
    );
    console.log(transactions)
    transactions.push(newTransaction);
    const jsonValue = JSON.stringify(transactions);
    await AsyncStorage.setItem(transactionsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const getAllTransactions = async (): Promise<ITransaction[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(transactionsKey);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    alert(e);
  }
  return [];
};

const deleteTransaction = async (transactionId: number) => {
  try {
    const value = await getAllTransactions();
    const transactions = value.filter((transaction: ITransaction) => transaction.id !== transactionId);
    const jsonValue = JSON.stringify(transactions);
    await AsyncStorage.setItem(transactionsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const deleteAllTransactions = async () => {
  try {
    await AsyncStorage.removeItem(transactionsKey);
  } catch (e) {
    alert(e);
  }
};

const updateTransaction = async (
  oldTransactionId: number,
  newTransaction: ITransaction
) => {
  try {
    const transactions = await getAllTransactions();
    transactions.map(
      async (transaction: ITransaction) => {
        if (transaction.id === oldTransactionId) {
          if (transaction.amount !== newTransaction.amount) {
            await updateAccountCategoryAmount(
              transaction.idAccount,
              transaction.idCategory,
              newTransaction.amount - transaction.amount
            );
            transaction.amount = newTransaction.amount;
          }
          transaction.comment = newTransaction.comment;
          transaction.date = newTransaction.date;
          transaction.photos = newTransaction.photos;
        }
      }
    );
    const jsonValue = JSON.stringify(transactions);
    await AsyncStorage.setItem(transactionsKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const updateAccountCategoryAmount = async (
  idAccount: number,
  idCategory: number,
  differenceAmount: number
) => {
  await updateAccountAmount(idAccount, differenceAmount);
  await updateCategoryAmount(idCategory, differenceAmount);
};

export {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  deleteAllTransactions,
  updateTransaction,
};

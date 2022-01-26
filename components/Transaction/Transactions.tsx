import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, IconButton, TextInput} from "react-native-paper";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { AccountPopup } from "./AccountPopup";
import { getAllAccounts } from "../../storeFunctions/accounts";
import { IAccount } from "../../types";
import { LinearGradient } from 'expo-linear-gradient';

const expenses = "expenses";
const income = "income";

export const Transactions = () => {
  const [accounts, setAccounts] = useState<null | IAccount[]>(null);
  const [currentAccount, setCurrentAccount] = useState<null | IAccount>(null);

  const [transactionAmount, setTransactionAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<null | IAccount>(null);
  const [type, setType] = useState(expenses);


  useEffect(() => {
    const getData = async () => {
      const accounts = await getAllAccounts();
      setAccounts(accounts);
      setSelectedAccount(accounts[0]);
      setCurrentAccount(accounts[0]);
    };
    getData();
  }, []);

  const changeAccount = (setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>) => (newCurrentAccount: string) => {
    const foundAccount = accounts?.find(
      (account) => account.name === newCurrentAccount
    );
    if (foundAccount === undefined) return;
    setAccount(foundAccount);
  };

  return (
    <LinearGradient colors={['#f7ff00', '#db36a4']} style={styles.container}>
        {accounts && currentAccount && (
          <AccountPopup
            changeAccount={changeAccount(setCurrentAccount)}
            accounts={accounts}
            currentAccount={currentAccount}
            buttonStyle='big'
          />
        )}
        <TextInput
          autoComplete
          label="Amount"
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
        {accounts && selectedAccount && (
          <AccountPopup
            changeAccount={changeAccount(setSelectedAccount)}
            accounts={accounts}
            currentAccount={selectedAccount}
            buttonStyle='small'
          />
        )}
        <View style={styles.buttonsContainer}>
        <Button children={income} style={styles.typeButton} color="green" mode={type === income ? 'contained' : 'text'}   onPress={() => setType(income)} icon="plus-circle" />
        <Button children={expenses} style={styles.typeButton} color='red' mode={type === expenses ? 'contained' : 'text'} onPress={() => setType(expenses)} icon="minus-circle" />
        </View>
        <View style={styles.categoriesContainer}> 
          
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    marginVertical: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-evenly',
  },
  categoriesContainer: {
    marginVertical: 20,
    flex: 4,
    flexDirection: "row",
    justifyContent: 'space-evenly',
  },
  optionsTitle: {
    fontSize: 14,
    marginTop: 15,
  },
  typeButton: {
    height: 40,
    width: 150
  },
  contentIncomeButton: {
    backgroundColor: 'green',
  },
  contentExpensesButton: {
    backgroundColor: 'red',
  },
  
});

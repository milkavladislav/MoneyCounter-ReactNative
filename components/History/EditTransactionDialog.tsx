import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  Button,
  TextInput,
  IconButton,
  Portal,
  Dialog,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { AvailableIcons, IAccount, ICategory, ITransaction, TransactionType } from "../../types";
import { FlatGrid } from "react-native-super-grid";
import { addTransaction } from "../../storeFunctions/transactions";
import { deleteCategory } from "../../storeFunctions/categories";


interface IEditDialog {
    closeDialog: () => void;
    oldTransaction: ITransaction;
    visible: boolean;
    editTransaction: (newTransactionComment: string, newTransactionAmount: number, newTransactionDate: Date) => void;
  }

export const EditTransactionDialog = ({closeDialog, oldTransaction, visible, editTransaction} :IEditDialog) => {
  const [date, setDate] = useState(new Date(oldTransaction.date));
  const [amount, setAmount] = useState(oldTransaction.amount.toString());
  const [comment, setComment] = useState(oldTransaction.comment);
  const [show, setShow] = useState(false);
  

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title children="New category" />
        <Dialog.Content>
          <Text style={styles.optionsTitle}>Comment</Text>
          <TextInput
            autoComplete
            keyboardType="default"
            value={comment}
            mode="outlined"
            onChangeText={(text) => setComment(text)}
          />
          <Text style={styles.optionsTitle}>Amount</Text>
          <TextInput
            autoComplete
            keyboardType="numeric"
            value={amount}
            mode="outlined"
            right={<TextInput.Affix text="$" />}
            onChangeText={(text) => {
              isNaN(+text)
                ? alert("Enter valid number")
                : setAmount(text);
            }}
          />
          <Button onPress={showMode} children={date.toDateString()}/>
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

        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              editTransaction(comment, +amount, date)
              closeDialog();
            }}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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

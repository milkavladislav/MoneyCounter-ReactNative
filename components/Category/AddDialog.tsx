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
import { AvailableIcons, IAccount, ICategory, TransactionType } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { FlatGrid } from "react-native-super-grid";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTransaction } from "../../storeFunctions/transactions";
import { deleteCategory } from "../../storeFunctions/categries";


interface IAddDialog {
    closeDialog: () => void;
    visible: boolean;
    addCategory: (category: ICategory) => Promise<void>;
  }

export const AddDialog = ({closeDialog, visible, addCategory} :IAddDialog) => {
  const [type, setType] = useState(TransactionType.Income);
  const [icon, setIcon] = useState(AvailableIcons[0].iconName);
  const [name, setName] = useState("");

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title children="New category" />
        <Dialog.Content>
          <Text style={styles.optionsTitle}>Name</Text>
          <TextInput
            autoComplete
            keyboardType="default"
            value={name}
            mode="outlined"
            onChangeText={(text) => setName(text)}
          />
          <Text style={styles.optionsTitle}>Type</Text>
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
          <Text style={styles.optionsTitle}>Icon</Text>
<FlatGrid
              nestedScrollEnabled
              itemDimension={50}
              data={AvailableIcons}
              fixed
              scrollEnabled
              spacing={10}
              renderItem={({item}) => (
                <IconButton
                key={item.iconName}
                icon={item.iconName}
                color="black"
                onPress={() => setIcon(item.iconName)}
                size={30}
                style={{ backgroundColor: icon === item.iconName ? "#db36a4" : "#FBFF64" }}
              />
              )}
            />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              addCategory({name, type, icon, amount: 0})
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

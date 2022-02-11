import {StyleSheet, Text} from "react-native";
import {
  Button,
  TextInput,
  Portal,
  Dialog as D,
} from "react-native-paper";
import { useState } from "react";
import { IAccount } from "../../types";

interface IDialog {
    closeDialog: () => void;
    visible: boolean;
    func: (name: string, oldAccountId?: number) => Promise<void>;
    oldAccount?: IAccount
  }

export const AccountDialog = ({closeDialog, visible, func, oldAccount} :IDialog) => {
  const [name, setName] = useState(oldAccount?.name || "");

  return (
    <Portal>
      <D visible={visible} onDismiss={closeDialog}>
        <D.Title children={oldAccount ? "New account" : "Edit account"}/>
        <D.Content>
          <Text style={styles.optionsTitle}>Name</Text>
          <TextInput
            autoComplete
            keyboardType="default"
            value={name}
            mode="outlined"
            onChangeText={(text) => setName(text)}
          />
        </D.Content>
        <D.Actions>
          <Button
            onPress={() => {
              func(name, oldAccount && oldAccount.id)
              closeDialog();
            }}
          >
            Save
          </Button>
        </D.Actions>
      </D>
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

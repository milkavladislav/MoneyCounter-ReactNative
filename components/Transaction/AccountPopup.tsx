import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Portal, RadioButton } from "react-native-paper";
import { useState } from "react";
import { IAccount } from "../../types";

interface IAccountPopup {
  changeAccount: (account: string) => void;
  accounts: IAccount[];
  currentAccount: IAccount;
  buttonStyle: string;
}

export const AccountPopup = ({
  changeAccount,
  accounts,
  currentAccount,
  buttonStyle,
}: IAccountPopup) => {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const [checkedAccount, setChecked] = useState(currentAccount?.name);

  const handleSelectClick = () => {
    changeAccount(checkedAccount);
    hideDialog();
  };

  return (
    <>
      <Button
        onPress={() => setVisible(true)}
        icon={"arrow-down-drop-circle"}
        contentStyle={
          buttonStyle === "big"
        ? styles.accountBigButton
        : styles.accountSmallButton}
        labelStyle={
          buttonStyle === "big"
            ? styles.accountBigButtonLabel
            : styles.accountSmallButtonLabel
        }
      >
        {currentAccount.name}: {currentAccount.amount}$
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Content style={styles.dialogContent}>
            {accounts.map(({ name }) => (
              <RadioButton.Item
                label={name}
                key={name}
                value={name}
                status={checkedAccount === name ? "checked" : "unchecked"}
                onPress={() => setChecked(name)}
              />
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleSelectClick}>Select</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  dialog: {
    justifyContent: "center",
    backgroundColor: "#6dd5ed",
    paddingTop: 50,
  },
  dialogContent: {
    justifyContent: "center",
    backgroundColor: "#2193b0",
    color: "black",
  },
  accountSmallButton: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  accountBigButton: {
    flexDirection: "row-reverse",
  },
  accountSmallButtonLabel: {
    fontSize: 14,
  },
  accountBigButtonLabel: {
    textAlign: "center",
    fontSize: 24,
  },
});

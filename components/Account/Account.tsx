import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import {
  addAccount,
  deleteAccount,
  getAllAccounts,
  updateAccount,
} from "../../storeFunctions/accounts";
import { DialogMode, IAccount, TransactionType } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { AccountDialog } from "./AccountDialog";
import { Reload } from "../ReloadButton";

export const Account = () => {
  const [accounts, setAccounts] = useState<IAccount[]>();
  const [type, setType] = useState(TransactionType.Income);

  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<DialogMode>(DialogMode.Add);
  const showDialog = (mode: DialogMode) => () => {
    setMode(mode);
    setVisible(true);
  };
  const closeDialog = () => setVisible(false);

  const dialogFunction = () => {
    return mode === DialogMode.Add
      ? async (name: string) => {
          await addAccount(name);
          getData();
          alert("Account added");
        }
      : async (name: string, oldAccountId?: number) => {
          oldAccountId && (await updateAccount(oldAccountId, name));
          getData();
          alert("Account updated");
        };
  };

  const getTotalAmount = () => {
    let amount = 0;
    accounts?.map((account) => {
      amount += account.amount;
    });
    return amount;
  };

  const getData = async () => {
    setAccounts(await getAllAccounts());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <LinearGradient colors={["#f7ff00", "#db36a4"]} style={styles.container}>
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
          <ScrollView
            style={styles.scrollView}
            nestedScrollEnabled
            scrollEnabled
          >
            <Text style={styles.header}>Total: {getTotalAmount()}$</Text>
            {accounts &&
              accounts.map((account) => (
                <Card
                  key={account.id}
                  elevation={1}
                  style={styles.categoryCard}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{account.name}</Text>
                      <Text style={styles.amount}>{account.amount}$</Text>
                    </View>
                    <View style={styles.cardButtons}>
                      <IconButton
                        icon={"pencil"}
                        color="black"
                        onPress={showDialog(DialogMode.Edit)}
                        size={20}
                        style={{ backgroundColor: "#fff59d" }}
                      />
                      <IconButton
                        icon={"delete"}
                        color="black"
                        onPress={async () => {
                          account.id && (await deleteAccount(account.id));
                          await getData();
                          alert("Account deleted");
                        }}
                        size={20}
                        style={{ backgroundColor: "#ff7043" }}
                      />
                    </View>
                  </View>
                </Card>
              ))}
            <View style={{ marginTop: 25, alignItems: "center" }}>
              <Button
                children="New account"
                style={styles.addButton}
                labelStyle={styles.addButtonLabel}
                color="green"
                mode={"contained"}
                onPress={showDialog(DialogMode.Add)}
                icon="plus-circle-outline"
              />
              <AccountDialog
                visible={visible}
                closeDialog={closeDialog}
                func={dialogFunction()}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
      <Reload getData={getData} />
    </>
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
  categoryCard: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#CFDAFF",
  },
  cardButtons: {
    marginLeft: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

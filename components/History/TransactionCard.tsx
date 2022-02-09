import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Card, Avatar, IconButton } from "react-native-paper";
import React, { useState } from "react";

import { IAccount, ICategory, ITransaction } from "../../types";
import {
  deleteTransaction,
  updateTransaction,
} from "../../storeFunctions/transactions";
import { EditTransactionDialog } from "./EditTransactionDialog";

interface ITransactionCard {
  transaction: ITransaction;
  category?: ICategory;
  account?: IAccount;
  updateData: () => void;
}

export const TransactionCard = ({
  transaction,
  category,
  account,
  updateData,
}: ITransactionCard) => {
  const [visible, setVisible] = useState(false);

  return (
    <Card key={transaction.id} elevation={1} style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        {category && (
          <>
            <Avatar.Icon icon={category.icon} size={30} />
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {category.name}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {transaction.amount}$
              </Text>
            </View>
          </>
        )}
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {new Date(transaction.date).toDateString()}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {account?.name}
        </Text>
      </View>
      <Text style={styles.optionsTitle}>{transaction.comment}</Text>
      <Card.Actions style={{ marginBottom: -15, justifyContent: "flex-end" }}>
        <IconButton
          icon={"pencil"}
          color="black"
          onPress={() => setVisible(true)}
          size={20}
          style={{ backgroundColor: "#fff59d" }}
        />
        <IconButton
          icon={"delete"}
          color="black"
          onPress={async () => {
            transaction.id && (await deleteTransaction(transaction.id));
            updateData();
            alert("Transaction deleted");
          }}
          size={20}
          style={{ backgroundColor: "#ff7043" }}
        />
        <EditTransactionDialog
          closeDialog={() => setVisible(false)}
          oldTransaction={transaction}
          visible={visible}
          editTransaction={(
            newTransactionComment,
            newTransactionAmount,
            newTransactionDate
          ) => {
            transaction.id &&
              (updateTransaction(
                transaction.id,
                newTransactionComment,
                newTransactionAmount,
                newTransactionDate
              ));
              updateData();
              alert("Category updated");
          }}
        />
      </Card.Actions>
    </Card>
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
    marginHorizontal: 10,
    fontSize: 14,
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
  scrollView: {
    paddingHorizontal: 15,
  },
  card: {
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ffa726",
  },
  cardButtons: {
    marginLeft: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardTitle: {
    paddingLeft: 0,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

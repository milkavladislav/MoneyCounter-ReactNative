import {  StyleSheet, Text } from "react-native";
import {
  Button,
  TextInput,
  IconButton,
  Portal,
  Dialog,
} from "react-native-paper";
import { useState } from "react";
import { AvailableIcons, IAccount, ICategory, TransactionType } from "../../types";
import { FlatGrid } from "react-native-super-grid";


interface IEditDialog {
    closeDialog: () => void;
    oldCategory: ICategory;
    visible: boolean;
    editCategory: (newCategoryName?: string, newCategoryIcon?: string) => Promise<void>;
  }

export const EditDialog = ({closeDialog, oldCategory, visible, editCategory} :IEditDialog) => {
  const [icon, setIcon] = useState(oldCategory.icon);
  const [name, setName] = useState(oldCategory.name);

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
              editCategory(name, icon)
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

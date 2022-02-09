import { Dimensions, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

interface IReload {
    getData: () => Promise<void>;
}

export const Reload = ({getData} : IReload) => {
  return (
    <FAB
    style={styles.fab}
    small
    icon="reload"
    onPress={getData}
  />
  );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 10,
        bottom: 10,
      },
});

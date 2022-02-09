import { Dimensions, StatusBar, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { getAllAccounts } from "../../storeFunctions/accounts";
import { PieChart } from "react-native-chart-kit";
import { ChartColors, IAccount, ICategory, TransactionType } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { getAllCategories } from "../../storeFunctions/categories";
import { Reload } from "../ReloadButton";

export const Statistic = () => {
  const [accounts, setAccounts] = useState<IAccount[]>();
  const [categories, setCategories] = useState<ICategory[]>();

  const getData = async () => {
    setAccounts(await getAllAccounts());
    setCategories(await getAllCategories());
  };

  useEffect(() => {
    getData();
  }, []);

  const getFormatData = (data: (IAccount | ICategory)[]) => {
    const formatData: {
      name: string;
      population: number;
      color: string;
      legendFontColor: string;
      legendFontSize: number;
    }[] = [];
    data.map((item, index) => {
      formatData.push({
        name: item.name,
        population: item.amount,
        color: ChartColors[index],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      });
    });
    return formatData;
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const config = {
    height: 200,
    width: Dimensions.get("screen").width,
    chartConfig: chartConfig,
    accessor: "population",
    backgroundColor: "transparent",
    paddingLeft: "0",
    center: [0, 0],
    absolute: true,
  };

  return (
    <>
      <LinearGradient colors={["#f7ff00", "#db36a4"]} style={styles.container}>
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
          <ScrollView
            style={styles.scrollView}
            nestedScrollEnabled
            scrollEnabled
          >
            <Text style={styles.header}>Statistic</Text>
            <Text style={styles.subHeader}>Accounts</Text>
            {accounts && (
              <PieChart data={getFormatData(accounts)} {...config} />
            )}
            <Text style={styles.subHeader}>Income categories</Text>
            {categories && (
              <PieChart
                data={getFormatData(
                  categories?.filter(
                    (category) => category.type === TransactionType.Income
                  )
                )}
                {...config}
              />
            )}
            <Text style={styles.subHeader}>Expenses categories</Text>
            {categories && (
              <PieChart
                data={getFormatData(
                  categories?.filter(
                    (category) => category.type === TransactionType.Expenses
                  )
                )}
                {...config}
              />
            )}
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
    marginTop: 30,
    textAlign: "center",
    fontSize: 30,
  },
  subHeader: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
});

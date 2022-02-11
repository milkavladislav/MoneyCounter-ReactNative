import {BottomNavigation, DefaultTheme,  Provider as PaperProvider} from "react-native-paper";
import { useState } from "react";
import { Transactions } from "./components/Transaction/Transactions";
import { History } from "./components/History/History";
import { Category } from "./components/Category/Category";
import { Account } from "./components/Account/Account";
import { Statistic } from "./components/Statistic/Statistic";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'yellow',
  },
};

export default () => {
  const [index, setIndex] = useState(2);
  const [routes] = useState([
    { key: 'statistic', title: 'Statistic', icon: 'chart-histogram', color: '#7b1fa2'},
    { key: 'category', title: 'Category', icon: 'vector-triangle', color: '#0288d1'},
    { key: 'transactions', title: 'Transactions', icon: 'wallet', color: '#388e3c' },
    { key: 'history', title: 'History', icon: 'history', color: '#fbc02d' },
    { key: 'account', title: 'Account', icon: 'account-outline', color: '#e94d1b' },
  ]);
    
    const renderScene = BottomNavigation.SceneMap({
      statistic: Statistic,
      category: Category,
      transactions: Transactions,
      history: History,
      account: Account,
    });


  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
      shifting
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      />
    </PaperProvider>
  );
}

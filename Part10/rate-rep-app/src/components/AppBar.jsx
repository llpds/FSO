import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';

import theme from '../theme';
import MyText from './MyText';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <Link style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <MyText isBold style={styles.tabText}>{children}</MyText>
      </View>
    </Link>
  );
}


const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView style={styles.scrollView} horizontal>
      <AppBarTab to="/">Repositories</AppBarTab>
      <AppBarTab to="/signin">Sign in</AppBarTab>
    </ScrollView>
  </View>;
};

export default AppBar;
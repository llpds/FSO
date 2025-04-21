import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import theme from '../theme';
import MyText from './MyText';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.navBackGround,
    width: '100%',
    height: 140,
    padding: 5,
    justifyContent: 'flex-end',
  },
  pressable: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: theme.fontSizes.appBar,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.white,
  },
  barScroll: {
    marginTop: 60,
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView style={styles.barScroll} horizontal>
      <Link to="/" style={styles.pressable}>
        <MyText style={styles.text} >Repositories</MyText>
      </Link>
      <Link to="/signin" style={styles.pressable}>
          <MyText style={styles.text}>Sign in</MyText>
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;
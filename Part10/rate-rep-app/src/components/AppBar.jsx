import { Pressable, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.navBackGround,
    width: '100%',
    height: 140,
    padding: 5,
    justifyContent: 'flex-end',
  },
  pressable: {
    height: 30,
    padding: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 30,
    fontWeight: theme.fontWeights.bold,
    color: 'white',
  },
  barScroll: {
    marginTop: 40,
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView style={styles.barScroll} horizontal>
      <Link
        to="/"
        style={styles.pressable}
      >
        <Text style={styles.text} >Repositories</Text>
      </Link>
      <Link 
        to="/signin"
        style={styles.pressable}
      >
        <Text style={styles.text} >Sign in</Text>
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;
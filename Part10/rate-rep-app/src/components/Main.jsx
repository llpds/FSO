import { Text, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList.jsx';
import AppBar from './AppBar.jsx';
import theme from '../theme'
import SignIn from './SignIn.jsx';

const styles = StyleSheet.create({
  mainComp: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  }
})

const Main = () => {
  return (
    <View style={styles.mainComp}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </View>
  )

};

export default Main;
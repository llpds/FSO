// import Text from './Text';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';

import theme from '../theme'

const styles = StyleSheet.create({
  form: {
    border: 'grey solid 2px',
    borderRadius: 5,
    padding: 20,
    margin: 10,
    fontSize: 24,
    fontWeight: theme.fontWeights.thin,
    color: 'grey',
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 5,
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: theme.fontWeights.bold,
    color: 'white',
  },
})

const initialValues = {
  username: '',
  password: '',
};

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View>
      <TextInput
        style = {styles.form}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style = {styles.form}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable
        style = {styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => console.log(values);

  return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;
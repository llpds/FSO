import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';

import MyText from './MyText';
import FormikTextInput from './FormikTextInput';

const baseForm = {
  borderRadius: theme.roundness,
  padding: 20,
  margin: 10,
  fontSize: 24,
  fontWeight: theme.fontWeights.thin,
  color: 'grey',
  borderWidth: 1,
  borderStyle: 'solid',
}

const styles = StyleSheet.create({
  form: {
    ...baseForm, 
    borderColor: 'grey',
  },
  formRed: {
    ...baseForm, 
    borderColor: theme.colors.error,
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
  errorMessage: {
    fontSize: 20,
    color: theme.colors.error,
    marginLeft: 10,
    marginBottom: 20,
  }
})

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <FormikTextInput
        // style = {formik.errors.username ? styles.formRed : styles.form}
        name="username"
        placeholder="Username"
      />
      {/* <TextInput
        style = {formik.errors.username ? styles.formRed : styles.form}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      /> */}
      {formik.touched.username && formik.errors.username && (
        <MyText style = {styles.errorMessage}>{formik.errors.username}</MyText>
      )}
      <TextInput
        style = {formik.errors.password ? styles.formRed : styles.form}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <MyText style = {styles.errorMessage}>{formik.errors.password}</MyText>
      )}
      <Pressable
        style = {styles.button}
        onPress={formik.handleSubmit}
      >
        <MyText style={styles.text}>Sign in</MyText>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => console.log(values);

  return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;
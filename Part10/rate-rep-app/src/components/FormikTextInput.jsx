import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import MyText from './MyText';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <MyText style={styles.errorText}>{meta.error}</MyText>}
    </>
  );
};
export default FormikTextInput;
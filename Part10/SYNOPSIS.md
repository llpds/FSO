# 10 React Native

## 10a - Intorduction to React Native
  
  - Initializing the application

      [Expo](https://docs.expo.io/versions/latest/)

      init:
      npx create-expo-app rate-repository-app --template expo-template-blank@sdk-50

      dependencies:
      npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/metro-runtime@~3.1.1

      development environtment:
        macOs: https://docs.expo.dev/workflow/ios-simulator/
        any: https://docs.expo.dev/workflow/android-studio-emulator/

      esLint:
        npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native

      .eslintrc.json

          {
            "plugins": ["react", "react-native"],
            "settings": {
              "react": {
                "version": "detect"
              }
            },
            "extends": ["eslint:recommended", "plugin:react/recommended"],
            "parser": "@babel/eslint-parser",
            "env": {
              "react-native/react-native": true
            },
            "rules": {
              "react/prop-types": "off",
              "react/react-in-jsx-scope": "off"
            }
          }
      
      then npx  @eslint/migrate-config .eslintrc.json 

      or npm init @eslint/config@latest


## 10b - React Native basics

  - Core components:
    - Text - textual children: strong, h1
    - View - basic block: div
    - TextInput - text field: input
    - Pressable - capture events: button

    note:
      - only Text has textual children
      - doesn't provide event handlers to any element. Event handlers (and props) a component accepts.
        Pressable provides props for listening: <Pressable onPress={() => ...} >
        [API docs](https://reactnative.dev/docs/components-and-apis)

  - Style:
      simple: 
          <Text style={{ color: 'blue', fontSize: 24, fontWeight: '700' }}> etc

          or

          const styles = StyleSheet.create({
            text: {
              color: 'blue',
              fontSize: 24,
              fontWeight: '700',
            },
          });
          ...
            <Text style={styles.text}>

      with props:

          const styles = StyleSheet.create({
            text: { color: 'grey', fontSize: 14 },
            blueText: {color: 'blue' },
            bigText: { fontSize: 24, fontWeight: '700' },
          });

          const FancyText = ({ isBlue, isBig, children }) => {
            const textStyles = [
              styles.text,
              isBlue && styles.blueText,
              isBig && styles.bigText,
            ];

            return <Text style={textStyles}>{children}</Text>;
          };

          <FancyText isBlue isBig>Text</FancyText>

  - Consistent user interface with theming

      theme.js
          const theme = {
            colors: { 
              textPrimary: '#24292e', textSecondary: '#586069', primary: #0366d6'
            },
            fontSizes: { body: 14, subheading: 16 },
            fonts: { main: 'System' },
            fontWeights: { normal: '400', bold: '700' },
          };
          
          export default theme;


      Text.jsx:

            import { Text as NativeText, StyleSheet } from 'react-native';

            import theme from '../theme';

            const styles = StyleSheet.create({
              text: {
                color: theme.colors.textPrimary,
                fontSize: theme.fontSizes.body,
                fontFamily: theme.fonts.main,
                fontWeight: theme.fontWeights.normal,
              },
              colorTextSecondary: {
                color: theme.colors.textSecondary,
              },
              colorPrimary: {
                color: theme.colors.primary,
              },
            });

            const Text = ({ color, style, ...props }) => {
              const textStyle = [
                styles.text,
                color === 'textSecondary' && styles.colorTextSecondary,
                color === 'primary' && styles.colorPrimary,
                style,
              ];

              return <NativeText style={textStyle} {...props} />;
            };

            export default Text;

      using:

            <Text color="primary"> text </Text>

  - Using flexbox for layout


            const styles = StyleSheet.create({
              flexContainer: {
                flexDirection: 'column',
                  //raw, column(default), raw-reverse, column-reverse
                justifyContent: 'center', 
                  // flex-start (default), flex-end, center,
                  // space-between, space-around, space-evenly
                alignItems: 'center'
                  // flex-start, flex-end, center,
                  // baseline, stretch (default)
              },
            });
            ...
            <View style={styles.flexContainer}> ...</View>

    link:
      flex grow:  https://css-tricks.com/almanac/properties/f/flex-grow/
      flexBox gap: https://reactnative.dev/blog/2023/01/12/version-071#simplifying-layouts-with-flexbox-gap
      flexBox: https://reactnative.dev/docs/flexbox

  - Routing

        npm install react-router-native

      
      App.js

          import { NativeRouter } from 'react-router-native';
          ...
            <NativeRouter>
              <Main />
            </NativeRouter>

      Main.js

          import { Route, Routes, Navigate } from 'react-router-native';
          ...
            <Routes>
              <Route path="/" element={<RepositoryList />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

  - Form state management

            import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
            import { useFormik } from 'formik';
            
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
                    placeholder="Username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                  />
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                  />
                  <Pressable onPress={formik.handleSubmit}>
                    <Text>Sign in</Text>
                  </Pressable>
                </View>
              );
            };
            
            const SignIn = () => {
              const onSubmit = values => console.log(values);;
            
              return <LoginForm onSubmit={onSubmit} />;
            };
            
  - Form validation
    formik provides: 
      - validation function: https://formik.org/docs/guides/validation#validates
      - vlidation schema: https://formik.org/docs/guides/validation#validationschema (yup)

          npm install yup


      import * as yup from 'yup';
      ...
      const validationSchema = yup.object().shape({
        username: yup
          .string()
          .required('Username is required'),
        password: yup
          .string()
          .required('Password is required'),
        });
        ...
            const formik = useFormik({
              initialValues,
              validationSchema,
              onSubmit,
            });
        ...
        {formik.touched.username && formik.errors.username && (
          <Text style = {styles.errorMessage}>{formik.errors.username}</Text>
        )}

  - Platform-specific code


            import { React } from 'react';
            import { Platform, Text, StyleSheet } from 'react-native';
            
            const styles = StyleSheet.create({
              text: {
                color: Platform.OS === 'android' ? 'green' : 'blue',
              },
            });
            
            const WhatIsMyPlatform = () => {
              return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
            };

      
          const styles = StyleSheet.create({
            text: {
              color: Platform.select({
                android: 'green',
                ios: 'blue',
                default: 'black',
              or
                ios: () => require('./MyIOSComponent'),
                android: () => require('./MyAndroidComponent'),
              }),
            },
          });


    define files like: Button.ios.jsx and Button.android.jsx 

        import Button from './Button';

        const PlatformSpecificButton = () => {
          return <Button />;
        };

## 10c - Communicating with server

  - HTTP requests
    [FetchApi](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  
    [XMLHttpRequestApi](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)  (axios as one of possibles)

    in part 10 is used FetchApi:
      
      fetch('https://my-api.com/post-end-point', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'firstValue',
          secondParam: 'secondValue',
        }),
      });

    [using fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
    example:
      
      const fetchMovies = async () => {
        const response = await fetch('https://reactnative.dev/movies.json');
        const json = await response.json();

        return json;
      };

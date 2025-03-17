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
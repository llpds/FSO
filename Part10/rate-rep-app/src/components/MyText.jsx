import { Text as NativeText, StyleSheet, Platform, View } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.auto,
    fontWeight: theme.fontWeights.normal,
    textAlign: 'left',
    marginBottom: 5,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  greyText: {
    color: theme.colors.grey,  
  },
  boldText: {
    fontWeight: theme.fontWeights.bold,
  },
  asButtonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius, 
    // it works in asButton style (see below) on Web and Android
    // for iOS it needs to be set in the parent component(here - asButtonContainer style)
    margin: 5,
    marginLeft: 0,
    alignSelf: 'flex-start',
  },
  asButton: {
    color: 'white',
    padding: 4,
    paddingHorizontal: 10,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const MyText = ({ isGrey, isBold, isAsButton, color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    isGrey && styles.greyText,
    isBold && styles.boldText,
    isAsButton && styles.asButton,
    style && style,
  ];

  return isAsButton 
      ? <View style={styles.asButtonContainer}>
          <NativeText style={textStyle} {...props} />
        </View>
      : <NativeText style={textStyle} {...props} />
};

export default MyText;
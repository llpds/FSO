import { Platform } from 'react-native';

const theme = {
  radius: 4,
  roundness: 3,
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
    error: '#d73a4a',
    divider: '#d1d5da',
    button: '#1e3a8b',
    componentBackGround: '#e1e4e8',
    tagsBackGround: '#0366d6',
    itemBackGround: 'white',
    navBackGround: '#333333',
    grey: 'grey',
    white: 'white',
  },
  fontSizes: {
    appBar: 24,
    body: 20,
    subheading: 16,
  },
  fonts: {
    auto: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    thin: '200',
    normal: '300',
    bold: '700', // bold start from, ios: 500, android: 700.
  },
};

export default theme;
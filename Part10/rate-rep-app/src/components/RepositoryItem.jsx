import { Image, View, Text, StyleSheet } from 'react-native';
import MyText from './MyText';
import theme from '../theme'

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.itemBackGround,
  },
  text: {
    fontSize: 30,
    padding: 5,
    margin: 0,
    marginLeft:10,
    fontWeight: theme.fontWeights.normal,
  },
  greyText: {
    color: 'grey',  
  },
  bigText: {
    fontWeight: theme.fontWeights.bold,
  },
  flexContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 5,
    margin: 10,
  },
  itemHead: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 20,
  },
  itemHeadText: {
    marginTop: 10,
  },
  asButton: {
    backgroundColor: theme.colors.primary,
    width: 'max-content',
    color: 'white',
    borderRadius: 5,
    padding: 7,
    paddingLeft: 5,
    paddingRight: 10,
    margin: 10,
    marginLeft: 22,
  },
  itemStat:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    // alignItems: 'stretch'
  },
  itemStatData:{}
});

const FancyText = ({ isGrey, isBig, isAsButton, children}) => {
  const textStyles = [
    styles.text,
    isGrey && styles.greyText,
    isBig && styles.bigText,
    isAsButton && styles.asButton
  ]

  return <Text style ={textStyles}>{children}</Text>
}

const RepositoryItem = ({item}) => (
  <View style={styles.item}>
    <View style={styles.itemHead}>
      <Image
        style={styles.tinyLogo}
        source={item.ownerAvatarUrl}
      />
      <View style={styles.itemHeadText}>
        <FancyText isBig> {item.fullName}</FancyText>
        <FancyText isGrey> {item.description}</FancyText>
        <FancyText isAsButton> {item.language}</FancyText>
      </View>
    </View>
    <View style={styles.itemStat}>
      <View style={styles.itemStatData}>
        <FancyText isBig> {item.stargazersCount >= 1000 ? `${(item.stargazersCount/1000).toFixed(1)}k` : item.stargazersCount}</FancyText>
        <FancyText isGrey>Stars</FancyText>
      </View>
      <View style={styles.itemStatData}>
        <FancyText isBig> {item.forksCount >= 1000 ? `${(item.forksCount/1000).toFixed(1)}k` : item.forksCount}</FancyText>
        <FancyText isGrey>Forks</FancyText>
      </View>
      <View style={styles.itemStatData}>
        <FancyText isBig> {item.reviewCount}</FancyText>
        <FancyText isGrey>Reviews</FancyText>
      </View>
      <View style={styles.itemStatData}>
        <FancyText isBig> {item.ratingAverage}</FancyText>
        <FancyText isGrey>Rating</FancyText>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
import { Image, View, StyleSheet } from 'react-native';
import MyText from './MyText';
import theme from '../theme'

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.itemBackGround,
  },
  flexContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: theme.radius,
    margin: 10,
  },
  itemHead: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 20,

  },
  itemHeadText: {
    width: '75%',
    marginTop: 10,
    marginLeft: 10,
  },
  itemStat:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    marginHorizontal: 15,
  },
  itemStatData:{
    marginHorizontal:5,
  }
});
 const countFormat = count => count >= 1000 
  ? `${(count/1000).toFixed(1)}k`
  : count

const RepositoryItem = ({item}) => (
  <View style={styles.item}>
    <View style={styles.itemHead}>
      <Image
        style={styles.tinyLogo}
        source={{uri: item.ownerAvatarUrl}}
      />
      <View style={styles.itemHeadText}>
        <MyText isBold>{item.fullName}</MyText>
        <MyText isGrey>{item.description}</MyText>
        <MyText isAsButton>{item.language}</MyText>
      </View>
    </View>
    <View style={styles.itemStat}>
      <View style={styles.itemStatData}>
        <MyText isBold>{countFormat(item.stargazersCount)}</MyText>
        <MyText isGrey>Stars</MyText>
      </View>
      <View style={styles.itemStatData}>
        <MyText isBold>{countFormat(item.forksCount)}</MyText>
        <MyText isGrey>Forks</MyText>
      </View>
      <View style={styles.itemStatData}>
        <MyText isBold>{item.reviewCount}</MyText>
        <MyText isGrey>Reviews</MyText>
      </View>
      <View style={styles.itemStatData}>
        <MyText isBold>{item.ratingAverage}</MyText>
        <MyText isGrey>Rating</MyText>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
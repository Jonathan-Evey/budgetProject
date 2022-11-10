import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import EachMonthsExpenses from './EachMonthsExpenses';
import DropDownMenuIcon from '../../utility/DropDownMenuIcon';

const EachYearsExpenses = ({data, userData}) => {
  const [isShowMonths, setIsShowMonths] = useState(false);
  const toggleMonthsShown = useRef(new Animated.Value(0)).current;

  const toggleMonths = () => {
    Animated.timing(toggleMonthsShown, {
      toValue: isShowMonths ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    toggleMonths();
  }, [isShowMonths]);

  useEffect(() => {
    if (data.year === new Date().getFullYear().toString()) {
      setIsShowMonths(true);
    }
  }, []);

  return (
    <View style={[styles.card, {overflow: 'hidden'}]}>
      <TouchableOpacity
        style={styles.yearHedder}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsShowMonths(!isShowMonths);
        }}>
        <Text style={styles.title}>{data.year}</Text>
        <DropDownMenuIcon bgColor={'#4e5b75'} isDropDownOpen={isShowMonths} />
      </TouchableOpacity>
      {isShowMonths && (
        <Animated.View
          style={{
            zIndex: 0,
          }}>
          <FlatList
            data={data.months}
            renderItem={({item}) => (
              <EachMonthsExpenses
                data={item}
                userData={userData}
                year={data.year}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default EachYearsExpenses;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginRight: '5%',
    marginLeft: '5%',
    backgroundColor: '#bbc1be',
    borderRadius: 25,
    borderColor: '#223252',
    borderWidth: 3,
    shadowColor: 'black',
    elevation: 10,
    marginBottom: 20,
  },
  yearHedder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#384763',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 5,
    color: '#223252',
  },
});

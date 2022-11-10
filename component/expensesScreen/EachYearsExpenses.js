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
    marginBottom: 15,
  },
  yearHedder: {
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#384763',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#223252',
  },
});

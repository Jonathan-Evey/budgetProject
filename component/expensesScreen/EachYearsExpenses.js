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

  return (
    <View style={{overflow: 'hidden'}}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsShowMonths(!isShowMonths);
        }}>
        <Text>{data.year}</Text>
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

const styles = StyleSheet.create({});

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../assets/styles';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.black,
    padding: 20,
  },
  selectedWrapper: {
    backgroundColor: COLORS.white,
  },
  label: {
    fontSize: 18,
    color: COLORS.white,
    padding: 20,
  },
  selectedLabel: {
    color: COLORS.black,
  },
});

const DropdownItem = ({item, selected}) => {
  return (
    <View style={(styles.wrapper, selected ? styles.selectedWrapper : null)}>
      <Text style={[styles.label, selected ? styles.selectedLabel : null]}>
        {item.label}
      </Text>
    </View>
  );
};

export default DropdownItem;

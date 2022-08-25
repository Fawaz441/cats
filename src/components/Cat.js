import React from 'react';
import {TouchableWithoutFeedback, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
  },
});

const Cat = ({image}) => {
  return (
    <TouchableWithoutFeedback>
      <Image source={{uri: image}} resizeMode="cover" style={styles.image} />
    </TouchableWithoutFeedback>
  );
};

export default Cat;

import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Lightbox from 'react-native-lightbox-v2';

const defaultImage = require('../assets/images/cats.png');

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
});

const Cat = ({image}) => {
  return (
    <Lightbox>
      <Image
        source={{uri: image}}
        resizeMode="cover"
        style={styles.image}
        defaultSource={defaultImage}
      />
    </Lightbox>
  );
};

export default Cat;

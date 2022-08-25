import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Lightbox from 'react-native-lightbox-v2';

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  wrapper: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});

const Cat = ({image}) => {
  return (
    <Lightbox>
      <View style={[styles.image, styles.wrapper]}>
        <Image source={{uri: image}} resizeMode="cover" style={styles.image} />
      </View>
    </Lightbox>
  );
};

export default Cat;

import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {getAllCats} from './src/api/catAxios';
import {COLORS} from './src/assets/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  // const [cats, setCats] = useState([]);

  const getCats = async () => {
    try {
      const data = await getAllCats();
      setLoading(false);
      console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <View style={styles.wrapper}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={COLORS.white} size={40} />
        </View>
      ) : null}
    </View>
  );
};

export default App;

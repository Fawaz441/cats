import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {getAllCats, getBreeds} from './src/api/catAxios';
import {COLORS} from './src/assets/styles';
import Cat from './src/components/Cat';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingBottom: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMore: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    width: '100%',
  },
  dropdownContainer: {
    backgroundColor: COLORS.black,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 5,
  },
  dropdown: {
    width: 0.8 * width,
  },
  inputSearchStyle: {
    color: COLORS.black,
  },
  selectedTextStyle: {
    color: COLORS.white,
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState([]);
  const [initialFetchDone, setinitialFetchDone] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const breedTypes = breeds.map(breed => ({
    label: breed.name,
    value: breed.id,
  }));

  const getCats = async () => {
    if (loadingMore || !hasMore) return;
    try {
      if (initialFetchDone) {
        setLoadingMore(true);
      }
      const {data} = await getAllCats(page);
      if (initialFetchDone) {
        setLoadingMore(false);
        setCats([...cats, ...data]);
        setPage(page => page + 1);
        setHasMore(data.length > 0);
      } else {
        setLoading(false);
        setCats(data);
        setinitialFetchDone(true);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setLoadingMore(false);
      Alert.alert(
        'Meow!',
        'There was an error while trying to load some cat images',
        [
          {text: 'Retry', onPress: getCats},
          {text: 'Close', onPress: () => {}},
        ],
      );
    }
  };

  const getCatBreeds = async () => {
    try {
      const {data} = await getBreeds();
      setBreeds(data);
    } catch (e) {
      console.log(e);
      Alert.alert('Meow!', 'There was an error while fetching the breeds', [
        {text: 'Try again', onPress: getCatBreeds},
        {text: 'Close', onPress: () => {}},
      ]);
    }
  };

  useEffect(() => {
    getCatBreeds();
    getCats();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.wrapper} edges={['left', 'right', 'top']}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.white} size={100} />
          </View>
        ) : (
          <View>
            <View style={styles.dropdownContainerWrapper}>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  data={breedTypes}
                  style={styles.dropdown}
                  inputSearchStyle={styles.inputSearchStyle}
                  search
                  labelField="label"
                  valueField="value"
                  value={selectedBreed}
                  selectedTextStyle={styles.selectedTextStyle}
                  onChange={item => {
                    setSelectedBreed(item.value);
                  }}
                />
              </View>
            </View>
            <FlatList
              data={cats}
              keyExtractor={cat => cat.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <Cat image={item.url} />}
              onEndReached={getCats}
              ListFooterComponent={() => (
                <View style={styles.loadingMore}>
                  {loadingMore && (
                    <ActivityIndicator color={COLORS.white} size={30} />
                  )}
                </View>
              )}
            />
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

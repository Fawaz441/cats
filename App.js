import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {getAllCats} from './src/api/catAxios';
import {COLORS} from './src/assets/styles';
import Cat from './src/components/Cat';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    // padding: 15,
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
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState([]);
  const [initialFetchDone, setinitialFetchDone] = useState(false);

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
        'Error',
        'There was an error while trying to load some images',
        [
          {text: 'Retry', onPress: getCats},
          {text: 'Close', onPress: () => {}},
        ],
      );
    }
  };

  useEffect(() => {
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
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

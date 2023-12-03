import React from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProductItem from './components/ProductItem';
import Filter from './components/Filter';
import SearchBar from './components/SearchBar';

const ProductListView = ({
  displayedProducts,
  allProducts,
  onEndReached,
  isLoading,
  hasMoretoLoad,
  onSearchTextInput,
  onFilterSelection,
  setSelectedFilterOption,
  selectedFilterOption,
  searchInput,
  setSearchInput,
}) => {
  const insets = useSafeAreaInsets();

  const renderItem = ({item}) => {
    return <ProductItem productList={displayedProducts} product={item} />;
  };

  const renderFooter = () => {
    return (
      //Footer View with Loader
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top / 4,
        paddingBottom: insets.bottom,
        marginHorizontal: 16,
      }}>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearchTextInput={value => onSearchTextInput(value)}
      />
      <Filter
        onFilterSelection={key => onFilterSelection(key)}
        allProducts={allProducts}
        setSelectedFilterOption={setSelectedFilterOption}
        selectedFilterOption={selectedFilterOption}
      />
      <FlatList
        numColumns={2}
        data={displayedProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
        }}
        onEndReached={hasMoretoLoad ? onEndReached : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ProductListView;

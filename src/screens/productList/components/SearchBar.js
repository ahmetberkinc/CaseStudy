import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Constants from '../../../../constants';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SearchBar = ({searchInput, setSearchInput}) => {
  return (
    <View style={styles.containerSearch}>
      <EvilIcons name={'search'} size={30} />
      <TextInput
        style={styles.input}
        autoCapitalize={'none'}
        onChangeText={value => {
          setSearchInput(value);
        }}
        value={searchInput}
        placeholder="Search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constants.GRAY,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Constants.GRAY,
    backgroundColor: Constants.GRAY,
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
});

export default SearchBar;

import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Constants from '../../../../constants';

const SearchBar = ({searchInput, setSearchInput}) => {
  return (
    <TextInput
      style={styles.input}
      autoCapitalize={'none'}
      onChangeText={value => {
        setSearchInput(value);
      }}
      value={searchInput}
      placeholder="Search"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Constants.WHITE,
    backgroundColor: Constants.WHITE,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginTop: 6,
    marginBottom: 6,
  },
});

export default SearchBar;

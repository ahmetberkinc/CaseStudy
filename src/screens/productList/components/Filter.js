import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import Constants from '../../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';

const Filter = ({
  allProducts,
  setSelectedFilterOption,
  selectedFilterOption,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);

  const [brandInput, setBrandInput] = useState('');
  const [modelInput, setModelInput] = useState('');

  function getBrandList() {
    setBrandList([...new Set(allProducts?.map(product => product.brand))]);
  }

  function getModelList() {
    setModelList([...new Set(allProducts?.map(product => product.model))]);
  }

  useEffect(() => {
    if (brandInput.length === 0) {
      setBrandList([...new Set(allProducts?.map(product => product.brand))]);
    } else {
      setBrandList([
        ...new Set(
          allProducts
            .filter(product => {
              return product?.brand
                .toLowerCase()
                .includes(brandInput.toLowerCase());
            })
            .map(product => product.brand),
        ),
      ]);
    }
  }, [brandInput]);

  useEffect(() => {
    if (modelInput.length === 0) {
      setBrandList([...new Set(allProducts?.map(product => product.model))]);
    } else {
      setBrandList([
        ...new Set(
          allProducts
            .filter(product => {
              return product?.model
                .toLowerCase()
                .includes(modelInput.toLowerCase());
            })
            ?.map(product => product.model),
        ),
      ]);
    }
  }, [modelInput]);

  const sortOptions = [
    {
      name: 'Old to new',
      id: 1,
      type: 'createdAt',
      order: 'asc',
    },
    {
      name: 'New to old',
      id: 2,
      type: 'createdAt',
      order: 'desc',
    },
    {
      name: 'Price high to low',
      id: 3,
      type: 'price',
      order: 'asc',
    },
    {
      name: 'Price low to high',
      id: 4,
      type: 'price',
      order: 'desc',
    },
  ];

  function renderSortOptions() {
    return sortOptions?.map(sortOption => {
      return (
        <TouchableOpacity
          onPress={() => {
            {
              setSelectedFilterOption(selectedFilterOption => ({
                ...selectedFilterOption,
                sort: sortOption,
              })),
                setModalVisible(false);
            }
          }}
          style={styles.containerFilterOption}
          key={sortOption.id}>
          <Ionicons
            name={
              selectedFilterOption?.sort?.id === sortOption?.id
                ? 'radio-button-on'
                : 'radio-button-off'
            }
            size={30}
            color={Constants.BLUE}
          />
          <Text style={styles.filterOption}>{sortOption.name}</Text>
        </TouchableOpacity>
      );
    });
  }

  function renderBrandOptions() {
    return brandList?.map((brandOption, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            {
              setSelectedFilterOption(selectedFilterOption => ({
                ...selectedFilterOption,
                brand: brandOption,
              })),
                setModalVisible(false);
            }
          }}
          key={index}
          style={styles.containerFilterOption}>
          <Ionicons
            name={
              selectedFilterOption.brand === brandOption
                ? 'radio-button-on'
                : 'radio-button-off'
            }
            size={30}
            color={Constants.BLUE}
          />
          <Text style={styles.filterOption}>{brandOption}</Text>
        </TouchableOpacity>
      );
    });
  }

  function renderModelOptions() {
    return modelList?.map((modelOption, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            {
              setSelectedFilterOption(selectedFilterOption => ({
                ...selectedFilterOption,
                model: modelOption,
              })),
                setModalVisible(false);
            }
          }}
          key={index}
          style={styles.containerFilterOption}>
          <Ionicons
            name={
              selectedFilterOption.model === modelOption
                ? 'radio-button-on'
                : 'radio-button-off'
            }
            size={30}
            color={Constants.BLUE}
          />
          <Text style={styles.filterOption}>{modelOption}</Text>
        </TouchableOpacity>
      );
    });
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={styles.filtersText}>Filters:</Text>
      <TouchableOpacity
        onPress={() => {
          getBrandList(), getModelList(), setModalVisible(true);
        }}
        style={styles.filterContainer}>
        <Text style={styles.selectFilterText}>Select Filter</Text>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              setModalVisible(false);
            }}>
            <TouchableOpacity activeOpacity={1} style={styles.modalView}>
              <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Filter</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}>
                  <AntDesign name={'close'} size={32} color={Constants.BLACK} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false),
                      setSelectedFilterOption({
                        sort: 'Default',
                        brand: 'All',
                        model: 'All',
                      });
                  }}
                  style={styles.clearTextContainer}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.filterTitle}>Sort By</Text>
                {renderSortOptions()}
                <View style={styles.separatingLine} />
                <Text style={styles.filterTitle}>Brand</Text>
                <SearchBar
                  searchInput={brandInput}
                  setSearchInput={setBrandInput}
                />
                <ScrollView style={{height: 140}}>
                  {renderBrandOptions()}
                </ScrollView>
                <View style={styles.separatingLine} />
                <Text style={styles.filterTitle}>Model</Text>
                <SearchBar
                  searchInput={modelInput}
                  setSearchInput={setModelInput}
                />
                <ScrollView style={{height: 140}}>
                  {renderModelOptions()}
                </ScrollView>
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: Constants.GRAY,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 14,
    width: 158,
  },
  filtersText: {
    fontSize: 18,
    color: Constants.BLACK,
    fontWeight: '500',
    flex: 1,
  },
  selectFilterText: {fontSize: 14, color: Constants.BLACK},
  modalView: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    flex: 1,
    height: Constants.SCREEN_HEIGHT,
  },
  closeButton: {position: 'absolute', left: 0},
  titleContainer: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: Constants.LIGHT_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Constants.BLACK,
    textAlign: 'center',
  },
  brandItemContainer: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 8,
  },
  brandItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearTextContainer: {
    position: 'absolute',
    right: 10,
  },
  clearText: {
    fontSize: 18,
    color: Constants.ORANGE,
    fontWeight: '600',
  },
  containerFilterOption: {flexDirection: 'row', alignItems: 'center'},
  filterTitle: {fontSize: 14, marginVertical: 8},
  filterOption: {fontSize: 16, color: Constants.BLACK, marginVertical: 12},
  separatingLine: {
    borderWidth: 0.5,
    borderColor: 'grey',
    marginTop: 16,
  },
});

export default Filter;

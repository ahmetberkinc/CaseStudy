import React, {useState} from 'react';
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

const Filter = ({
  allProducts,
  onFilterSelection,
  setSelectedFilterOption,
  selectedFilterOption,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [brandList, setBrandList] = useState([]);

  function getBrandList() {
    setBrandList([...new Set(allProducts.map(product => product.brand))]);
  }

  function renderBrandList() {
    return brandList.map((brand, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setModalVisible(false),
              setSelectedFilterOption(brand),
              onFilterSelection(brand);
          }}
          style={styles.brandItemContainer}>
          <Text
            style={[
              styles.brandItemText,
              {
                color:
                  selectedFilterOption === brand
                    ? Constants.BLUE
                    : Constants.BLACK,
              },
            ]}>
            {brand}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={styles.filtersText}>Filters:</Text>
      <TouchableOpacity
        onPress={() => {
          getBrandList(), setModalVisible(true);
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
                <Text style={styles.modalTitle}>Filter By</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false),
                      setSelectedFilterOption('ALL'),
                      onFilterSelection('ALL');
                  }}
                  style={styles.clearTextContainer}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}>
                  <AntDesign name={'close'} size={30} />
                </TouchableOpacity>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{height: 250}}>
                {renderBrandList()}
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
    marginRight: 17,
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: Constants.SCREEN_WIDTH,
  },
  closeButton: {position: 'absolute', right: 10},
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
    left: 10,
  },
  clearText: {
    fontSize: 18,
    color: Constants.ORANGE,
    fontWeight: '600',
  },
});

export default Filter;

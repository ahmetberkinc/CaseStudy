import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from '../../constants';

const HeaderLeftAction = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{padding: 8}} onPress={() => navigation.goBack()}>
      <AntDesign name={'arrowleft'} size={30} color={Constants.WHITE} />
    </TouchableOpacity>
  );
};

export default HeaderLeftAction;

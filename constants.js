import {Dimensions} from 'react-native';

class Constants {
  static SCREEN_WIDTH = Dimensions.get('window').width;
  static SCREEN_HEIGHT = Dimensions.get('window').height;

  static BASE_URL = 'https://5fc9346b2af77700165ae514.mockapi.io/products?';

  static WHITE = '#FFFFFF';
  static BLACK = '#000000';
  static ORANGE = '#FFB800';
  static BLUE = '#2A59FE';
  static GRAY = '#D9D9D9';
}

export default Constants;

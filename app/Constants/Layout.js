import { Dimensions,Platform } from 'react-native';
let safePadding=Platform.OS === 'ios' ? ((height>810)?35:20) : 0
let {width,height} = Dimensions.get('window');
export default {
  width:width,
  height:height,
  isSmallDevice: width < 375,
  safePadding:safePadding,
  contentHeight:height-74-safePadding
};

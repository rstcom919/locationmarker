import Colors from './Colors';

const imageStyle = {
  height: 125,
  width: 125
};

export const LoadSlide = (translate) => [
  {
    key: 'exchange-slide',
    title: translate('appIntro.exchange_slide_title'),
    text: translate('appIntro.exchange_slide_text'),
    image: require('../../Assets/Images/deszone-finance/finance-free-vector-icon-set-04-light.png'),
    backgroundColor: Colors.appTheme.primary,
    imageStyle
  },
  {
    key: 'send-and-receive-slide',
    title: translate('appIntro.send_and_receive_slide_title'),
    text: translate('appIntro.send_and_receive_slide_text'),
    image: require('../../Assets/Images/deszone-money/money-vector-free-icon-set-15-light.png'),
    backgroundColor: Colors.appTheme.primary,
    imageStyle
  },
  {
    key: 'track-slide',
    title: translate('appIntro.track_slide_slide_title'),
    text: translate('appIntro.track_slide_slide_text'),
    image: require('../../Assets/Images/deszone-finance/finance-free-vector-icon-set-16-light.png'),
    backgroundColor: Colors.appTheme.primary,
    imageStyle
  }
]

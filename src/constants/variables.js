import { Dimensions, Platform, StatusBar } from 'react-native';
import { ifIphoneX, getStatusBarHeight } from '../utils/isIphoneX';


export const isIos = Platform.OS === 'ios';

export const colors = {
    blue: '#74D7F5',
    grey: '#787878',
    textDes: '#6c6c6c',
    borderGrey: '#E3E3E3',
    buttonGrey: '#343434',
    textGrey: '#9B9B9B',
    insideGrey: 'rgba(122, 133, 166, 0.05)',
    darkBlue: '#0A54B4',
    tabBarColor: '#2d2c2c',
    mainColor: '#FDBB3F',
    darkGrey: '#727272',
    info: '#007bff',
    
    lightGrey: '#a2a2a2',
    textLight: '#3d3b3b',
    textDark: '#212322',
    textHead: '#808080',
    orange: '#f89d30',
    gold: '#ffcc00',
    yellow: '#ffea00',
    burgundy: '#800020',
    headerGrey: '#a6a4a4',
}

export const fonts = {
    nunitoBlack: "Nunito-Black",
    nunitoBlackItalic: "Nunito-BlackItalic",
    nunitoBold: "Nunito-Bold",
    nunitoBoldItalic: "Nunito-BoldItalic",
    nunitoExtraBold: "Nunito-ExtraBold",
    nunitoSemiBold: "Nunito-SemiBold",
    nunitoExtraBold: "Nunito-ExtraBold",
    nunitoRegular: "Nunito-Regular",
    nunitoLight: "Nunito-Light",
    nunitoExtraLight: "Nunito-ExtraLight",
    exoSemiBold: "Exo2-SemiBold",
}

export const dimensions = {
    bottomTabHeight : 80,
    // bottomButtonHeight: 70,
    ...ifIphoneX({
        bottomButtonHeight: 70
    }, {
        bottomButtonHeight: 50
    }),
    statusBar: getStatusBar(),
    topExtraSpace: 6,
    topSpace: (this.statusBar + 6),
}

export const staticTxt = {
    appName: 'AIR WALLET',
}

export const deviceDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

function getStatusBar(){
   return statusBar = !isIos ? StatusBar.currentHeight : getStatusBarHeight();
}
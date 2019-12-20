import { isIOS } from '../Utils/Helpers'


const SERVER_PORT = "3000";
const SERVER_IP = "188.166.157.72";

export const API_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const WEIGHT_TYPES = {
    ULIGHT: '100',
    THIN: '200',
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    THICK: '600',
    BOLD: '700',
    BLACK: '900'
};

export const Spacings = {
    s1: isIOS ? 3 : 4,
    s2: isIOS ? 6 : 8,
    s3: isIOS ? 9 : 12,
    s4: isIOS ? 12 : 16,
    s5: isIOS ? 15 : 20,
    s6: isIOS ? 18 : 24,
    s7: isIOS ? 21 : 28,
    s8: isIOS ? 24 : 32,
    s9: isIOS ? 27 : 36,
    s10: isIOS ? 30 : 40,
}


//Inactivity delay
export const INACTIVITY_DELAY = 7000 // (1000*60)*7

export const paginationAttributes = {
  next:null,
  prev:null,
  self:null,
};

export default {
    // Google Analytics - uses a 'dev' account while we're testing
    // gaTrackingId: (devMode) ? "UA-84284256-2" : "UA-84284256-1",

    // API URL
    API_URL,
    WEIGHT_TYPES,
    Spacings,
    SERVER_PORT,
    SERVER_IP,
};

import { StyleSheet, Dimensions, Platform } from "react-native";
import Color from "./Color";
let { width, height } = Dimensions.get('window')
export default {
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white'
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: "center",
  },
  mainContainer: {
    padding: 0,
    backgroundColor: "white",
    flex: 1
  },
  dropShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 10,
  },
  headerstyle: {
    backgroundColor: Color.PRIMARY_COLOR,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerLeftIcon: {
    color: Color.MENU_ICON_COLOR,
    paddingLeft: 15,
    paddingRight: 10,
    position: 'absolute',
    zIndex: 400,
    size:20
  },
  headerRight: {
    right: 15,
    paddingLeft: 10,
    position: 'absolute',
    zIndex: 400,
  },
  headerRightIcon: {
    right: 15,
    paddingLeft: 10,
    position: 'absolute',
    zIndex: 400,
    color: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.MENU_ICON_COLOR,
  },
  titleBlack: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  commonText: {
    fontSize: 12,
    color: "black",
  },
  priceText: {
    color: Color.PRIMARY_COLOR,
  },
  detailCard: {
    padding: 10,
    backgroundColor: "white",
    margin: 12,
    borderRadius: 7,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 7,
    shadowOpacity: 0.2
  },
  descriptionText: {
    color: "red",
    fontFamily: "Roboto",
    fontSize: 14,
    margin: 10
  },
  logo: {
    marginTop: 200,
    height: 100,
    width: 300,
    resizeMode: 'contain'
  },
  sidebarLogo: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
    borderRadius: 10
  },
  homeLogo: {
    height: 150,
    width: 150
  },
}


import { ActionTypes } from "../ActionTypes";
import {Alert} from "react-native"
// import NavigationService from "../../navigation/NavigationService.js";
import  {Endpoint}  from "../../Constants/Api";
import axios from 'axios';
export const adsDataCall_X = (token, amount, phone) => {
    return new Promise((resolve, reject) => {
        return axios.get(`${Endpoint}getAds`, {
     })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response);
            })
    })
};
export const adsDataCall = () => {	
	return dispatch => {
		dispatch({ type:ActionTypes.ADS_DATA_CONNECT_STATRT });		
		const url=Endpoint+"getAds";
        fetch(url, {
            method: "GET",
            headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				dataType: 'json',
				'X-Requested-With': 'XMLHttpRequest',
			},
           })
        .then((response) => response.json())
        .then((responseJson) => {  
              
            if(responseJson.state !=="1"){
				AlertMessage("Item does not exist in the database")
                itemLookUpDataCallFail(dispatch,responseJson.message,data)
            }else{
			//	AlertMessage(responseJson.message)
			    itemLookUpDataCallSuccess(dispatch,responseJson.data)  
            }                    
           
        })
        .catch((error) => {         
		//	itemLookUpDataCallFail(dispatch,"Intertnet Connection Error!",data)
			AlertMessage("Intertnet Connection Error!")
         });
	};
};
export const categoryDataCall = () => {	
	return dispatch => {
		dispatch({ type:ActionTypes.ADS_DATA_CONNECT_STATRT });		
		const url=Endpoint+"getCategory";
        fetch(url, {
            method: "GET",
            headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				dataType: 'json',
				'X-Requested-With': 'XMLHttpRequest',
			},
           })
        .then((response) => response.json())
        .then((responseJson) => {  
              
            if(responseJson.state !=="1"){
				AlertMessage("Item does not exist in the database")
                itemLookUpDataCallFail(dispatch,responseJson.message,data)
            }else{
			//	AlertMessage(responseJson.message)
			    categoryDataCallSuccess(dispatch,responseJson.data)  
            }                    
           
        })
        .catch((error) => {         
		//	itemLookUpDataCallFail(dispatch,"Intertnet Connection Error!",data)
			AlertMessage("Intertnet Connection Error!")
         });
	};
};


export const initialDataCall = () => {	
	return dispatch => {
		dispatch({ type:ActionTypes.ADS_DATA_CONNECT_STATRT });		
		const url=Endpoint+"getInitialData";
        fetch(url, {
            method: "GET",
            headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				dataType: 'json',
				'X-Requested-With': 'XMLHttpRequest',
			},
           })
        .then((response) => response.json())
        .then((responseJson) => {  
              
            if(responseJson.state !=="1"){
				AlertMessage("Item does not exist in the database")
                itemLookUpDataCallFail(dispatch,responseJson.message,data)
            }else{
			//	AlertMessage(responseJson.message)
			    initialDataCallSuccess(dispatch,responseJson.data)  
            }                    
           
        })
        .catch((error) => {         
		//	itemLookUpDataCallFail(dispatch,"Intertnet Connection Error!",data)
			AlertMessage("Intertnet Connection Error!")
         });
	};
};
 
const itemLookUpDataCallFail = (dispatch, errorMessage,data) => {
	dispatch({
		type: ActionTypes.ADS_DATA_CONNECT_FAIL,
		payload: {
			errorMessage: errorMessage
		}
	});
};

const itemLookUpDataCallSuccess = (dispatch, data) => {	
    //NavigationService.navigate("SportScreen",{eventItem});
	dispatch({
		type: ActionTypes.ADS_DATA_CONNECT_SUCCESS,
		payload: data
	});
};

const initialDataCallSuccess = (dispatch, data) => {	
    //NavigationService.navigate("SportScreen",{eventItem});
	dispatch({
		type: ActionTypes.INITIAL_DATA_CONNECT_SUCCESS,
		payload: data
	});
};

const categoryDataCallSuccess = (dispatch, data) => {	
    //NavigationService.navigate("SportScreen",{eventItem});
	dispatch({
		type: ActionTypes.CATEGORY_DATA_CONNECT_SUCCESS,
		payload: data
	});
};

const AlertMessage=(body)=>{
	Alert.alert(
		"SKYLINE POS",
		body,
		[
			{ text: 'OK', onPress: () => console.log("ok"), style: 'ok' },

		]
	);
}







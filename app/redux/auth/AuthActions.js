import { Endpoint } from "../../Constants/Api";
import { ActionTypes } from "../ActionTypes";
import NavigationService from "../../Helper/NavigationService";
import AsyncStorage from '@react-native-community/async-storage';//`${ADMIN_ENDPOINT}register`

export const registerUser = (first_name, last_name, password, email, phone_number, uploadURL) => {
	return dispatch => {
		dispatch({ type: ActionTypes.LOGIN_USER_START });
		const data = new FormData();
		data.append('first_name', first_name); // you can append anyone.
		data.append('last_name', last_name);
		data.append('password', password);
		data.append('email', email);
		data.append('phone_number', phone_number);
		var filename = uploadURL.replace(/^.*[\\\/]/, '')
		data.append('photo', {
			uri: uploadURL,
			type: 'image/jpeg', // or photo.type
			name: filename
		});
		const url = Endpoint + "createAccountRequest";
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					// Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
					// dataType: 'json',
					// 'X-Requested-With': 'XMLHttpRequest',
				},
				body: data
			})
				.then((response) => response.json())
				.then((responseJson) => {
					console.log(responseJson)
					if (responseJson.status == true) {
						resolve(responseJson);
					} else {
						loginUserFail(dispatch, responseJson.message);
						return resolve(responseJson);
					}
				})
				.catch((error) => {
					//	alert(error)
					//	AlertMessage(error)
					loginUserFail(dispatch, "Intertnet Connection Error!")
				});
		})
	};
};
export const loginUser = (email, password, type, user_info, savepassword) => {

	return dispatch => {
		dispatch({ type: ActionTypes.LOGIN_USER_START });
		const url = Endpoint + "loginRequest";
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					dataType: 'json',
					'X-Requested-With': 'XMLHttpRequest',
				},
				body: JSON.stringify({
					email,
					password,
				})
			})
				.then((response) => response.json())
				.then((responseJson) => {
					if (responseJson.status == true) {
						loginUserSuccess(dispatch, responseJson, savepassword, email, password);
					} else {
						loginUserFail(dispatch, responseJson.message);
						return resolve(responseJson);
					}

				})
				.catch((error) => {
					loginUserFail(dispatch, "Intertnet Connection Error!")
					return reject(error);
				});
		})
	};

};

const loginUserFail = (dispatch, errorMessage) => {
	dispatch({
		type: ActionTypes.LOGIN_USER_FAIL,
		payload: {
			errorMessage: errorMessage
		}
	});
};

const loginUserSuccess = (dispatch, data, savepassword, loginname, password) => {

	if (savepassword) {
		AsyncStorage.setItem("logedin", "true")
		AsyncStorage.setItem("loginname", loginname)
		AsyncStorage.setItem("password", password)
	}
	NavigationService.navigate("Application");

	dispatch({
		type: ActionTypes.LOGIN_USER_SUCCESS,
		payload: data
	});

};
const updatedSuccess = (dispatch, data) => {


	dispatch({
		type: ActionTypes.LOGIN_USER_SUCCESS,
		payload: data
	});

};


export const autoLogin = (data) => {
	return dispatch => {
		dispatch({ type: ActionTypes.LOGIN_USER_START });
		const url = ADMIN_ENDPOINT + "login";
		fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				dataType: 'json',
				'X-Requested-With': 'XMLHttpRequest',
			},
			body: JSON.stringify({
				loginname: loginname,
				password: password
			})
		})
			.then((response) => response.json())
			.then((responseJson) => {
				//alert(JSON.stringify(responseJson))
				if (responseJson.status == true) {
					loginUserSuccess(dispatch, responseJson, savepassword, loginname, password);
				} else {
					loginUserFail(dispatch, responseJson.message);
					alert(responseJson.message)
				}

			})
			.catch((error) => {
				alert(error)
				loginUserFail(dispatch, "Intertnet Connection Error!")
			});
	};
	NavigationService.navigate("OptionScreen");
	return dispatch => {
		dispatch({
			type: ActionTypes.LOGIN_USER_SUCCESS,
			payload: data
		});
	};
};
export const updateData = (email, password) => {

	return dispatch => {
		dispatch({ type: ActionTypes.LOGIN_USER_START });
		const url = Endpoint + "loginRequest";
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					dataType: 'json',
					'X-Requested-With': 'XMLHttpRequest',
				},
				body: JSON.stringify({
					email,
					password,
				})
			})
				.then((response) => response.json())
				.then((responseJson) => {
					if (responseJson.status == true) {
						updatedSuccess(dispatch, responseJson);

					} else {
						loginUserFail(dispatch, responseJson.message);
						return resolve(responseJson);
					}

				})
				.catch((error) => {
					loginUserFail(dispatch, "Intertnet Connection Error!")
					return reject(error);
				});
		})
	};

};

export const logout = () => {
	AsyncStorage.setItem("logedin", "false")
	NavigationService.navigate("Login");
	return dispatch => {
		dispatch({
			type: ActionTypes.LOGOUT_USER,

		});
	};
};

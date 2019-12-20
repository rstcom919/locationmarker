
import { ActionTypes } from "../ActionTypes";
export const AuthReducer = (
	state = {
		user: {},
		loading: false,
		error: false,
		errorMessage: "",
		places:[]
	},
	action) => {
	switch (action.type) {
		case ActionTypes.LOGIN_USER_START:
			return {
				...state,
				error: false,
				loading: true,
				errorMessage: ""
			};

		case ActionTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				loading: false,
				loginCompleted: true,
				user: action.payload.user_info,
				places:action.payload.places,
			};

		case ActionTypes.LOGIN_USER_FAIL:
			return {
				...state,
				error: true,
				loading: false,
				errorMessage: action.payload.errorMessage
			};
		case ActionTypes.LOGOUT_USER:
			return {
				...state,
				error: true,
				loading:false
			};

		default:
			return state;
	}
};

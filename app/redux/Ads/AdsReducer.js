
import { ActionTypes } from "../ActionTypes";

export const AdsReducer = (
	state = {
		adsData: [],
		categoryData: [],
		loading: false,
		error: false,
		errorMessage: "",
	},
	action) => {
	switch (action.type) {
		case ActionTypes.ADS_DATA_CONNECT_STATRT:
			return {
				...state,
				error: false,
				loading: true,
				errorMessage: "",
			};

		case ActionTypes.ADS_DATA_CONNECT_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				adsData: action.payload
			};
		case ActionTypes.INITIAL_DATA_CONNECT_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				adsData: action.payload.ads,
				categoryData: action.payload.category
			};
		case ActionTypes.CATEGORY_DATA_CONNECT_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
		    	categoryData: action.payload
			};

		case ActionTypes.ADS_DATA_CONNECT_FAIL:
			return {
				...state,
				error: true,
				loading: false,
				errorMessage: action.payload.errorMessage
			};
		default:
			return state;
	}
};

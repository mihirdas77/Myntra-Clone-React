import * as types from "./actiontypes";
const initialState = {
	loading: false,
	error: false,
	products: [],
	mens:[],
    womensproducts: [],
	funitureData:[],
	cart: [],
	kids:[],
	users:[],
	wishlist:[],
	total: 0,
	auth: 0,
	name:""

};
export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case types.GET_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				products: payload.data ? payload.data : [],
				total: payload.total,
			};
		case types.GET_PRODUCT_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
			};
			case types.GET_WOMENS_PRODUCT_REQUEST:
				return {
					...state,
					loading: true,
				};
			case types.GET_WOMENS_PRODUCT_SUCCESS:
				return {
					...state,
					loading: false,
					womensproducts: payload,
				
				};
			case types.GET_WOMENS_PRODUCT_FAILURE:
				return {
					...state,
					loading: false,
					error: true,
				};
				case types.GET_FUNITURE_PRODUCT_REQUEST:
					return {
						...state,
						loading: true,
					};
				case types.GET_FUNITURE_PRODUCT_SUCCESS:
					return {
						...state,
						loading: false,
						funitureData: payload,
					
					};
				case types.GET_FUNITURE_PRODUCT_FAILURE:
					return {
						...state,
						loading: false,
						error: true,
					};
					case types.GET_MENS_PRODUCT_REQUEST:
					return {
						...state,
						loading: true,
					};
				case types.GET_MENS_PRODUCT_SUCCESS:
					return {
						...state,
						loading: false,
						mens: payload,
					
					};
				case types.GET_MENS_PRODUCT_FAILURE:
					return {
						...state,
						loading: false,
						error: true,
					};
					case types.GET_KIDS_PRODUCT_REQUEST:
					return {
						...state,
						loading: true,
					};
				case types.GET_KIDS_PRODUCT_SUCCESS:
					return {
						...state,
						loading: false,
						kids: payload,
					
					};
				case types.GET_KIDS_PRODUCT_FAILURE:
					return {
						...state,
						loading: false,
						error: true,
					};
					case types.GET_TO_CART:
					return {
						...state,
						loading: false,
						cart:payload
					
					};
					case types.ADD_TO_CART:
					return {
						...state,
						loading: false,
					
					
					};
					case types.ADD_WISHLIST:
					return {
						...state,
						loading: false,
					
					
					};
					case types.GET_WISHLIST:
					return {
						...state,
						loading: false,
						wishlist:payload
					
					};
					case types.DELETE_TO_CART:
					return {
						...state,
						loading: false,
					
					
					};
					case types.ADD_USER:
					return {
						...state,
						loading: false,
					
					
					};
					case types.GET_USER:
					return {
						...state,
						loading: false,
						users:payload
					
					};
					case types.AUTH_TRUE:
						return{
                        ...state,
						auth:payload
					}
					case types.USER_LOGOUT:
						return{
							...state,
							auth:payload
						}
		default:
			return state;
	}
};
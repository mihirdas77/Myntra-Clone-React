import * as types from "./actiontypes";
import axios from "axios";
const URL = "https://obtainable-gray-tenor.glitch.me/allproducts";
const MENS_URL = 'https://childish-nonchalant-gold.glitch.me/mensproducts'
const WOMEN_URL = 'https://childish-nonchalant-gold.glitch.me/womensdata'
const FUNITURE_URL = 'https://childish-nonchalant-gold.glitch.me/funitureData'
const KIDS_URL = 'https://childish-nonchalant-gold.glitch.me/kids'
const CART_URL = 'https://childish-nonchalant-gold.glitch.me/cart'
const USER_URL = 'https://childish-nonchalant-gold.glitch.me/myntra_users'
const WISHLIST_URL='https://childish-nonchalant-gold.glitch.me/wishlist'
export const getProduct = (params) => (dispatch) => {
	dispatch({ type: types.GET_PRODUCT_REQUEST });
	axios
		.get(URL, params)
		.then((res) => {
			const total = res.headers["x-total-count"];
			const obj = { total: total, data: res.data };
			dispatch({ type: types.GET_PRODUCT_SUCCESS, payload: obj });
		})
		.catch((err) => {
			dispatch({ type: types.GET_PRODUCT_FAILURE });
		});
};

export const getKidsProduct = (page, obj) => (dispatch) => {
	dispatch({ type: types.GET_KIDS_PRODUCT_REQUEST });
	axios
		.get(`${KIDS_URL}?_page=${page}&_limit=9`, obj)
		.then((res) => {

			dispatch({ type: types.GET_KIDS_PRODUCT_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: types.GET_KIDS_PRODUCT_FAILURE });
		});
};



export const getMensProduct = (page, obj) => (dispatch) => {
	dispatch({ type: types.GET_MENS_PRODUCT_REQUEST });
	axios
		.get(`${MENS_URL}?_page=${page}&_limit=9`, obj)
		.then((res) => {

			dispatch({ type: types.GET_MENS_PRODUCT_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: types.GET_FUNITURE_PRODUCT_FAILURE });
		});
};
export const getWomenProduct = (page, obj) => (dispatch) => {
	dispatch({ type: types.GET_WOMENS_PRODUCT_REQUEST });
	axios
		.get(`${WOMEN_URL}?_page=${page}&_limit=9`, obj)
		.then((res) => {

			dispatch({ type: types.GET_WOMENS_PRODUCT_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: types.GET_WOMENS_PRODUCT_FAILURE });
		});
};

export const getfunitureProduct = (page, obj) => (dispatch) => {



	console.log(FUNITURE_URL);
	dispatch({ type: types.GET_FUNITURE_PRODUCT_REQUEST });
	axios
		.get(FUNITURE_URL, obj)
		.then((res) => {

			dispatch({ type: types.GET_FUNITURE_PRODUCT_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: types.GET_FUNITURE_PRODUCT_FAILURE });
		});
};



export const addToCart = (data) => (dispatch) => {
	axios.post(CART_URL, data)
		.then(() => {

			dispatch({ type: types.ADD_TO_CART });
		})

}
export const addToWishlist = (state) => (dispatch) => {
	axios.post(WISHLIST_URL, state)
		.then(() => {

			dispatch({ type: types.ADD_TO_CART });
		})

}

export const deleteToCart = (id) => (dispatch) => {
	axios.delete(`${CART_URL}/${id}`)
		.then(() => {

			dispatch({ type: types.DELETE_TO_CART });
		})

}

export const getToWishList = (dispatch) => {
	axios.get(WISHLIST_URL)
		.then((res) => {
			dispatch({ type: types.GET_WISHLIST, payload: res.data });
		})

}
export const getToCart = (dispatch) => {
	axios.get(CART_URL)
		.then((res) => {
			dispatch({ type: types.GET_TO_CART, payload: res.data });
		})

}

export const addUser = (data) => (dispatch) => {
	axios.post(USER_URL, data)
		.then(() => {

			dispatch({ type: types.ADD_USER });
		})

}


export const getUser = (dispatch) => {
	axios.get(USER_URL)
		.then((res) => {

			dispatch({ type: types.GET_USER, payload: res.data });
		})

}





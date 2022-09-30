import axios from 'axios';

const token = localStorage.getItem("userToken");
const HEADERS = {
    "X-Authorization": `Bearer ${token}`
}
const BASE_URL = "http://18.183.45.219:3000/api/v1";


export const signUpApiCall = (data) => {
    const {name, email, password} = data;

    return axios({
        method: "POST",
        url: `${BASE_URL}/users/register`,
        data: {
            "name": name,
            "email": email,
            "password": password
        }
    })
}


export const loginApiCall = async (data) => {
    const {email, password} = data;
    return axios({
        method: "POST",
        url: `${BASE_URL}/users/login`,
        data: {
            "email": email,
            "password": password
        }
    })
}

export const loadTheProducts = async () => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/products`,
        headers: HEADERS
    })
}


export const addProductToTheCart = async (cartID, productID) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/carts/${cartID}`,
        headers: HEADERS,
        data: {
            "id": productID,
        }
    })
}


export const getCartData = async () => {
    const cartID = localStorage.getItem("cartId");
    return axios({
        method: "GET",
        url: `${BASE_URL}/carts/${cartID}`,
        headers: HEADERS
    })
}
import * as config from '../config';
import axios from "axios";

export const apiGetAddress = async() => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${config.urlAPI}/api/delivery-addresses`,  {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}
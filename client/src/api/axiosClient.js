import axios from "axios";
import apiConfig from "./apiConfig";
import queryString from 'query-string'
import swal from "sweetalert";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey, language:'es'})
    
});

  axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }else  return response;
    
}, (error) => {
    swal({
        title:"No se pudo cargar la información",
        icon: "error"
       })
    throw error;
})


export default axiosClient;
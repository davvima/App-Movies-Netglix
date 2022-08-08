const axios = require("axios");
const apiConfig = require("./apiConfig");
const queryString = require ('query-string')

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
    throw error;
})

module.exports = axiosClient;
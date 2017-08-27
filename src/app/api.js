import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000'

const getJson = (url) => {
    return axios({
        method: 'GET',
        url
    })
    .then(response => response.data)
    .catch(err => err)
}

export default class Api {      

    static getRootId = () => {
        const url = API_URL + '/root'
        return getJson(url)       
    }

    static getNodeChildrenIds = (nodeId) => {
        const url = API_URL + `/nodes/${nodeId}`
        return getJson(url)
    }        
}
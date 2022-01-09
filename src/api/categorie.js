import axios from 'axios'

const BASE_URL = 'http://localhost/td2vuejs/public/api/categories'

async function getCategories () {
    return await axios.get(BASE_URL)
}

async function getCategorie (id) {
    return await axios.get(BASE_URL+'/'+id)
}

async function postCategorie (data) {
    return await axios.post(BASE_URL, data)
}

async function removeCategorie (id) {
    return await axios.delete(BASE_URL+'/'+id)
}

async function updateCategorie (id,data) {
    return await axios.put(BASE_URL+'/'+id, data)
}

export {getCategories, getCategorie, postCategorie, removeCategorie, updateCategorie}

import axios from 'axios'

const BASE_URL = 'http://localhost/td2vuejs/public/api/messages'

async function getMessages () {
    return await axios.get(BASE_URL+'/')
}

async function getMessage (id) {
    return await axios.get(BASE_URL+'/'+id)
}


async function removeMessage (id) {
    return await axios.delete(BASE_URL+'/'+id)
}

async function postMessage (data) {
    return await axios.post(BASE_URL,data)
}

async function updateMessage (id, data) {
    return await axios.put(BASE_URL+'/'+id,data)
}
export {getMessages, getMessage, removeMessage, postMessage, updateMessage}

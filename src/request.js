import axios from 'axios'

const service = axios.create({
    baseURL:"http://localhost:8089",
    // baseURL:"http://api.xyouzi.xyz",
    timeout:5000
})

export default service

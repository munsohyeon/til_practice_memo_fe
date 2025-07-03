import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {
    async save(jsonBody) {
        const res = await axios.post('/memo', jsonBody);
        return res.data;
    }
    async findAll(params) {
        // items의 역할, 보낸 이유?? 백엔드으로 보내기 위해서
        // 쿼리스트링 형태로 그 이유는 백엔드에서 그렇게 받도록 해둠
        const res = await axios.get('/memo', { params });
        return res.data;
    }
    async findById(id) {
        const res = await axios.get(`/memo/${ id }`);
        return res.data;
    }
    async modify(jsonBody) {
        const res = await axios.put('/memo', jsonBody);
        return res.data;
    }
    async deleteById(params) {
        const res = await axios.delete('/memo', { params });
        return res.data;
    }
}

export default new HttpService();
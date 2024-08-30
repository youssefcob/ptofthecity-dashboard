import axios from "axios";


const Http = {
    url: "http://localhost:8000/api/",
    methods: {
        async get(url: string) {
            url = Http.url + url;
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error: any) {
                throw (error.response.data.message);
            }
        },
        async post(url: string, data: any, headers: any = {}) {
            url = Http.url + url;

            try {
                const response = await axios.post(url, data, {headers});
                return response;
            } catch (error:any) {
                console.error(error.response.data.message);
                return error.response;

            }
        },
        async put(url: string, data: any) {
            url = Http.url + url;

            try {
                const response = await axios.put(url, data);
                return response.data;
            } catch (error: any) {
                console.error(error.response.data.message);
            }
        },
        async delete(url: string, headers: any = {}) {
            url = Http.url + url;

            try {
                const response = await axios.delete(url, {headers});
                return response;
            } catch (error: any) {
                console.error(error.response.data.message);
                return error.response;
            }
        },
    }
    
}

export default Http.methods as any;
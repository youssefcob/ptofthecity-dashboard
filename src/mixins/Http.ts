import axios from "axios";


const Http = {
    url: (() => {
        switch (import.meta.env.VITE_ENV) {
            case 'development':
                return import.meta.env.VITE_API_URL;
            case 'staging':
                return import.meta.env.VITE_API_STAGING_URL;
            case 'production':
                return import.meta.env.VITE_API_PRODUCTION_URL;
            default:
                throw new Error('Unknown environment');
        }
    })(),
    methods: {
        async get(url: string, headers: any = {}) {
            url = Http.url + url;
            try {
                const response = await axios.get(url, { headers });
                return response
            } catch (error: any) {
                console.error(error);
                return error.response;
            }
        },
        async post(url: string, data: any, headers: any = {}) {
            url = Http.url + url;

            try {
                const response = await axios.post(url, data, { headers });
                return response;
            } catch (error: any) {
                console.error(error);
                return error.response;

            }
        },
        async put(url: string, data: any, headers: any = {}) {
            url = Http.url + url;

            try {
                const response = await axios.put(url, data, { headers });
                return response;
            } catch (error: any) {
                console.error(error.response);

                if (error.response.status === 401) {
                    // alert('Unauthorized');
                    // window.location.href = '/login';
                }
                throw error.response;

            }
        },
        async patch(url: string, data: any, headers: any = {}) {
            url = Http.url + url;

            try {
                const response = await axios.patch(url, data, { headers });
                return response;
            } catch (error: any) {
                console.error(error.response);

                if (error.response.status === 401) {
                    // alert('Unauthorized');
                    // window.location.href = '/login';
                }
                throw error.response;

            }
        },
        async delete(url: string, headers: any = {}, body: any = {}) {
            url = Http.url + url;

            try {
                const response = await axios.delete(url, {
                    headers: headers,
                    data: body
                });
                return response;
            } catch (error: any) {
                console.error(error.response.data.message);
                return error.response;
            }
        },
    }

}

export default Http.methods as any;
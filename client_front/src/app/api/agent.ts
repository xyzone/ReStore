import axios, { AxiosError, AxiosResponse } from "axios";
// import { useNavigate } from 'react-router-dom'; 
import { toast } from "react-toastify";  
import { myRouter } from "../router/Router";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));
axios.defaults.baseURL = "http://localhost:5001/api/";
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use( 
  async ( response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    // const navigate = useNavigate();
    switch (status) {
      case 400:
        if(data.errors){
            const modelStateErrors: string[] = [];
            for (const key in data.errors){
                if(data.errors[key]){
                    modelStateErrors.push(data.errors[key]);
                }
            }
            throw modelStateErrors.flat(); 
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500: 
        // navigate('/server-error');
        myRouter.navigate('/server-error', {state: {error1: data}});
        // toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilter: () => requests.get('products/filters')
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&qty=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&qty=${quantity}`),
}

const agent = {
  Catalog,
  TestErrors,
  Basket,
};
 
export default agent;

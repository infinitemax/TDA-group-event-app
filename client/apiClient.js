import axios from "axios";
const url = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001/";


export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider(),
      },
      data,
    }).catch((error) => {
      if (error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject();
      } else {
        console.log(error);
        throw error;
      }
    });
  }


  async getEvents() {
    const dataRes = await axios.get("http://localhost:3001/", {
      headers: {
        authorization: this.tokenProvider(),
      },
    })
   
    return dataRes;

  }
  // temporary parameters
  async addEvent(title, dateAndTime, location, description, image) {

    const headers = {
      Authorization: this.tokenProvider(),
      'Content-Type': 'application/json',
    };
    const data = { title, dateAndTime, location, description, image };
    const dataRes = await axios.post('http://localhost:3001/', data, { headers });
    ;
    return dataRes;
  }

  removeEvent(id) {
    return this.authenticatedCall("delete", `${id}`);
  }

  updateEvent(id, name, location, description, dateTime) {
    return this.authenticatedCall("put", `${id}`, { name, location, description, dateTime });
  }

  async login(email, password) {

    return await axios({
      method: "post",
      url: `${url}/auth`,
      data: { email, password },
    });
    
  }
  
}
  
export const registerUser = async (email, password, confirmPassword) => {
  const apiClient = new ApiClient(); // No token or logout handler is needed for registration
  return apiClient.register(email, password, confirmPassword);
}

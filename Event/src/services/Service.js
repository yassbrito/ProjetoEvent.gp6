//acesso que tem como base o local da nossa api

import axios from "axios";
const apiPorta = "5289"

//apiLocal ela recebe o endereco da api
const apilocal = `http://localhost:${apiPorta}/api/`;

const apiAzure = "apieventbrito-emh4fmahfnbge4d0.brazilsouth-01.azurewebsites.net/api/";

const api = axios.create({
  baseURL: apiAzure  
});

export default api;
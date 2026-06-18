import axios from "axios";

const baseUrl = "/api/todos";

const getData = () => {
  return axios.get(baseUrl).then((result) => {
    return result.data;
  });
};

const deleteData = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const postData = (newTodo) => {
  return axios.post(baseUrl, newTodo).then((result) => result.data);
};

const putData = (id, newTodo) => {
  return axios.put(`${baseUrl}/${id}`, newTodo).then((result) => result.data);
};

export { getData, deleteData, postData, putData };

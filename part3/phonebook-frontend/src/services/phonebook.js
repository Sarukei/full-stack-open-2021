import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

axios.defaults.baseURL = baseUrl;

const addContact = (contactToAdd) => {
  const request = axios.post("/", contactToAdd);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`/${id}`);

  return request.then((response) => response.data);
};

const getAllContacts = () => {
  const request = axios.get("/");
  return request.then((response) => response.data);
};

const updateContact = (id, newContact) => {
  const request = axios.put(`/${id}`, newContact);
  return request.then((response) => response.data);
};

export default { addContact, getAllContacts, deleteContact, updateContact };

import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const addContact = (contactToAdd) => {
  const request = axios.post(baseUrl, contactToAdd);
  return request.then((response) => response.data);
};

const getAllContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { addContact, getAllContacts };

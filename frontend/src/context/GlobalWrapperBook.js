import { createContext, useState } from 'react';
import axios from 'axios';
import { useDisclosure, useToast } from '@chakra-ui/react';
export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const FetchUsers = () => {
    axios
      .get('/api/books')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Search = (query) => {
    axios
      .post(`/api/books/search?key=${query}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Delete = (id) => {
    axios
      .delete(`/api/books/${id}`)
      .then((res) => {
        setUsers(users.filter((u) => u._id != id));
        toast({
          title: 'Livre Supprimé',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Add = (form, setForm) => {
    axios
      .post('/api/books', form)
      .then((res) => {
        setUsers([...users, res.data]);
        toast({
          title: 'Livre Ajouté',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };

  const FindOne = async (id) => {
    await axios
      .get(`/api/books/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };

  const Update = (form, setForm, id) => {
    axios
      .put(`/api/books/${id}`, form)
      .then((res) => {
        toast({
          title: 'Livre modifié',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        FetchUsers();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };
  return (
    <GlobalContext.Provider
      value={{
        FetchUsers,
        Search,
        Delete,
        Add,
        FindOne,
        Update,
        users,
        onOpen,
        isOpen,
        onClose,
        errors,
        setErrors,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

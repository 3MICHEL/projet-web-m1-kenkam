import { createContext, useState } from 'react';
import axios from 'axios';
import { useDisclosure, useToast } from '@chakra-ui/react';
export const GlobalContextAuthor = createContext();

export default function Wrapper({ children }) {
  const [authors, setAuthors] = useState([]);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const FetchAuthor = () => {
    axios
      .get('/api/authors')
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Search = (query) => {
    axios
      .post(`/api/authors/search?key=${query}`)
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((err) => {
        console.log(err.reponse.data);
      });
  };

  const Delete = (id) => {
    axios
      .delete(`/api/authors/${id}`)
      .then((res) => {
        setAuthors(authors.filter((u) => u._id != id));
        toast({
          title: 'Auteur Supprimé',
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
      .post('/api/authors', form)
      .then((res) => {
        setAuthors([...authors, res.data]);
        toast({
          title: 'Auteur Ajouté',
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
      .get(`/api/authors/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };

  const Update = (form, setForm, id) => {
    axios
      .put(`/api/authors/${id}`, form)
      .then((res) => {
        toast({
          title: 'Auteur modifié',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        FetchAuthor();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };
  return (
    <GlobalContextAuthor.Provider
      value={{
        FetchAuthor,
        Search,
        Delete,
        Add,
        FindOne,
        Update,
        authors,
        onOpen,
        isOpen,
        onClose,
        errors,
        setErrors,
        user,
        setAuthors,
      }}
    >
      {children}
    </GlobalContextAuthor.Provider>
  );
}

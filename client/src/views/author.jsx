import {
    Box,
    Button,
    Container,
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
  } from '@chakra-ui/react';
  import { FormControl } from '@chakra-ui/react';
  import { useContext, useEffect, useState } from 'react';
  import { GlobalContext } from '../context/GlobalWrapperAuthor';
  import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
  // import RowAuthor from '../components/RowAuthor';
  import Row from '../components/Row';
  import DrawerAuthor from '../components/DrawerAuthor';
  
  function Author() {
    const { FetchUsers, Search, user, onOpen, isOpen, onClose } =
      useContext(GlobalContext);
    const [query, setQuery] = useState('');
    useEffect(() => {
        FetchUsers();
    }, []);
    const SearchHandler = () => {
      Search(query);
    };
    const onchangeHandler = (e) => {
      setQuery(e.target.value);
    };
    return (
      <div className="App">
        <Container maxW={'full'} p="4" fontSize={'18px'}>
          <Box rounded="lg" boxShadow="base" p="4">
            <Box mt="2" gap={'2'} mb="4" display={'flex'}>
              <FormControl>
                <Input type="text" onChange={onchangeHandler} />
              </FormControl>
              <Button
                leftIcon={<AiOutlineSearch />}
                colorScheme="teal"
                variant="outline"
                maxW="300px"
                minW="150px"
                onClick={() => SearchHandler()}
              >
                Rechercher
              </Button>
            </Box>
          </Box>
          <Box mt="5" rounded={'lg'} boxShadow="base">
            <Box p="4" display={'flex'} justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">
                Liste Auteurs
              </Text>
              <Button
                colorScheme="teal"
                variant="outline"
                maxW={'300px'}
                minW="150px"
                leftIcon={<AiOutlinePlus fontSize={'20px'} />}
                onClick={onOpen}
              >
                Ajouter
              </Button>
            </Box>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Profil</Th>
                    <Th>Noms</Th>
                    <Th>Prenoms</Th>
                    </Tr>
                </Thead>
                <Tbody>
                  {/* {user?.map(({ _id, firstname, lastname }) => {
                    return (
                      <Row
                        id={_id}
                        firstname={firstname}
                        lastname={lastname}
                        
                      />
                    );
                  })} */}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <DrawerAuthor />
        </Container>
      </div>
    );
  }
  
  export default Author;
  
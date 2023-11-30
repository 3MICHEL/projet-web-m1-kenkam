import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Stack,
  } from '@chakra-ui/react';
  import { useContext, useEffect, useState } from 'react';
  import { GlobalContextAuthor } from '../context/GlobalWrapperAuthor';
  import InputsGroup from './InputsGroup';
  
  export default function DrawerAuthor() {
    const { onOpen, isOpen, onClose, Add, errors, setErrors, author, Update } =
      useContext(GlobalContextAuthor);
    const [form, setForm] = useState({});
    const onChangeHandler = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const onAdd = () => {
      Add(form, setForm);
    };
  
    const onUpdate = () => {
      Update(form, setForm, form._id);
    };
  
    useEffect(() => {
      setForm(author);
    }, [author]);
    return (
      <>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton
              onClick={() => {
                onClose();
                setErrors({});
                setForm({});
              }}
            />
            <DrawerHeader>Creé/modifié Auteur</DrawerHeader>
  
            <DrawerBody>
              <Stack spacing={'24px'}>
                <InputsGroup
                  name="firstname"
                  onChangeHandler={onChangeHandler}
                  value={form?.firstname}
                  errors={errors?.firstname}
                />
                <InputsGroup
                  name="lastname"
                  onChangeHandler={onChangeHandler}
                  value={form?.lastname}
                  errors={errors?.lastname}
                />
               
              </Stack>
            </DrawerBody>
  
            <DrawerFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => {
                  onClose();
                  setErrors({});
                  setForm({});
                }}
              >
                Annuler
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => (form._id ? onUpdate() : onAdd())}
              >
                Enregistrer
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  
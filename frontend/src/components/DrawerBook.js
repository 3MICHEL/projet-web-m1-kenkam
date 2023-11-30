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
  import { GlobalContext } from '../context/GlobalWrapperBook';
  import InputsGroup from './InputsGroup';
  
  export default function DrawerBook() {
    const { onOpen, isOpen, onClose, Add, errors, setErrors, book, Update } =
      useContext(GlobalContext);
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
      setForm(book);
    }, [book]);
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
            <DrawerHeader>Creé/modifié Livre</DrawerHeader>
  
            <DrawerBody>
              <Stack spacing={'24px'}>
                <InputsGroup
                  name="name"
                  onChangeHandler={onChangeHandler}
                  value={form?.name}
                  errors={errors?.name}
                />
                <InputsGroup
                  name="author_id"
                  onChangeHandler={onChangeHandler}
                  value={form?.author_id}
                  errors={errors?.author_id}
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
  
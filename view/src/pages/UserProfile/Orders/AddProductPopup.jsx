import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styled from "styled-components";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import request from "../../../utils/Request";

import Modal from '../../../components/Modal';
import ImageUpload from '../../../components/ImageUpload';



const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const AddProductPopup = () => {
    return (
        <div>
            <Modal
                trigger={<Button className="button"> Dodaj produkt </Button>}
                title="Dodaj produkt"
            >
                <Formik
                    initialValues={{ name: '', description: '', price: 0 }}
                    validate={values => {
                        const errors = {};

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        toast.promise(
                            request(`/product/update`, values),
                            {
                                pending: 'Promise is pending',
                                success: {
                                    render({ data }) {
                                        return `${data.msg}`
                                    }
                                },
                                error: {
                                    render({ data }) {
                                        return `${data[0]}`
                                    }
                                },
                            }
                        )
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (

                        <div>
                            <Input
                                placeholder="Nazwa"
                                type="name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            /><Input
                                placeholder="Opis"
                                // type="email"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            /><Input
                                placeholder="Cena"
                                type="number"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                            />

                            <ImageUpload />

                            <Button onClick={() => { handleSubmit() }}>ZAPISZ</Button>
                        </div>
                    )}
                </Formik >
            </Modal>
        </div>
    )
}

export default AddProductPopup
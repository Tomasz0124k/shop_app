import React from 'react'
import styled from "styled-components";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import request from "../../../utils/Request";
import AddProductPopup from './AddProductPopup';
import ProductsList from './ProductsList';

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

const index = () => {
  return (
    <>
      {/* <AddProductPopup /> */}
      <ProductsList/>
    </>
  )
}

export default index
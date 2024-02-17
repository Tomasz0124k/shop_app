import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
// import { SERVER_URL } from './../config';
import request from "../utils/Request";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    request(`/products`)
      .then((result) => {
        setData(result)
      })
  }, [])
  return (
    <Container>
      {data.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;

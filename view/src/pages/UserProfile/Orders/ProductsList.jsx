import React, { useEffect, useState } from 'react'
import request from '../../../utils/Request';
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from '../../../responsive'


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;


const ProductItem = (props) => {

  return (
    <Product>
      <ProductDetail>
        {/* <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" /> */}
        <div style={{ width: 100, fontSize: 40, display:'flex', alignItems: 'center', justifyContent: 'center' }}>
          {props.lp}
        </div>
        <Details>
          <ProductName>
            <b>Ilość produktów:</b> {props.data?.orderDetails.products.length}
          </ProductName>
          <ProductName>
            <b>Data zamówienia:</b> {props.data?.date}
          </ProductName>
          <ProductId>
            <b>Nr zamówienia:</b> {props.data?.id}
          </ProductId>
          {/* <ProductColor color="black" /> */}
          {/* <ProductSize>
                        <b>Size:</b> 37.5
                    </ProductSize> */}
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          {/* <Add /> */}
          {/* <ProductAmount>2</ProductAmount> */}
          {/* <Remove /> */}
        </ProductAmountContainer>
        <ProductPrice>{props.data.totalPrice}zł</ProductPrice>
      </PriceDetail>
    </Product>
  )
}

const ProductsList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    request(`/cart`, { payed: true, list: true })
      .then((r) => {
        setProducts(r)
      })
  }, [])

  return (
    <div>
      {products?.map((product, index) => (
        <ProductItem data={product} key={index} lp={index + 1} />
      ))}
    </div>
  )
}

export default ProductsList
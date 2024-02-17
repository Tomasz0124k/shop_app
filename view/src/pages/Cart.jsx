import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "./../responsive";
import { useEffect, useState } from "react";
import request from "../utils/Request";
import defaultProductImage from '../images/defaultProductImage.jpg'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { SERVER_URL } from "../config";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom 10px;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  border-radius: 10px;
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

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    request(`/cart`)
      .then((r) => { setData(r) })
  }, [])

  const payCart = () => {
    let userDetails = JSON.parse(localStorage.getItem('user'))
    toast.promise(
      request(`/cart/pay`, {
        id: data.id
        // orderDetails: { usersAmount, period }
      }),
      {
        pending: 'Promise is pending',
        success: {
          render({ data }) {
            window.location.href = '/profile/orders'
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
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>TWÓJ KOSZYK</Title>
        <Top>
          <Link to={'/'} style={{ textDecoration: 'none', color: '#000' }} >
            <TopButton onClick={() => { }}>KONTYNUUJ ZKAUPY</TopButton>
          </Link>
          <TopTexts>
            {/* <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText> */}
          </TopTexts>
          {data?.orderDetails?.products?.length > 0 &&
            <TopButton type="filled">ZAMAWIAM I PŁACĘ</TopButton>
          }
        </Top>
        <Bottom>
          <Info>
            {!data?.orderDetails?.products && 'Twój koszyk jest pusty'}
            {data?.orderDetails?.products?.map((product, index) => {
              return (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={SERVER_URL + '' + product.image || defaultProductImage} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.name}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product.id}
                      </ProductId>
                      {/* <ProductColor color="black" /> */}
                      <ProductSize>
                        <b>Czas trwania:</b> {product.period}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {/* <Add /> */}
                      <ProductAmount> {product.usersAmount}</ProductAmount>
                      {/* <Remove /> */}
                    </ProductAmountContainer>
                    <ProductPrice> {product.price}zł</ProductPrice>
                  </PriceDetail>
                </Product>
              )
            })}

            {/* <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> HAKURA T-SHIRT
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="gray" />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>1</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 20</ProductPrice>
              </PriceDetail>
            </Product> */}
          </Info>
          <Summary>
            <SummaryTitle>PODSUMOWANIE ZAMÓWIENIA</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Cena zamówienia</SummaryItemText>
              <SummaryItemPrice>{data.totalPrice || '0'}zł</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
              <SummaryItemText>Cena wysyłki</SummaryItemText>
              <SummaryItemPrice>16.7zł</SummaryItemPrice>
            </SummaryItem> */}
            {/* <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem type="total">
              <SummaryItemText>Razem</SummaryItemText>
              <SummaryItemPrice>{(data.totalPrice || 0)}zł</SummaryItemPrice>
            </SummaryItem>
            {data?.orderDetails?.products?.length > 0 &&
              <Button onClick={() => { payCart() }}>ZAMAWIAM I PŁACĘ</Button>
            }
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

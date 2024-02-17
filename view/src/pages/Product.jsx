import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../utils/Request";
import { SERVER_URL } from "../config";
import { toast } from 'react-toastify';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 70%;
  height: 50vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = (props) => {
  const params = useParams()

  const [data, setData] = useState({})

  useEffect(() => {
    request(`/products`, { id: params?.id })
      .then((r) => { setData(r) })
  }, [])

  const [usersAmount, setUsersAmount] = useState(1);
  const [period, setPeriod] = useState(1)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(data.price)
  }, [data])

  const addToCart = () => {
    let userDetails = JSON.parse(localStorage.getItem('user'))
    toast.promise(
      request(`/cart/products/update`, {
        ...data,
        product: { id: data.id, usersAmount, period },
        user: userDetails.id,
        sum: price,
        // orderDetails: { usersAmount, period }
      }),
      {
        pending: 'Promise is pending',
        success: {
          render({ data }) {
            window.location.href = '/cart'
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
        <ImgContainer>
          <Image src={SERVER_URL + '' + data?.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{data?.name}</Title>
          <Desc>
            {data?.description}
          </Desc>
          <Price>{price} pln</Price>
          <FilterContainer>
            {/* <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter> */}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              Ilość użytkowników
              <Remove onClick={() => {
                if (usersAmount <= 1)
                  return
                let i = data.price * 0.8
                setPrice(price - 20)
                setUsersAmount(usersAmount - 1)
              }
              } />
              <Amount>{usersAmount}</Amount>
              <Add onClick={() => {
                let i = data.price * 0.8
                setPrice(price + 20)
                setUsersAmount(usersAmount + 1)
              }
              } />
            </AmountContainer>
            <br></br>
            <AmountContainer>
              Czas trwania
              <Remove onClick={() => {
                if (period <= 1)
                  return
                setPrice(price - 8.5)
                setPeriod(period - 1)
              }} />
              <Amount>{period}</Amount>
              <Add onClick={() => {

                setPrice(price + 8.5)
                setPeriod(period + 1)
              }} />
            </AmountContainer>
            <br></br>

            <Button onClick={() => { addToCart() }}>
              Dodaj do koszyka
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <div style={{height: '30vh'}}></div>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

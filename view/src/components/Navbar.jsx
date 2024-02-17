import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import request from "../utils/Request";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = (params) => {

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [data, setData] = useState(0)

  useEffect(() => {
    request('/cart/products/amount')
      .then(r => { setData(r) })
  }, [])
  return (
    <Container style={{backgroundColor: params.color || '#fff'}}>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Link to={'/'} style={{ textDecoration: 'none', color: '#000' }} >
            <Logo>KusArch.</Logo>
          </Link>
        </Center>
        <Right>

          <MenuItem>
            <Link to={'/profile/orders'} style={{ textDecoration: 'none' }} >
              {user ? (
                <div style={{textDecoration: 'none', color: '#000'}}>Witaj! {user?.firstName}</div>
              ) : (
                <Link to={'/login'} style={{ textDecoration: 'none', color: '#000' }}>
                  ZALOGUJ SIĘ
                </Link>
              )}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to={'/cart'} style={{ textDecoration: 'none' }} >
              <Badge badgeContent={data.amount || 0} color="primary">
                <ShoppingCartOutlined style={{textDecoration: 'none', color: '#000'}}/>
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container >
  );
};

export default Navbar;

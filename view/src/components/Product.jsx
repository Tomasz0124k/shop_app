import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SERVER_URL } from "../config";

const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const styles = {
  container: {
    flex: 1,
    margin: 5,
    minWidth: 280,
    height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fbfd',
    position: 'relative',

    //   &:hover ${ Info } {
    //   opacity: 1;
    // }
  }
}

const Product = ({ item }) => {

  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <Link
      to={'/product/'+item.id}
      style={styles.container}
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}
    >
      <Circle />
      <Image src={SERVER_URL + '/' + item.image} />
      <Info style={{ opacity: menuVisible ? 1 : 0 }}>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Link>
  );
};

export default Product;

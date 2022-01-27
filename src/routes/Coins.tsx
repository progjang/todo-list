import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Toggle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100px;
  border-radius: 10px;
  background-color: #00b894;
  color: ${(props) => props.theme.bgColor};
  margin-left: 10px;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  a {
    padding: 10px;
    transition: color 0.3s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoinProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
interface ICoinsProps {
  toggleTheme: () => void;
}
function Coins({ toggleTheme }: ICoinsProps) {
  /*   const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<ICoinProps[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const json = await response.json();
      setCoins(json.slice(0, 50));
      setLoading(false);
    })();
  }, []); */

  const { isLoading, data } = useQuery<ICoinProps[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <Toggle onClick={toggleTheme}>theme</Toggle>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

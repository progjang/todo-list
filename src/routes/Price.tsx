import styled from "styled-components";

const Text = styled.div`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
`;

interface IPriceData {
  priceData?: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

function Price({ priceData }: IPriceData) {
  return (
    <div>
      <Text>ath_date: {priceData?.ath_date}</Text>
      <Text>ath_price: {priceData?.ath_price.toFixed(3)}</Text>
      <Text>market_cap: {priceData?.market_cap.toFixed(3)}</Text>
      <Text>percent_change_1h: {priceData?.percent_change_1h.toFixed(3)}</Text>
      <Text>percent_change_1y: {priceData?.percent_change_1y.toFixed(3)}</Text>
      <Text>percent_change_6h: {priceData?.percent_change_6h.toFixed(3)}</Text>
      <Text>percent_change_7d: {priceData?.percent_change_7d.toFixed(3)}</Text>
      <Text>
        percent_change_12h: {priceData?.percent_change_12h.toFixed(3)}
      </Text>
      <Text>
        percent_change_15m: {priceData?.percent_change_15m.toFixed(3)}
      </Text>
      <Text>
        percent_change_24h: {priceData?.percent_change_24h.toFixed(3)}
      </Text>
      <Text>
        percent_change_30d: {priceData?.percent_change_30d.toFixed(3)}
      </Text>
      <Text>
        percent_change_30m: {priceData?.percent_change_30m.toFixed(3)}
      </Text>
      <Text>
        percent_from_price_ath: {priceData?.percent_from_price_ath.toFixed(3)}
      </Text>
      <Text>price: {priceData?.price.toFixed(3)}</Text>
      <Text>volume_24h: {priceData?.volume_24h.toFixed(3)}</Text>
      <Text>
        volume_24h_change_24h: {priceData?.volume_24h_change_24h.toFixed(3)}
      </Text>
    </div>
  );
}

export default Price;

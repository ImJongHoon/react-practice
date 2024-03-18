import { useEffect, useState } from "react";
import {useParams, useLocation, Switch, Route, useRouteMatch} from "react-router";
import {Link} from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import styled from "styled-components";
import {useQuery} from "react-query";
import {fetchCoinInfo, fetchPriceData} from "../api";
import {Helmet} from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Title = styled.h1`
    color:${(props)=> props.theme.accentColor};
    font-size: 40px;
`;
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const HomeBtn = styled.div`
    width: 70px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    border-radius: 3px;
    box-shadow: 0 0 4px ${(props) => props.theme.accentColor};
`
const ToggleModeBtn = styled.button`
    width: 70px;
    height: 30px;
    font-size: 14px;
    border: none;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 3px;
    box-shadow: 0 0 4px ${(props) => props.theme.accentColor};
    cursor: pointer;
`

interface RouteParams{
    coinId: string;
}
interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
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
    };
  }

function Coin(){
    const {state} = useLocation<RouteState>();
    const {coinId} = useParams<RouteParams>();

    const priceMatch = useRouteMatch(process.env.PUBLIC_URL + "/:coinId/price");
    const chartMatch = useRouteMatch(process.env.PUBLIC_URL + "/:coinId/chart");

    const {isLoading: infoLoading, data:coinData} = useQuery<InfoData>([coinId, "coinInfo"], ()=>fetchCoinInfo(coinId));
    const {isLoading: priceLoading, data:priceData} = useQuery<PriceData>([coinId, "priceData"], ()=>fetchPriceData(coinId)
    // ,{
    //         refetchInterval: 5000,
    //     }
    );
    
    const setMode = useSetRecoilState(isDarkAtom);

    return (
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : infoLoading ? "Loading..." : coinData?.name}</title>
            </Helmet>
        <Header>
            <ToggleModeBtn onClick={()=>setMode((pre)=>!pre)}>모드변경</ToggleModeBtn>
            <Title>{state?.name ? state.name : infoLoading ? "Loading..." : coinData?.name}</Title>
            <HomeBtn>
                <Link to={process.env.PUBLIC_URL + "/"}>홈으로</Link>
            </HomeBtn>
        </Header>
        {(infoLoading || priceLoading) ? ("Loading...") : (
            <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{coinData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${coinData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{priceData?.quotes.USD.price.toFixed(2)}</span>
              </OverviewItem>
            </Overview>
            <Description>{coinData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{priceData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{priceData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
                <Tab isActive={priceMatch !== null}>
                    <Link to={process.env.PUBLIC_URL + `/${coinId}/price`}>Price</Link>
                </Tab>
                <Tab isActive={chartMatch !== null}>
                    <Link to={process.env.PUBLIC_URL + `/${coinId}/chart`}>Chart</Link>
                </Tab>
            </Tabs>

            <Switch>
              <Route path={process.env.PUBLIC_URL + `/:coinId/price`}>
                <Price coinId={coinId} />
              </Route>
              <Route path={process.env.PUBLIC_URL + `/:coinId/chart`}>
                <Chart coinId={coinId}/>
              </Route>
            </Switch>
          </>
        )}
        </Container>
    )
}

export default Coin;
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {useQuery} from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {fetchCoins} from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
        padding: 20px;
    }
    &:hover{
        a{
            color:${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color:${(props)=> props.theme.accentColor};
    font-size: 48px;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`

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


interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

//Link를 통해 state를 다음 화면에 넘겨줄 수 있음.

function Coins(){
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins); 
    const setMode = useSetRecoilState(isDarkAtom);
    return <Container>
        <Helmet>
            <title>코인</title>
        </Helmet>
        <Header>
            <ToggleModeBtn onClick={()=>setMode((pre)=>!pre)}>모드변경</ToggleModeBtn>
            <Title>코인</Title>
            <HomeBtn>
                <Link to={process.env.PUBLIC_URL + "/"}>홈으로</Link>
            </HomeBtn>
        </Header>
        {isLoading ? ("Loading...") : (
            <CoinsList>
                {data?.slice(0,100).map((coin) => <Coin key={coin.id}>
                    <Link to={{
                        pathname: process.env.PUBLIC_URL + `/${coin.id}`,
                        state: {name: coin.name}
                    }}>
                        <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                        {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </CoinsList>
        )}
    </Container>;
}

export default Coins;
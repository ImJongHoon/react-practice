//promise를 반환하는 fetch함수 작성
export function fetchCoins(){
    return fetch("https://api.coinpaprika.com/v1/coins")
    .then((res)=>res.json());
}

export function fetchCoinInfo(coinId:string){
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    .then((res)=>res.json());
}

export function fetchPriceData(coinId:string){
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    .then((res)=>res.json());
}

export function fetchCoinHistory(coinId:string){
    //const endDate = Math.floor(Date.now()/1000);
    //const startDate = endDate - (60*60*24*7);
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res)=>res.json());
}
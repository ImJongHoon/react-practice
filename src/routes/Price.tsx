import {useQuery} from "react-query";
import {fetchPriceData} from "../api";
import ApexChart from "react-apexcharts";

interface PriceProps{
    coinId: string;
}

interface Idata {
    id:            string;
    name:          string;
    symbol:        string;
    rank:          number;
    total_supply:  number;
    max_supply:    number;
    beta_value:    number;
    first_data_at: Date;
    last_updated:  Date;
    quotes:        Quotes;
}
interface Quotes {
    USD: Usd;
}
interface Usd {
    price:                  number;
    volume_24h:             number;
    volume_24h_change_24h:  number;
    market_cap:             number;
    market_cap_change_24h:  number;
    percent_change_15m:     number;
    percent_change_30m:     number;
    percent_change_1h:      number;
    percent_change_6h:      number;
    percent_change_12h:     number;
    percent_change_24h:     number;
    percent_change_7d:      number;
    percent_change_30d:     number;
    percent_change_1y:      number;
    ath_price:              number;
    ath_date:               Date;
    percent_from_price_ath: number;
}

function Price({coinId}:PriceProps){
    const {isLoading, data} = useQuery<Idata>([coinId, "priceData"], ()=>fetchPriceData(coinId));
    
    console.log(data);
    
    return <>
    {data===undefined ? "데이터 없음" :
    <ApexChart
            type="line"
            series={[
                {
                    name: "price",
                    data:  [data.quotes.USD.percent_change_1y,
                        data.quotes.USD.percent_change_30d,
                        data.quotes.USD.percent_change_7d,
                        data.quotes.USD.market_cap_change_24h,
                        data.quotes.USD.percent_change_12h,
                        data.quotes.USD.percent_change_6h,
                        data.quotes.USD.percent_change_1h,
                        data.quotes.USD.percent_change_30m,
                    ]
                }
            ]}
            options={{
                theme:{
                    mode: "dark"
                },
                chart:{
                    width:500,
                    height:500,
                    toolbar: {
                        show: false,
                    },

                },
                xaxis:{
                    labels:{
                        show:false
                    },
                    categories: ["1y","30d", "7d", "24h", "12h", "6h", "1h", "30m"],
                },
                tooltip:{
                    y:{
                        formatter: (value)=>`$ ${value.toFixed(2)}`
                    }
                }
            }}
        />}
    </>
}

export default Price;
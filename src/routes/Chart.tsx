import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import {useRecoilValue} from "recoil";
import { isDarkAtom } from '../atoms';

interface ChartProps{
    coinId: string;
}

interface IData{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart(props:ChartProps){
    const isDark = useRecoilValue(isDarkAtom);

    const { isLoading, data } = useQuery<IData[]>(["ohlcv", props.coinId], () =>
    fetchCoinHistory(props.coinId)
  );
    return <div>
        {isLoading ? "Loading chart..." : data===undefined ? "데이터 없음" : (
        <ApexChart
            type="candlestick"
            series={[
                {
                    data:  data.map((price) => {
                        return {x: price.time_open, y:[ price.open, price.high, price.low, price.close] }
                    })
                }
            ]}
            options={{
                chart: {
                    type: 'candlestick',
                    height: 350
                    },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                    },
                xaxis: {
                    type: 'datetime'
                    },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
                }}
        />
        )}
    </div>
}

export default Chart;
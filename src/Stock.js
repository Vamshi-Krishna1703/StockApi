import React from 'react';
import AreaPlot from 'react-plotly.js';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';


class Stock extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            grpData : [],
            stockChartXValues : [],
            stockChartYValues : [],
            changePercentage : '',
            change : '',
            price : ''
        }
    }

    componentDidMount()
    {
        this.fetchStock();
    }

    async fetchStock()
    {
        const curPointer = this;
        let vals = [];
        let xvals = [];
        let yvals = [];

        let change = '';
        let price = '';
        let chaPer = '';

        const api_key = '2877ZR7OGN5IP6E4';
        let company = 'AMZN';

        let sd = `https://finnhub.io/api/v1/stock/profile2?symbol=${company}&token=c9ufpvaad3i9vd5jlsu0`

        let call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${api_key}`;

        const url = `https://finnhub.io/api/v1/quote?symbol=${company}&token=c9ufpvaad3i9vd5jlsu0`;
        const response = await fetch(url);

        const res1 = await fetch(sd);
        if(res1.ok)
        {
            let tw = res1.json();
            // console.log(tw)
            tw.then(
                function(data)
                {
                    console.log(data)
                }
            )
        }

        fetch(call)
        .then(
            function(res){
                return res.json();
            }
        )
        .then(
            function(data){
                // console.log(data);

                for(var key in data['Time Series (Daily)'])
                {
                    let obj = {};
                    obj['name'] = key;
                    obj['value'] = data['Time Series (Daily)'][key]['1. open'];
                    
                    xvals.push(key);
                    yvals.push(data['Time Series (Daily)'][key]['1. open']);
                    
                    vals.push(obj);
                }

                console.log(vals);
                curPointer.setState({
                    grpData : vals,
                    stockChartXValues : xvals,
                    stockChartYValues : yvals
                })
            }
        )

        if(response.ok)
        {
            let temp = response.json();
            // console.log(response.json());
            // console.log(temp);
            temp.then (
                function(data)
                {
                    chaPer = data.dp;
                    change = data.d;
                    price = data.pc;
                    // console.log(price, chaPer, change)

                    curPointer.setState({
                        changePercentage : chaPer,
                        change : change,
                        price:price
                    })
                }
            )
        }
        else console.log(response.status)

    }

    render(){
        const cardinal = curveCardinal.tension(0.2);
        return (
            <div>
                <h2> Hello, react!</h2>
                {/* <p> X Values : {this.state.stockChartXValues}</p>
                <p> Y Values : {this.state.stockChartYValues}</p> */}

                <p> Price : {this.state.price} </p>
                <p> Change : {this.state.change} </p>
                <p> Change Percentage : {this.state.changePercentage} </p>
                <AreaPlot
                    data={[
                    {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'sccatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    ]}
                    layout={ {width: 1070, height: 720, title: 'An Amazon Plot'} }
                />
            </div>
        )
    }
}

export default Stock;
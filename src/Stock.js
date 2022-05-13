import React from 'react';
import AreaPlot from 'react-plotly.js';

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
            price : '',
            company : '',
            country : '',
            currency : ''
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

        let change = '', price = '', chaPer = '';

        let con = '', cur = '', com = '';

        const api_key = '2877ZR7OGN5IP6E4';
        const token = 'c9ufpvaad3i9vd5jlsu0'
        let company = 'AMZN';

        // stock details
        let sd = `https://finnhub.io/api/v1/stock/profile2?symbol=${company}&token=${token}`

        const res1 = await fetch(sd);
        if(res1.ok)
        {
            let tw = res1.json();
            // console.log(tw)
            tw.then(
                function(data)
                {
                    // console.log(data)
                    con = data.country;
                    cur = data.currency;
                    com = data.name;

                    curPointer.setState({
                        company : com,
                        country : con,
                        currency : cur
                    })
                }
            )
        }

        // stock history i.e. daily values
        let call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${api_key}`;

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

        // stock quotation
        const url = `https://finnhub.io/api/v1/quote?symbol=${company}&token=${token}`;
        const response = await fetch(url);

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
        return (
            <div>
                <h2> Hello, react!</h2>
                {/* <p> X Values : {this.state.stockChartXValues}</p>
                <p> Y Values : {this.state.stockChartYValues}</p> */}

                <p> Price : {this.state.price} </p>
                <p> Change : {this.state.change} </p>
                <p> Change Percentage : {this.state.changePercentage} </p>

                <p> Company : {this.state.company} </p>
                <p> Counry : {this.state.country} </p>
                <p> Currency : {this.state.currency} </p>
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
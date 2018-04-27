import React, { Component } from 'react'
import axios from 'axios'

function Printtext(props){

    const company = props.company;

    if(company.avgbool == 0)
    {    
        return (
            <div>
                    Company: {company.name} <br/>
                    {/*Date: {company.date} <br/>*/}
                    Volume: {company.volume} <br/>
                    Open: {company.open} <br/>
                    Close: {company.close} <br/>
            </div>
        )
    }
    else
    {
        return (
            <div>
                Company: {company.name} <br/>
                Average: {company.open} <br/>
            </div>
        )
    }
}

export default class Statspage extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            symbol: 'Input Company Symbol', //Default Symbol Text
            days: 'Input Positive Number', //Default Days Text
            search: 'average', //Default Search Text
            data: '',
            result: { //Data from Server
                name: "name",
                date: "date",
                open: "open",
                close: "close",
                volume: "volume",
                avgbool: 0
            },
            compare: {//Data from Server when calculating stocks less than LOW
                name: "name",
                date: "date",
                open: "open",
                close: "close",
                volume: "volume",
                avgbool: 0
            },
            renderFlag: 0
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.updateSubmit = this.updateSubmit.bind(this);
    }

    updateSymbol(event)
    {
        this.setState({symbol: event.target.value});
    }

    updateDays(event)
    {
        this.setState({days: event.target.value});
    }

    updateSearch(event)
    {
        this.setState({search: event.target.value});
        this.setState({renderFlag: 0});

    }

    updateSubmit(event)
    {
        var params = 'stock/' + this.state.search + '/' + this.state.days + '/' + this.state.symbol;

        if(this.state.search != 'average')
        {
            axios.get("http://localhost:1337/" + params).then((data)=>{
                    console.log(data.data[0]);
                    let result = {...this.state.result};
                    result.name = this.state.symbol;
                    result.open = data.data[0].open;
                    result.close = data.data[0].close;
                    result.date = data.data[0].date;
                    result.volume = data.data[0].volume;
                    result.avgbool = 0;
                    this.setState({result});
                })
        }

        else
        {
            axios.get("http://localhost:1337/" + params).then((data)=>{
                    console.log(data.data[0]);
                    let result = {...this.state.result};
                    result.name = this.state.symbol;
                    result.open = data.data[0].averagePrice;
                    result.avgbool = 1;
                    this.setState({result});
                })
        }

        this.setState({renderFlag: 1});

        event.preventDefault();
    }

    renderResults()
    {
        if(this.state.renderFlag)
        {
            return(
                <div>
                    <br/>
                    {this.state.search.toUpperCase()}: <Printtext company={this.state.result}/>
                                             
                </div>
            )
        };
    }

    renderLessThanTitle()
    {
        if(this.state.search == 'lowest')
        {
            return(
                <div>
                    <br/>
                    AVERAGE STOCKS LESS THAN {this.state.result.name.toUpperCase()}:                  
                    {this.stockLessThan("AAPL")}
                    {this.stockLessThan("MSFT")}       
                    {this.stockLessThan("AABA")}
                    {this.stockLessThan("ACN")}
                    {this.stockLessThan("ADP")}
                    {this.stockLessThan("FB")}
                    {this.stockLessThan("AMZN")} 
                    {this.stockLessThan("IBM")}
                    {this.stockLessThan("LMT")}
                </div>
            )
        }

    }
    stockLessThan(company)
    {
        if(this.state.search == 'lowest')
        {

            var params = 'stock/average/' + this.state.days + '/' + company;

            var avg = 0;
            axios.get("http://localhost:1337/" + params).then((data)=>{
                //console.log(data);
                //let compare = {...this.state.compare};
                //compare.open = data.data[0].averagePrice;    
                //this.setState({compare});
                this.setState({avg: data.data[0].averagePrice});
            })
            console.log(avg)
            if(this.state.result.open > this.state.avg)
            {
                return(
                    <div>
                        <li>{company}: {this.state.avg}</li>
                    </div>
                )
            }
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.updateSubmit}>

                    {/* Number Search Bar */}
                    Search the past: {' '}
                    <input type="numbers" 
                        style = {{
                            color: "grey"
                        }}

                        pattern = "[0-9]*"
                        inputmode = "numeric"
                        value = {this.state.days}
                        onChange = {this.updateDays.bind(this)}
                    />

                    {' '} Days for{' '}

                    {/* Dropdown Menu */}
                    <select name="stock" value = {this.state.search} onChange = {this.updateSearch.bind(this)}>
                        <option value="average">Average Stock</option>
                        <option value="highest">Highest Stock</option>
                        <option value="lowest">Lowest Stock</option>
                    </select>

                    <br/>
                    <br/>

                    {/* Search Bar */}
                    <input type="text" 
                        style = {{
                            color: "grey"
                        }}

                        value = {this.state.symbol}
                        onChange = {this.updateSymbol.bind(this)}
                    />

                    {/* Submit Button */}
                    <input type="submit" value="Submit"/> 
                </form>
        
                {this.renderResults()}
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'

function Printtext(props){

    const company = props.company;
  
    return (
        <div>
                Company: {company.name} <br/>
                Volume: {company.volume} <br/>
                Price: ${company.price} <br/>
                
        </div>
    )
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
            result: {
                name: "name",
                price: "price",
                volume: "volume"
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

        axios.get("http://localhost:1337/" + params).then((data)=>{
            console.log(data);
            let result = {...this.state.result};
            result.name = data.data.symbol;
            result.price = data.data.data[data.data.data.length-1].open;
            result.volume = data.data.data[data.data.data.length-1].volume;    
            this.setState({result});
        })

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

                <li>Highest Stock of Any Company (Past 10 Days)</li>
                <li>Average Stock of any Company (Past year)</li>
                <li>Lowest Stock of Any Company (Past year)</li>
                <li>List of Company IDs and Names with average stock less than lowest of any of the selected companies</li>
            
                {this.renderResults()}

            </div>
        )
    }
}

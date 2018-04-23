import React, { Component } from 'react'
import axios from 'axios'

export default class Statspage extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            symbol: 'Input Company Symbol',  //Default Symbol Text
            days: 'Input Positive Number', //Default Days Text
            search: 'average', //Default Search Text
            data: '' //Result
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
    }

    updateSubmit(event)
    {
        var params = '/stock/' + this.state.search + '/' + this.state.days + '/' + this.state.symbol;
        /*
        axios.get('localhost:1337' + params).then(function(result,error){
            this.setState({data: result})
            console.log(result);
        })
        */
        axios.get("http://localhost:1337/stock/today").then((data)=>{
            console.log(data);
        })
        //alert('You submitted: ' + params);
        event.preventDefault();
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

                    <br></br>
                    <br></br>

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
            </div>
        )
    }
}

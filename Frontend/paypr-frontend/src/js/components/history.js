import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class History extends Component {
  constructor(props)
  {
      super(props)
      this.state = {
        symbol: this.props.symbol,
        search: '1y',      
        result: [{}]
      };

      this.updateSubmit = this.updateSubmit.bind(this);
  }

  updateSearch(event)
  {
      this.setState({search: event.target.value});
  }


  updateSubmit(event)
  {
    this.setState({result: []});

    axios.get("https://api.iextrading.com/1.0/stock/"+this.state.symbol+"/chart/"+this.state.search).then((data)=>{
        console.log(data.data);

        var temp = this.state.result.slice();

        for(var i=0; i<data.data.length; i++)
        {
          temp.push(
            {
              name: this.state.symbol,
              open: data.data[i].open,
              close: data.data[i].close,
              volume: data.data[i].volume,
              high: data.data[i].high,
              low: data.data[i].low,
              date: data.data[i].date
            }

          ); 
        }

        this.setState({result: temp});

    })

    event.preventDefault();
  }

  render() {
  
    const columns = [{
      Header: 'Symbol',
      accessor: 'name'
    }, {
      Header: 'Open',
      accessor: 'open'
    }, {
      Header: 'Close',
      accessor: 'close'
    }, {
      Header: 'High',
      accessor: 'high'
    }, {
      Header: 'Low',
      accessor: 'low'
    }, {
      Header: 'Volume',
      accessor: 'volume'
    }, {
      Header: 'Date',
      accessor: 'date'
    }]
    
    return (
      <div>
        <form onSubmit={this.updateSubmit}>

          {/* Number Search Bar */}
          View Historical Data from: {' '}

          {/* Dropdown Menu */}
          <select name="stock" value = {this.state.search} onChange = {this.updateSearch.bind(this)}>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
              <option value="5y">5 Years</option>
              <option value="1m">1 Month</option>
              <option value="3m">2 Months</option>
              <option value="6m">6 Months</option>
              <option value="1d">1 Day</option>
          </select>
          {' '} ago {' '}              


          {/* Submit Button */}
          <input type="submit" value="Submit"/> 
        </form>

        <br/>

        <ReactTable
          data={this.state.result}
          columns={columns}
        />
      </div>
    )
  }
}

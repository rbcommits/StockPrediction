import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {IEXClient} from 'iex-api'
import * as _fetch from 'isomorphic-fetch'

export default class History extends Component {
  constructor(props)
  {
      super(props)
      this.state = {
        symbol: this.props.symbol,
        from: 'YearMonthDay as Number',
        to: 'YearMonthDay as Number',        
        result: [{ //Data from Server
          name: this.props.symbol,
          open: "",
          close: "",
          volume: "",
          high: "",
          low: "",
          date: ""
        }]
      };

      this.updateSubmit = this.updateSubmit.bind(this);
  }

  updateFrom(event)
  {
      this.setState({from: event.target.value});
  }

  updateTo(event)
  {
      this.setState({to: event.target.value});
  }

  updateSubmit(event)
  {
    const iex = new IEXClient(_fetch);
    var promise = iex.stockQuote(this.state.symbol).then(
      value => {
        console.log(value);
        
        let result = {...this.state.result};
        result.open = value.open;
      }.bind(this));

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
          <input type="numbers" 
              style = {{
                  color: "grey"
              }}

              pattern = "[0-9]*"
              inputmode = "numeric"
              value = {this.state.from}
              onChange = {this.updateFrom.bind(this)}
          />

          {' '} to: {' '}
          <input type="numbers" 
              style = {{
                  color: "grey"
              }}

              pattern = "[0-9]*"
              inputmode = "numeric"
              value = {this.state.to}
              onChange = {this.updateTo.bind(this)}
          />


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

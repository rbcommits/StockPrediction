import React, {Component} from 'react'

import {connect} from 'react-redux'

import data from '../../DB_dump/datalist.json'
import Tempdata from '../../DB_dump/datalist.json'
function Printtext(props) {
    props = props.company
    const company = props.symbol;
    var color = "green"
    var arrow = "glyphicon glyphicon-chevron-up"

    if (props.volume < 4000000) {
        color = "red"
        arrow = "glyphicon glyphicon-chevron-down"
    }
    return (
        <a href="a">
            <font color={color}>
                <i className={arrow}></i>
            </font>
            {props.symbol}
            | | {props.volume}
            | | ${props.price}
        </a>
    )
}

export class Sidebar extends Component {

    constructor(props)
    {
        
        super(props)
        
        this.state = {
            search: '', // Default Search Bar Text,
        };
    }

    componentDidMount = () => {
        //console.log("in CDM")
        //console.log(this.state)
        //this.setState({data: Tempdata})
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }

    render() {
        console.log("In cons")
        console.log(this.props.data)

        var filteredData = this.props.data.filter((results) => {
            return results
                .symbol
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1;
        });

        return (

            <div className="col-md-6 col-md-4 sidebar-nav" style={{padding:"0px"}}>
                <div className="col-sm-3 col-lg-2">
                    <nav className="navbar navbar-inverse navbar-fixed-side">
                        <div className="container">
                            <div className="navbar-header">
                                <button
                                    className="navbar-toggle"
                                    data-target=".navbar-collapse"
                                    data-toggle="collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="./">Companies</a>
                                {/* Search Bar */}
                                <input
                                    type="text"
                                    style={{
                                    color: "grey"
                                }}
                                    value={this.state.search}
                                    onChange={this
                                    .updateSearch
                                    .bind(this)}/>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    {filteredData.map((dataMember) => {
                                        return <li key={dataMember.symbol}> <Printtext  company={dataMember}/></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    //{
    //    data: { aapl: state.aapl }
    //}

    console.log(state);
    var data = []
    var stock_data = state.stock_state
    state.stock_state.symbols.forEach((symbol)=>{
        data.push({ symbol: symbol, price: stock_data[symbol].price, volume: stock_data[symbol].volume })
    })
    return {data: data}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

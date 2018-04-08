import React, {Component} from 'react'

import {connect} from 'react-redux'

import data from '../../DB_dump/test.json'

const c1 = {
    name: "Yahoo",
    price: 1161.55,
    delta: 1.29,
};

const c2 = {
    name: "Google",
    price: 11610.55,
    delta: -1.29,
};

const c3 = {
    name: "Facebook",
    price: 2540.09,
    delta: 2.01,
}

function getData(){

    var color = "green"
    var arrow = "glyphicon glyphicon-chevron-up"

    const last = data.length-1;
    var obj = data[last];

    if (obj.delta < 0)
    {
        color="red"
        arrow="glyphicon glyphicon-chevron-down"
    }

    return (
        <a href="a">
                <font color={color}><i class={arrow}></i></font> 
                {obj.name} |
                | {obj.delta} |
                | ${obj.price}
        </a>
    )
}


function Printtext(props){

    const company = props.company;
    var color = "green"
    var arrow = "glyphicon glyphicon-chevron-up"

    if (company.delta < 0)
    {
        color="red"
        arrow="glyphicon glyphicon-chevron-down"
    }
    return (
        <a href="a">
                <font color={color}><i class={arrow}></i></font> 
                {company.name} |
                | {company.delta} |
                | ${company.price}
        </a>
    )
}

export class Sidebar extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            search: 'search'
        };
    }

    updateSearch(event){
        this.setState({search: event.target.value});
    }

    render() {
        return (
            <div>
                <div class="overlay"></div>
                <div id="sidebar" class="active">

                    {/* Header */}
                    <div class="sidebar-header">
                        <div id="close-sidebar">
                            <i class="glyphicon glyphicon-chevron-down"></i>
                        </div>
                        <h2>Companies</h2>

                        <input type="text" 
                            style = {{
                                color: "black"
                            }}

                            value = {this.state.search}
                            onChange = {this.updateSearch.bind(this)}
                        />

                    </div>

                    
                    {/* Links */}
                    <ul>
                        <li><Printtext company={c1}/></li>

                        <li><Printtext company={c2}/></li>

                        <li><Printtext company={c3}/></li>

                        <li><getData/></li> {/*does not show anything?*/}

                        {/*does show something*/}
                        {
                            data.map(
                                function(){
                                    const last = data.length-1;
                                    var obj = data[last];
                                    return <li>{obj.name}</li>;
                                }
                            )
                        }

                    </ul>

                </div>

                <div id="content"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

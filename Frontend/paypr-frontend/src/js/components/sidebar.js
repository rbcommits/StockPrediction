import React, {Component} from 'react'

import {connect} from 'react-redux'

import data from '../../DB_dump/datalist.json'

function Printtext(props){

    const company = props.company;
    var color = "green"
    var arrow = "glyphicon glyphicon-chevron-up"

    if (company.volume < 4000000)
    {
        color="red"
        arrow="glyphicon glyphicon-chevron-down"
    }
    return (
        <a href="a">
                <font color={color}><i class={arrow}></i></font> 
                {company.name} |
                | {company.volume} |
                | ${company.price}
        </a>
    )
}

export class Sidebar extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            search: '' // Default Search Bar Text
        };
    }

    updateSearch(event){
        this.setState({search: event.target.value});
    }

    render() {
        let filteredData = data.filter(
            (filter) => {
                return filter.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

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

                        {/* Search Bar */}
                        <input type="text" 
                            style = {{
                                color: "grey"
                            }}

                            value = {this.state.search}
                            onChange = {this.updateSearch.bind(this)}
                        />

                    </div>

                    
                    {/* Links */}
                    <ul>            
                        {
                            filteredData.map((dataMember)=>
                                {
                                    return <li><Printtext company={dataMember}/></li>
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

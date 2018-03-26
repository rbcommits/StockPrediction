import React, {Component} from 'react'

import {connect} from 'react-redux'

export class Sidebar extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            //set state here
        }
    }
    render() {
        return (
            <div>
                <div class="overlay"></div>
                <div id="sidebar" class="active">
                    <div class="sidebar-header">
                        <div id="close-sidebar">
                            <i class="glyphicon glyphicon-chevron-left"></i>
                        </div>
                        <h2>Sidebar</h2>
                    </div>
                    <ul>
                        <li>
                            <a href="a">
                                <i class="glyphicon glyphicon-link"></i>
                                Link
                            </a>
                        </li>
                        <li>
                            <a
                                href="#submenu"
                                class="collapsed"
                                data-toggle="collapse"
                                aria-expanded="false">
                                <i class="glyphicon glyphicon-link"></i>
                                Link</a>
                            <ul class="list-unstyled collapse" id="submenu" aria-expanded="false">
                                <li>
                                    <a href="a">
                                        <i class="glyphicon glyphicon-link"></i>
                                        Link</a>
                                </li>
                                <li>
                                    <a href="a">
                                        <i class="glyphicon glyphicon-link"></i>
                                        Link</a>
                                </li>
                                <li>
                                    <a
                                        href="#submenu2"
                                        class="collapsed"
                                        data-toggle="collapse"
                                        aria-expanded="false">
                                        <i class="glyphicon glyphicon-link"></i>
                                        Link</a>
                                    <ul class="list-unstyled collapse" id="submenu2" aria-expanded="false">
                                        <li>
                                            <a href="a">
                                                <i class="glyphicon glyphicon-link"></i>
                                                Link</a>
                                        </li>
                                        <li>
                                            <a href="a">
                                                <i class="glyphicon glyphicon-link"></i>
                                                Link</a>
                                        </li>
                                        <li>
                                            <a href="a">
                                                <i class="glyphicon glyphicon-link"></i>
                                                Link</a>
                                        </li>
                                        <li>
                                            <a href="a">
                                                <i class="glyphicon glyphicon-link"></i>
                                                Link</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="a">
                                        <i class="glyphicon glyphicon-link"></i>
                                        Link</a>
                                </li>
                                <li>
                                    <a href="a">
                                        <i class="glyphicon glyphicon-link"></i>
                                        Link</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="a">
                                <i class="glyphicon glyphicon-link"></i>
                                Link</a>
                        </li>
                        <li>
                            <a href="a">
                                <i class="glyphicon glyphicon-link"></i>
                                Link</a>
                        </li>
                    </ul>
                    <hr/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Restinguet citius,
                        si ardentem acceperit. Itaque eos id agere.</p>
                    <hr/>

                </div>
                <div id="content"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

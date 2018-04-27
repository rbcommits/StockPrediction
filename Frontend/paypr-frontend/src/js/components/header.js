import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <div className="row" style={{margin: "0px"}}>
                <div className="col-md-12" style={{padding:"0px"}}>
                    <nav className="navbar navbar-default custom-header">
                        <div className="container-fluid">
                            <div className="navbar-header"><a className="navbar-brand" href="REPLACE_LINKK"><img className="img-responsive header-logo" src="assets/img/KD-White.png" width="auto" height="auto" /><span className="header-span" >PayPr</span>  </a>
                                <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="REPLACE_LINKKnavbar-collapse"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                            </div>
                            <div className="collapse navbar-collapse" id="navbar-collapse">
                                <ul className="nav navbar-nav links">
                                    <li role="presentation"><a href="REPLACE_LINKK">Overview </a></li>
                                    <li role="presentation"><a href="REPLACE_LINKK">Surveys </a></li>
                                    <li role="presentation"><a href="REPLACE_LINKK"> Reports</a></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="REPLACE_LINKK"> <span className="caret"></span><img src="assets/img/avatar.jpg" className="dropdown-image" /></a>
                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <li role="presentation"><a href="REPLACE_LINKK">Settings </a></li>
                                            <li role="presentation"><a href="REPLACE_LINKK">Payments </a></li>
                                            <li role="presentation" className="active"><a href="REPLACE_LINKK">Logout </a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
    )
  }
}

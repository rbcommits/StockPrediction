import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <div class="row">
        <div class="col-md-12">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand hidden" href="a"> </a>
                        <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="navcol-1">
                        <ul class="nav navbar-nav main-nav">
                            <li role="presentation">
                                <a href="a" id="home">Home </a>
                            </li>
                            <li role="presentation">
                                <a href="a">About </a>
                            </li>
                            <li role="presentation">
                                <a href="a">Contact </a>
                            </li>
                            <li role="presentation">
                                <a href="a">Sitemap </a>
                            </li>
                            <li role="presentation">
                                <a href="a">Declaimer </a>
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

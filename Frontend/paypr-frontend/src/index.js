import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './js/registerServiceWorker';

import Header from './js/components/header'
import Sidebar from './js/components/sidebar'
import Statspage from './js/components/statspage'
import History from './js/components/history'

import styles from './css/styles.min.css'


import store from './js/redux/store';
import {Provider} from "react-redux";
import StockCard from './js/components/stock-card'
ReactDOM.render(

<Provider store={store}>
<div> <div className="container">
    {/*Header navbar goes here*/}
    <Header />
    <div className="row body-flex" style={{margin:"0px"}}>
        {/*Sidebar navbar goes here*/}
        <Sidebar />
        <div className="col-md-6 col-md-fill" style={{padding:"0px"}}>
            {/* Google cards and other queries pages go here */}
            <StockCard />
        </div>
    </div>
</div> </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();

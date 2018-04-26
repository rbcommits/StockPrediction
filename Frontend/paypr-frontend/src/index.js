import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './js/registerServiceWorker';

import Header from './js/components/header'
import Sidebar from './js/components/sidebar'
import Statspage from './js/components/statspage'
import History from './js/components/history'

import styles from './css/styles.min.css'
import bootstrap from './bootstrap/css/bootstrap.min.css'
import store from './js/redux/store';
import {Provider} from "react-redux";

ReactDOM.render(

<Provider store={store}>
    <div>
        <div class="container">
            <Header/>
            <div class="row">
                <div class="col-md-6 col-md-4">
                    {/*<Sidebar/>*/}
                </div>

            </div>
        </div>

        <div class="col-md-6 col-md-12">
            <div class="row">
                <div class="col-md-12">
                    <p class="dashboard-greeting">Queries</p>
                    <Statspage/>
                    {/*<History symbol={"AAPL"}/>*/}
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-md-4"></div>
                <div class="col-md-12 col-md-4"></div>
                <div class="col-md-12 col-md-4"></div>
            </div>
            <div class="row"></div>
        </div>
    </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();

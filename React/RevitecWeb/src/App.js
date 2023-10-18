import React, { useEffect, useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import Test from './Test';
import WebRoutes from './WebRoutes';

export default function App(props) {

    /********** Render **********/
    const rRoutes = () => <div className="App"> <WebRoutes /> </div>;
    const rTest = <Test method="" url="" body={{}} />;

    return <>
        <Navbar />              

        {
            window.ENV.Test ? rTest : rRoutes()
        }
    </>;
}

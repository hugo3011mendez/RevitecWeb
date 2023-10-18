import React from 'react';
import { Route, Routes } from 'react-router-dom';
// pages
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

/**
 * Routes URLs to elements.
 */
export default function WebRoutes(props) {

    return <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="*" element={<PageNotFound />} />
    </Routes>;
}

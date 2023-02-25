import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Detailpage from './components/recipe-details/recipe-details.component'
import Home from './components/home/home-component';

export default function Router(){
    return(
        <BrowserRouter>
     <Routes>
      <Route index element={<Home />} />
        <Route path='/detail' element={<Detailpage />} />
        </Routes>
      </BrowserRouter>
    )
}
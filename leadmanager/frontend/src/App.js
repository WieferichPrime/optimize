import * as React from 'react';
import './App.scss';
import Header from './components/layout/Heaader';
import Main from './pages/Main/Main';
import {Route,Routes} from "react-router-dom";
import NotMatch from './pages/NotMatch.js';
import Validation from './pages/Validation/Validation';
import Calculation from './pages/Calculation/Calculation';
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
      <div className='container'>
        <div className="App">
          <Header></Header>
          <Routes>
            <Route path='/' element={<Tasks/>}></Route>
            <Route path='/input' element={<Main/>}></Route>
            <Route path='/validation' element={<Validation></Validation>}></Route>
            <Route path='/calculating' element={<Calculation></Calculation>}></Route>
            <Route path='*' element={<NotMatch/>}></Route>
          </Routes>
        </div>
      </div>
  );
}

export default App;

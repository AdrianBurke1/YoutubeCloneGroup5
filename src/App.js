import Header from './Header';
import About from './page/About';
import {Route, Routes} from "react-router-dom"
import React from 'react';
import VideoPage from './VideoPage'
import './App.css';

function App() {
  return (
   <>

    <div className="container">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/About" element={<About />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
      </Routes>
      </div>
   </>
  );
}

export default App;





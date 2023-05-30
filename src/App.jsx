import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import ReviewList from './components/ReviewList'

function App() {

  return (
    <BrowserRouter>
      <>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/reviews" element={<ReviewList />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App

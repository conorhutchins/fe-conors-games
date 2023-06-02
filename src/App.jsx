import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import ReviewList from './components/ReviewList'
import ReviewCard from './components/ReviewCard'

function App() {

  return (
    <BrowserRouter>
      <>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:reviewId" element={<ReviewCard />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App

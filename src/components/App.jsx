import React from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, redirect } from 'react-router-dom'
import Home from './reactComponents/Home'
import About from './reactComponents/About'
import Contact from './reactComponents/Contact'
import Article from './reactComponents/Article'

export default function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <nav>
          <h1><Link exact="true" to="/">My Articles</Link></h1>

          <ul>
            <li><NavLink exact="true" to="/">Home</NavLink></li>
            <li><NavLink exact="true" to="/about">About</NavLink></li>
            <li><NavLink exact="true" to="/contact">Contact</NavLink></li>
          </ul>

        </nav>

        <main>

          <Routes>
            <Route path='/' exact="true" element={<Home />} />
            <Route path='/about' exact="true" element={<About />} />
            <Route path='/contact' exact="true" element={<Contact />} />
            <Route path="/articles/:id" exact="true" element={<Article />} />
            <Route path="*" element={redirect("/")} />
          </Routes>

        </main>
      </BrowserRouter>
    </div>
  )
}
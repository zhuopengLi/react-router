import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Contact() {
  const queryString = useLocation().search

  const queryParams = new URLSearchParams(queryString)
  const name = queryParams.get("name")

  return (
    <div>
      <h2>Hey{name}, Contact us here...</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam pariatur beatae ratione minima maiores numquam placeat, voluptatum molestiae. Facilis laudantium fugiat numquam sed voluptates, porro harum quibusdam ut? Cupiditate, iure.</p>
    </div>
  )
}
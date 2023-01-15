import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from './subComponents/useFetch'

export default function Home() {

  const { data: articles, isPending, error } = useFetch("https://bright-tux.cyclic.app/react-router")

  return (
    <div className='home'>
      <h2>Articles</h2>

      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {articles && articles.map(article => {
        return (
          <div key={article.id} className="card">
            <h3>{article.title}</h3>
            <p>By {article.author}</p>
            <Link exact="true" to={`/articles/${article.id}`}>Read more...</Link>
          </div>
        )
      })}

    </div>
  )
}
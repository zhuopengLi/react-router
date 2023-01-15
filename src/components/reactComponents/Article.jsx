import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import useFetch from './subComponents/useFetch'

export default function Article() {
    const { id } = useParams()
    const url = "https://bright-tux.cyclic.app/react-router/" + id
    const { data: article, isPending, error } = useFetch(url)
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                navigate("/")
            }, 2000);
        }
    }, [error, navigate])


    return (
        <div>
            {isPending && <div>Loading</div>}
            {error && <div>{error}</div>}
            {!isPending && !error && article && (
                <div>
                    <h2>{article.title}</h2>
                    <p>By {article.author}</p>
                    <p>{article.body}</p>
                </div>
            )}

        </div>
    )
}
import { useState, useEffect, useCallback } from 'react'

export default function useFetch(url) {

    const [data, setData] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('')

    let errMsg = "background: red; color: white; border-radius: 5px; font-weight:bolder"
    let msg = "background: aquamarine; color: #1f2d3d; border-radius: 5px"

    const fetchData = useCallback(async controller => {
        setIsPending(true)
        console.log(`%c Fetch %cSending GET request`, msg)

        try {
            const res = await fetch(url, { signal: controller.singal })
            if (!res.ok) {
                throw new Error(res.status)
            }
            const json = await res.json()

            setData(json)
            setError('')
        } catch (err) {
            if (err.name === "AbortError") {
                setIsPending(false)
                setError("Aborted")
                console.log("%c ERROR %cFetch aborted", errMsg)
            } else {
                setIsPending(false)
                setError("Could not fetch data")
                console.log(`%c ERROR %c${err.message}`, errMsg)
            }
        }

        setIsPending(false)

    }, [url])

    useEffect(() => {
        const controller = new AbortController()

        fetchData(controller)

        return () => {
            controller.abort()
        }
    }, [fetchData])

    return { data, isPending, error }
}
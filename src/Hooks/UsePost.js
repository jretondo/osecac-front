import { useState, useEffect } from 'react'

export const UsePost = (url, datos, call, secure) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true)
            setData([])
            setError(null)
            try {
                let res
                if (secure) {
                    res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                        },
                        body: JSON.stringify(datos),
                    })
                } else {
                    res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(datos),
                    })
                }
                let data = await res.json()
                const status = parseInt(data.status)
                console.log(`status`, status)
                if (status === 200) {
                    setData(data.body)
                    setLoading(false)
                } else {
                    setError(data.body)
                    setLoading(false)
                }
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        if (url) {
            fetchResources()
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [call])

    return { data, loading, error }
}
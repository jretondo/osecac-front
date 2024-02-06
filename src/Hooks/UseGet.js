import { useState, useEffect } from 'react'

export const useGet = (url, call) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true)
            setData([])
            setError(null)
            try {
                let res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                    },
                })
                let data = await res.json()
                const status = parseInt(data.status)
                if (status === 200) {
                    setData(data.body)
                    setLoading(false)
                } else {
                    setError(true)
                    setLoading(false)
                }
            } catch (error) {
                setError(true)
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
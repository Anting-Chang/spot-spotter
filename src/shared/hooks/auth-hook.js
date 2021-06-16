import {useCallback, useEffect, useState} from "react";

let logoutTimer;

export const useAuth = () => {
    console.log('app is rerendering')

    const [token, setToken] = useState(false)
    const [tokenTimeOut, setTokenTimeOut] = useState()
    const [userId, setUserId] = useState()

    /**
     * put userId, token, and expirationDate in it
     * @type {function(*=, *=, *=): void}
     */
    const login = useCallback((uid, token, expirationDate) => {
        console.log(uid)
        setUserId(uid)
        setToken(token)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenTimeOut(tokenExpirationDate)
        localStorage.setItem('userData', JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpirationDate.toISOString()
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(token)
        setTokenTimeOut(null)
        setUserId(null)
        localStorage.removeItem('userData')

    }, [])

    // auto timeout login
    useEffect(() => {
        console.log('timeout reached')
        if (token && tokenTimeOut) {
            const remainingTime = tokenTimeOut.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    },[token, logout, tokenTimeOut])

    // auto login
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.userId, storedData.token)
        }
    }, [login])

    return {
        token,
        login,
        logout,
        userId
    }
}

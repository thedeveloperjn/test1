import { useState, useCallback } from 'react'

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

    const openAuthDialog = useCallback(() => {
        setIsAuthDialogOpen(true)
    }, [])

    const closeAuthDialog = useCallback(() => {
        setIsAuthDialogOpen(false)
    }, [])

    const login = useCallback((email: string, password: string) => {
        // Here you would typically make an API call to authenticate the user
        console.log('Logging in with:', email, password)
        setIsLoggedIn(true)
    }, [])

    const signup = useCallback((email: string, password: string) => {
        // Here you would typically make an API call to register the user
        console.log('Signing up with:', email, password)
        setIsLoggedIn(true)
    }, [])

    const logout = useCallback(() => {
        // Here you would typically make an API call to log out the user
        setIsLoggedIn(false)
    }, [])

    return {
        isLoggedIn,
        isAuthDialogOpen,
        openAuthDialog,
        closeAuthDialog,
        login,
        signup,
        logout,
    }
}


import {db} from '../../Firebase/config'
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    signOut, 
    updateEmail
} from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkCancelled() {
        if(cancelled) {
            return
        }
    }

    const createUser = async (data) => {
        checkCancelled()

        setLoading(true)
        setError(null)

        try{
            const {user} = await createUserWithEmailAndPassword (
                auth, 
                data.displayEmail,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres!"
            } else if(error.message.includes("email-already-in-use")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    const logout = () => {
        checkCancelled()
        signOut(auth)
    }

    const login = async(data) => {
        checkCancelled()

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.displayEmail, data.password)
            setLoading(false)

        } catch(error) {
            let systemErrorMessage

            if(error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado"
            } else if(error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    // Para evitar o vazamento de memória
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth, createUser, error, loading,logout, login
    }
}
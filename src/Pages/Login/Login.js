import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../Components/Hooks/useAuthentication'

const Login = () => {

    const [displayEmail, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {login, error: authError, loading} = useAuthentication()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setError("")

        const user = {
            displayEmail,
            password
        }

        const res = await login(user)
        console.log(res)
    }

    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça login para começar a postar</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input 
                        type="email" 
                        name="displayEmail"
                        placeholder='Digite seu e-mail'
                        value={displayEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        required  
                    />
                </label>

                <label>
                    <span>Senha: </span>
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Insire sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {!loading && <button className='btn'>Entrar</button>}
                {loading && (
                    <button className='btn' disabled>
                        Carregando...
                    </button>
                )}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Login
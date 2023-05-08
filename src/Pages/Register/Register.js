import { useAuthentication } from '../../Components/Hooks/useAuthentication'
import styles from './Register.module.css'
import { useState, useEffect } from 'react'

const Register = () => {

    const [displayName, setDisplayName] = useState("")
    const [displayEmail, setDisplayEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")
    const {createUser, error: authError, loading} = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = {
            displayName,
            displayEmail,
            password,
        }

        if(password !== passwordConfirm) {
            setError("As senhas precisam ser iguais!")
            return
        }

        const res = await createUser(user)

        console.log(res)
    }

    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    },[authError])
    
    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>
            <p>Crie sua conta e compartilhe suas histórias</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome: </span>
                    <input 
                        type='text'
                        name='displayName'
                        placeholder='Nome do usuário'
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>E-mail: </span>
                    <input 
                        type="email" 
                        name='displayEmail'
                        placeholder='Digite seu e-mail'
                        value={displayEmail}
                        onChange={(e) => setDisplayEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>Senha: </span>
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Insira sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <span>Confirmação da senha: </span>
                    <input 
                        type="password" 
                        name="passwordConfirm"
                        placeholder='Confirme sua senha'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}    
                        required
                    />
                </label>
                {!loading && <button className='btn' type="submit">Cadastrar</button>}
                {loading && <button className='btn' disabled>Enviando...</button>}
               {error && <p className='error'>{error}</p>} 
            </form>
        </div>
    )
}

export default Register
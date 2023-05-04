import styles from './Register.module.css'
import { useState, useEffect } from 'react'

const Register = () => {

    const [displayName, setDisplayName] = useState("")
    const [displayEmail, setDisplayEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPassWordConfirm] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        setError("")

        const user = {
            displayName,
            displayEmail,
            password
        }

        if(password !== passwordConfirm) {
            setError("As senhas precisam ser iguais!")
            return
        }

        console.log(user)
    }
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
                        type="text" 
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
                        onChange={(e) => setPassWordConfirm(e.target.value)}    
                        required
                    />
                </label>
                <button className='btn' type="submit">Cadastrar</button>
               {error && <p className='error'>{error}</p>} 
            </form>
        </div>
    )
}

export default Register
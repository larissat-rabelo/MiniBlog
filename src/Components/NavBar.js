import styles from './NavBar.module.css'
import { useAuthValue } from '../Context/Context'
import { useAuthentication } from './Hooks/useAuthentication'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    const {user} = useAuthValue()
    const {logout} = useAuthentication()

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.linksList}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>
                        Home
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({isActive}) => (isActive? styles.active : "")}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : "")}>
                                Sign up
                            </NavLink>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create" className={({isActive}) => (isActive? styles.active : "")}> 
                                New Post
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="dashboard" className={({isActive}) => (isActive? styles.isActive : "")}> 
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>
                        About
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Log out</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar
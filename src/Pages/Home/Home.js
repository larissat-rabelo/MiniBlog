import styles from './Home.module.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocs } from '../../Components/Hooks/useFetchDocs'
import PostDetail from '../../Components/PostDetail/PostDetail'



const Home = () => {
    const navigate = useNavigate()
    const [query,setQuery] = useState("")
    const {documents: posts, loading} = useFetchDocs("posts")

    const handleSubmit = (e) => {
        e.preventDefault()

        if(query) {
            return navigate(`/search?q=${query}`)
        }
    }

    return (
        <div className={styles.home}>
            <h1>Posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input 
                    type="text" 
                    placeholder='busque por tags...'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='btnDark'>Pesquisar</button>
            </form>
            {loading && <p>Carregando...</p>}
            {posts && posts.map((post) => (
                <h3>{<PostDetail key={post.id} post={post}/>}</h3>
            ))}
            <div>
                <h1>Posts</h1>
                {posts && posts.length === 0 && (
                    <div>
                        <p>Não foi encontrado nenhum post</p>
                        <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
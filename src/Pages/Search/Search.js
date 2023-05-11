import styles from './Search.module.css'
import { useFetchDocs } from '../../Components/Hooks/useFetchDocs'
import { useQuery } from '../../Components/Hooks/useQuery'
import PostDetail from '../../Components/PostDetail/PostDetail'
import { Link } from 'react-router-dom'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")
    const {documents: posts} = useFetchDocs("posts", search)
    
    return (
        <div className={styles.searchContainer}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 (
                    <div className={styles.noPosts}>
                        <p>Não foram encontrads posts de acordo com a sua busca</p>
                        <Link to="/" className="btn btnDark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post}/>
                ))}
            </div>
            <p>{search}</p>
        </div>
    )
}

export default Search
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'
import {useAuthValue} from '../../Context/Context'
import {useFetchDocs} from '../../Components/Hooks/useFetchDocs'
import { useDeleteDocument } from '../../Components/Hooks/useDeleteDocument'

const Dashboard = () => {
    const {user} = useAuthValue()
    const uid = user.uid
    const {documents: posts} = useFetchDocs("posts", null, uid)
    const {deleteDocument} = useDeleteDocument("posts")

    return (
        <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
            <div className={styles.noPosts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
                Criar primeiro post
            </Link>
            </div>
        ) : (
            <div className={styles.postHeader}>
            <span>Título</span>
            <span>Ações</span>
            </div>
        )}

        {posts &&
            posts.map((post) => (
            <div className={styles.postRow} key={post.id}>
                <p>{post.title}</p>
                <div className={styles.actions}>
                <Link to={`/posts/${post.id}`} className="btn btnOutline">
                    Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btnOutline">
                    Editar
                </Link>
                <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btnDanger"
                >
                    Excluir
                </button>
                </div>
            </div>
            ))}
        </div>
  );
};

    


export default Dashboard
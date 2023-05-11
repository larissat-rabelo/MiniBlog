import styles from './EditPost.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../Context/Context'
import { useUpdateDoc } from '../../Components/Hooks/useUpdateDoc'
import { useFetchDocument } from '../../Components/Hooks/useFetchDocument'

const EditPost = () => {
    const {id} = useParams()
    const {document: post} = useFetchDocument("posts", id)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")

    useEffect(() => {
      if(post) {
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)

        const textTags = post.tagsArray.join(", ")
        setTags(textTags)
      }
    }, [post])
    
    const {user} = useAuthValue()
    const {updateDocument, response} = useUpdateDoc("posts")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")

        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL")
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        if(!title || !image || !tags || !body ) {
            setFormError("Favor preencher todos os campos!")
        }

        if(formError) return

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data)
        navigate("/dashboard")
    }

    return (
        <div className={styles.editPost}>
            {post && (
                <>
                    <h2>Editar post {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título: </span>
                            <input 
                                type='text'
                                name='title'
                                placeholder='Título da publicação'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                required
                            />
                        </label>
                        <label>
                            <span>URL da imagem</span>
                            <input 
                                type="text" 
                                name='image'
                                placeholder='Insira a URL da sua imagem'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                                required    
                            />
                        </label>
                        <p className={styles.previewTitle}>Imagem atual: </p>
                        <img  
                            src={post.image}
                            alt={post.title}
                            className={styles.imageReview}
                        />
                        <label>
                            <span>Conteúdo: </span>
                            <textarea 
                                name="body" 
                                placeholder='Insira o conteúdo do seu post'
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                                required
                            ></textarea>
                        </label>
                        <label>
                            <span>Tags: </span>
                            <input 
                                type="text" 
                                name='tags'
                                placeholder='Insira suas tags separadas por vírgula'
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                                required
                            />
                        </label>
                        {!response.loading && <button className='btn'>Editar</button>}
                        {response.loading && (
                            <button className='btn' disabled>Enviando...</button>
                        )}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost
import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../Context/Context'
import { useInsertDocument } from '../../Components/Hooks/useInsertDocument'

const CreatePost = () => {

    const [title,setTitle] = useState("")
    const [image,setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")
    const {insertDocument, response} = useInsertDocument("posts")
    const [message,setMessage] = useState("")
    const navigate = useNavigate()

    const {user} = useAuthValue()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")

        try {
            new URL(image)
        } catch (error) {
            return setFormError("A imagem precisa ser uma URL.")
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        if(!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos")
        }

        insertDocument ({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        })
        navigate("/")
    }
    
    return (
        <div className={styles.createPost}>
            <h2>Create new post</h2>
            <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título: </span>
                    <input 
                        type="text" 
                        name="title"
                        placeholder='Pense num bom título'
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
                        placeholder='Insira a URL da imagem que você quer postar'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        required
                    />
                </label>
                <label>
                    <span>Conteúdo: </span>
                    <textarea 
                        name="body" 
                        placeholder='Insira o conteúdo do post'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        required>
                    </textarea>
                </label>
                <label>
                    <span>Tags: </span>
                    <input 
                        type="text"
                        name='tags'
                        placeholder='Insira as tags separadas por vírgula'
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                        required 
                    />
                </label>
                {!response.loading && <button className='btn'>Postar</button>}
                {response.loading && (
                    <button className='btn' disabled>
                        Postando...
                    </button>
                )}
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost
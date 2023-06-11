import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    // validate image URL

    try {
      new URL(image);
    } catch (err) {
      setFormError('A imagem precisa ser uma URL');
    }

    // create tags array
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    // check all values

    if (!title || !image || !tags || !body) {
      setFormError('Preencha todos os campos!');
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate('/');
  };

  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Escreva sobre o que quiser e compartilhe</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input
            type="text"
            name="title"
            placeholder="Escreva o titulo"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>url da Imagem</span>
          <input
            type="text"
            name="image"
            placeholder="Insira a url de uma imagem"
            required
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo</span>
          <textarea
            name="body"
            placeholder="Insira o texto do post"
            required
            onChange={(e) => setBody(e.target.value)}
            value={body}
           />
        </label>
        <label>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira as tags do post separadas por vírgula"
            required
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button disabled className="btn">
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;

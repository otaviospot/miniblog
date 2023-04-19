import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o mini <span>blog</span>
      </h2>
      <p>Projeto consiste em um blog feito com react e firebase</p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;

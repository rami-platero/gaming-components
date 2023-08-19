import styles from './notFound.module.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className={styles.notFound}>
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <p>The page you were looking for does not exist.</p>
        <Link to="/">Return to Home</Link>
    </main>
    )
}

export default NotFound
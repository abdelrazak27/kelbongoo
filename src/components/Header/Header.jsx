import styles from './Header.module.css';
import logoImage from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/admin' ? (
                <Link to="/">
                    <div className={styles.notificationContainer}>
                        <p>VOIR LA VUE CATALOGUE (CLIENT)</p>
                    </div>
                </Link>
            ) : (
                <Link to="/admin">
                    <div className={styles.notificationContainer}>
                        <p>VOIR LA VUE ADMINISTRATEUR</p>
                    </div>
                </Link>
            )}
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img src={logoImage} alt="" className={styles.logo} />
                </Link>
            </div>
        </>
        
    )
}

export default Header
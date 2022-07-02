import styles from '../styles/Navbar.module.css'
import {Link} from 'react-router-dom'
const Navbar = (props: any)=>{
    return (
        <nav className={styles.container}>
            <Link to='/'><div  className={styles.brand}>Net-pilot</div></Link>
            <Link to='/playground'><div className={styles.playground}>PlayGround</div></Link>
        </nav>
    )
}

export default Navbar;
import {Link} from 'react-router-dom';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../pages/Home/userSlice';

import styles from './Navigation.module.scss';

function Navigation() {
  const { isAuthorized, userName } = useAppSelector(selectUser);
  return (
    <nav className={styles.container}>
      <div className={styles.user}>
        <FontAwesomeIcon icon={faUser} className={styles.icon}/>
        <span className="font-bold">{isAuthorized ? userName : "Guest"}</span>
      </div>
      <div className={styles.user}>
        <Link to="/" className={styles.user}>Home</Link>
        {isAuthorized ? <Link to="/contacts" className={styles.user}>Contacts</Link>: null}
      </div>
    </nav>
  )
}

export { Navigation };
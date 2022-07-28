import styles from './header.module.css';
import styles__caption from './__caption/header__caption.module.css';

function Header(props) {

  return (
    <header className={ `${props.classes} ${styles.s}` }>
      <h1 className={ styles__caption.s }>Currency converter</h1>
    </header>
  );
}

export default Header;

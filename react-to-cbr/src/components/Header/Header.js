import './header.css';
import './__caption/header__caption.css';

function Header(props) {

  return (
    <header className={`${props.classes} header`}>
      <h1 className="header__caption">Currency converter</h1>
    </header>
  );
}

export default Header;

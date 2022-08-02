import Header from '../header/header';
import Main from '../main/main';
import Footer from '../footer/footer';

import styles from './app.module.css';
import styles__header from './__header/app__header.module.css';

function App() {
  return (
    <div className={ styles.s }>
      <Header classes={ styles__header.s }></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;

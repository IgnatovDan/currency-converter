import Converter from "../converter/converter";

import styles from './main.module.css';
import styles__converter from './__converter/main__converter.module.css';

function Main() {
  return (
    <main className={ styles.s }>
      <Converter classes={ styles__converter.s }></Converter>
    </main>
  );
}

export default Main;

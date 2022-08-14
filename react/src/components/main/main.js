import ConverterWithSources from "../converter-with-sources/converter-with-sources";

import styles from './main.module.css';
import styles__converter from './__converter/main__converter.module.css';

function Main() {
  return (
    <main className={ styles.s }>
      <ConverterWithSources classes={ styles__converter.s }></ConverterWithSources>
    </main>
  );
}

export default Main;

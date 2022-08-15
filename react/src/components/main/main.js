import ConverterWithRateSources from "../converter-with-rate-sources/converter-with-rate-sources";

import styles from './main.module.css';
import styles__converter from './__converter/main__converter.module.css';

function Main() {
  return (
    <main className={ styles.s }>
      <ConverterWithRateSources classes={ styles__converter.s }></ConverterWithRateSources>
    </main>
  );
}

export default Main;

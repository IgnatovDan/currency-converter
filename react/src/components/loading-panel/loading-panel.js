import styles from './loading-panel.module.css';
import styles__spinner from './__spinner/loading-panel__spinner.module.css';

export default function LoadingPanel({ ...rest }) {
  return (
    <div className={ styles.s } { ...rest }>
      <div className={ styles__spinner.s }></div>
    </div>
  );
}

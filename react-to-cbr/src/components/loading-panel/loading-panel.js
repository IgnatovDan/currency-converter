import styles from './loading-panel.module.css';
import styles__spinner from './__spinner/loading-panel__spinner.module.css';

export default function LoadingPanel() {
  return (
    <div className={ styles.s }>
      <div className={ styles__spinner.s }></div>
    </div>
  );
}

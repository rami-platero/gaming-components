import Spinner from '../../assets/WhiteLoader.svg'
import styles from './spinnerLoader.module.scss'

const SpinnerLoader = () => {
  return (
    <div className={styles.spinner}>
        <img src={Spinner} />
        <span>Loading...</span>
    </div>
  )
}

export default SpinnerLoader
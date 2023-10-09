import { CSSProperties } from 'react'
import styles from './summarySkeleton.module.scss'

const SummarySkeleton = ({...style}: CSSProperties) => {
  return (
    <div className={styles.summary} style={style}>
          <h2></h2>
          <div>
            <h4></h4>
            <h4></h4>
          </div>
          <div>
            <h4></h4>
            <h4></h4>
          </div>
          <div>
            <h4></h4>
            <h4></h4>
          </div>
        </div>
  )
}

export default SummarySkeleton
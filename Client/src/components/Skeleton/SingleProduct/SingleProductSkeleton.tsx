import ProductInfoSkeleton from './ProductInfoSkeleton'
import styles from './singleProductSkeleton.module.scss'

const SingleProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
        <div className={styles.skeleton__breadcrumb}>
        </div>
        <ProductInfoSkeleton/>  
    </div>
  )
}

export default SingleProductSkeleton
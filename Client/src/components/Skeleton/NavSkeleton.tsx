import styles from './navSkeleton.module.scss'

const NavSkeleton = () => {
    const array = [1,2,3]
  return (
    <>
    {array.map((index)=>{
        return <li key={index} className={styles.skeleton}>

        </li>
    })}
    </>
  )
}

export default NavSkeleton
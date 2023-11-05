import styles from './filtersToggleButton.module.scss'
import {BsFilterLeft} from 'react-icons/bs'

type Params = {
    openFilters: () => void
}

const FiltersToggleButton = ({openFilters}:Params) => {
  return (
    <button className={styles.filtersToggle} onClick={openFilters}>
        Filter by <BsFilterLeft/>
    </button>
  )
}

export default FiltersToggleButton
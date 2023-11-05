import stlyes from './specCard.module.scss'

type Params = {
  name: string,
  value: string
}

const SpecCard = ({name, value}: Params) => {
  return (
    <div className={stlyes.card}>
        <h5>{name}</h5>
        <p>{value}</p>
    </div>
  )
}

export default SpecCard
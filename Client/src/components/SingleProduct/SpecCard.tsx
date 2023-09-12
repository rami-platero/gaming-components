import stlyes from './specCard.module.scss'

type Params = {
    spec: any
}

const SpecCard = ({spec}: Params) => {
  return (
    <div className={stlyes.card}>
        <h5>{spec.name}</h5>
        <h3>{spec.detail}</h3>
    </div>
  )
}

export default SpecCard
import { useAppSelector } from "../../redux/hooks"

const Products = () => {
    const userState = useAppSelector(state => state.user)
    console.log(userState)

  return (
    <div>Products</div>
  )
}

export default Products
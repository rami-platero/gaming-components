/* import { TProduct } from "../../types/products"; */
import SpecCard from "./SpecCard";
import styles from './productSpecs.module.scss'
import {IoIosArrowDown} from 'react-icons/io'

/* type Params = {
    product: TProduct;
  }; */

const specs = [
  {
    name: "Graphics Card Model",
    detail: "NVIDIA GeForce GTX 1660"
  },
  {
    name: "GPU",
    detail: "Turing TU116"
  },
  {
    name: "VRAM",
    detail: "6GB GDDR5"
  },
  {
    name: "Clock Speed",
    detail: "Base: 1530 MHz, Boost: 1785 MHz"
  },
  {
    name: "CUDA Cores",
    detail: "1408"
  },
  {
    name: "Interface and Ports",
    detail: "PCI Express 3.0, DisplayPort 1.4, HDMI 2.0b, DVI-D"
  }
]; 

const ProductSpecs = (/* {product}:Params */) => {
  return (
    <div className={styles.specs}>
        <h2>Specifications</h2>
        <div className={styles.specs__wrapper}>
        {specs.map((spec)=>{
          return <SpecCard spec={spec} key={spec.name}/>
        })}
        </div>
        <button><IoIosArrowDown/> More</button>
    </div>
  )
}

export default ProductSpecs
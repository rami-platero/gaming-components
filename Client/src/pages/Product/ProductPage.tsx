import styles from "./productPage.module.scss";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/services/productsApi";
import ProductInfo from "../../components/SingleProduct/ProductInfo";
import ProductSpecs from "../../components/SingleProduct/ProductSpecs";
import Breadcrumb from "../../components/UI/Breadcrumb";
import SingleProductSkeleton from "../../components/Skeleton/SingleProduct/SingleProductSkeleton";
import ProductReviews from "../../components/SingleProduct/ProductReviews";

const ProductPage = () => {
  const { slug } = useParams();

  const { isError, data, isFetching } = useGetSingleProductQuery(slug || "");

  return (
    <main className={styles.product}>
      {isError && <h2>Product does not exist!</h2>}
      {!!isFetching && !data && <SingleProductSkeleton />}
      {data && (
        <>
          <Breadcrumb current={data.name} />
          <ProductInfo product={data} />
          <ProductSpecs product={data} />
          <ProductReviews rating={data.rating} id={data.id} />
        </>
      )}
    </main>
  );
};

export default ProductPage;

import { useParams } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";

const ProductsWrapper = () => {
  const { category } = useParams();
  return <ProductsPage category={category} />;
};

export default ProductsWrapper;

import { CategoriesContext } from "../../context/categories.context";
import { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title]

        return <CategoryPreview products={products} title={title}></CategoryPreview>
      })}
    </Fragment>
  );
};

export default CategoriesPreview;

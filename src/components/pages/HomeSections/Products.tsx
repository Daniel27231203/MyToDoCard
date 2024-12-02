"use client";
import { FC } from "react";
import scss from "./Products.module.scss";
import { useGetProductsQuery } from "@/redux/api/product";
import Product from "@/components/modal/Product";

const Products: FC = () => {
  const { data } = useGetProductsQuery();
  console.log("🚀 ~ data:", data);
  return (
    <section className={scss.Products}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.productsTitle}>
            <h1>My Products</h1>
          </div>
          <div className={scss.block}>
            {data?.map((item) => (
              <Product item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

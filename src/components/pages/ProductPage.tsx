"use client";
import { FC } from "react";
import scss from "./ProductPage.module.scss";
import Product from "../modal/Product";
import { useGetProductsQuery } from "@/redux/api/product";

const ProductPage: FC = () => {
  const { data } = useGetProductsQuery();
  return (
    <section className={scss.ProductPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <h2>
              Product <span>Page</span>
            </h2>
            <select name="" id="">
              <option value="electronic">electronic</option>
              <option value="mclosing">men's closing</option>
              <option value="wclosing">womens's closing</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className={scss.block}>
            {data?.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

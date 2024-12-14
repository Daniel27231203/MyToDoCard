"use client";
import { FC, useState } from "react";
import scss from "./ProductPage.module.scss";
import Product from "../modal/Product";
import { useGetProductsQuery } from "@/redux/api/product";
import { useParams } from "next/navigation";
import useStore from "@/zustand/store";

const ProductPage: FC = () => {
  const { data } = useGetProductsQuery();
  const [category, setCategory] = useState("");
  const { search } = useStore();
  console.log("🚀 ~ search:", search);

  const filterCategory =
    category === "" || category == "all"
      ? data
      : data?.filter((item) => item.category === category);

  const searchFilt = search?.length
    ? filterCategory?.filter((el) =>
        el.title
          .toLocaleLowerCase()
          .includes(String(search)?.toLocaleLowerCase())
      )
    : filterCategory;

  console.log("🚀 ~ filterCategory:", filterCategory);
  return (
    <section className={scss.ProductPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <h2>
              Product <span>Page</span>
            </h2>
            <select onChange={(e) => setCategory(e.target.value)} name="" id="">
              <option value="all">all</option>
              <option value="electronic">electronic</option>
              <option value="mclosing">men's closing</option>
              <option value="wclosing">womens's closing</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className={scss.block}>
            {searchFilt?.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

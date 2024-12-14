"use client";
import { FC, useCallback } from "react";
import scss from "./Product.module.scss";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoPencilOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useDeleteProductMutation } from "@/redux/api/product";
import useStore from "@/zustand/store";

interface ProductProps {
  item: ProductGet;
}
const Product: FC<ProductProps> = ({ item }) => {
  const router = useRouter();
  const [deleteProductMutation] = useDeleteProductMutation();
  const { basket, addToCart } = useStore();
  const renderStars = useCallback(
    (rating: number) => (
      <>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            style={{ color: index < rating ? "yellow" : "gray" }}
          />
        ))}
      </>
    ),
    []
  );

  const handleAddToCart = (id: number) => {
    if (id === item.id) {
      try {
        const basketData: ProductBasket = {
          id: item.id!,
          title: item.title,
          price: item.price,
          photo: item.photo,
          raiting: item.raiting,
          category: item.category,
          quantity: 1,
        };
        addToCart({ ...basketData });
        router.push("/order");
      } catch (e) {
        console.error(e);
        alert("Error adding product to cart");
      }
    } else {
      return console.error("Error adding product");
    }
  };

  return (
    <div className={scss.box}>
      <div className={scss.imgBox}>
        <img src={item.photo} alt={item.title} />
      </div>
      <div className={scss.titleBox}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className={scss.boxTodo}>
          <div className={scss.rating}>{renderStars(item.raiting)}</div>
          <div className={scss.rigBox}>
            <button
              onClick={() => {
                deleteProductMutation(item.id!);
              }}
            >
              <MdDelete />
            </button>
            <button
              onClick={() => {
                router.push(`/create?id=${item.id}`);
              }}
            >
              <IoPencilOutline />
            </button>
          </div>
        </div>
        <div className={scss.priceBox}>
          <span>{item.price}$</span>
          <button
            onClick={() => {
              handleAddToCart(item.id!);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

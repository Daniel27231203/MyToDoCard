"use client";
import { FC, useState } from "react";
import scss from "./CreatePage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateProductsMutation,
  useEditProductsMutation,
  useGetProductsQuery,
} from "@/redux/api/product";
import { useRouter, useSearchParams } from "next/navigation";

const CreatePage: FC = () => {
  const { register, handleSubmit, reset } = useForm<ProductPost>();
  const [createProductsMutation] = useCreateProductsMutation();
  const { data } = useGetProductsQuery();
  const [editProductsMutation] = useEditProductsMutation();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const EdidProduct = data?.find((product) => product.id === Number(id));
  const router = useRouter();

  const onSubmit: SubmitHandler<ProductPost> = async (data) => {
    console.log(
      "��� ~ SaveProduct:SubmitHandler<ProductPost>= ~ data:",
      data.category
    );
    const productData = {
      title: data.title,
      price: +data.price,
      category: data.category,
      photo: data.photo,
      description: data.description,
      raiting: +data.raiting,
      detailImage: data.detailImage,
    };
    try {
      const { data } = await createProductsMutation(productData);
      console.log(data?.message);
      reset();
    } catch (e) {
      console.log("🚀 ~ constonSubmit:SubmitHandler<ProductPost>= ~ e:", e);
      console.error("Error submitting form", e);
    }
  };

  const SaveProduct: SubmitHandler<ProductPost> = async (data) => {
    const newData = {
      title: data.title,
      price: +data.price,
      category: data.category,
      photo: data.photo,
      description: data.description,
      raiting: +data.raiting,
      detailImage: data.detailImage,
    };
    console.log(newData);
    try {
      await editProductsMutation({ data: newData, id: Number(id) });
      router.push("/");
    } catch (e) {
      console.error("Error saving product", e);
    }
  };
  return (
    <section className={scss.CreatePage}>
      <div className="container">
        <div className={scss.content}>
          <h1>
            You Can add your <span>Product here!</span>
          </h1>
          <div className={scss.createBox}>
            <form
              onSubmit={
                EdidProduct ? handleSubmit(SaveProduct) : handleSubmit(onSubmit)
              }
            >
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Product Title"
                defaultValue={EdidProduct?.title}
              />
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Product Price"
                defaultValue={EdidProduct?.price}
              />
              <select
                {...register("category", { required: "Category is required" })}
                defaultValue={EdidProduct?.category}
              >
                <option value="electronic">electronic</option>
                <option value="mclosing">men's closing</option>
                <option value="wclosing">womens's closing</option>
                <option value="books">Books</option>
              </select>
              <input
                {...register("photo", { required: true })}
                type="text"
                placeholder="Product Photo URL"
                defaultValue={EdidProduct?.photo}
              />
              {/* <input
                {...register("detailImage", { required: true })}
                type="text"
                placeholder="Product Photo URL"
                defaultValue={EdidProduct?.detailImage}
              /> */}
              <input
                {...register("raiting", { required: true })}
                type="number"
                placeholder="raiting"
                defaultValue={EdidProduct?.raiting}
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Product Description"
                defaultValue={EdidProduct?.description}
              />
              {!EdidProduct ? (
                <button type="submit">Create Product</button>
              ) : (
                <button type="submit">Save Product</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePage;

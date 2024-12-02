import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      PRODUCTS.GetProductsResponse,
      PRODUCTS.GetProductsRequest
    >({
      query: () => ({
        url: `/get`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    createProducts: build.mutation<
      PRODUCTS.CreateProductsResponse,
      PRODUCTS.CreateProductsRequest
    >({
      query: (body) => ({
        url: `/product/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["product"],
    }),
    editProducts: build.mutation<
      PRODUCTS.EditProductsResponse,
      PRODUCTS.EditProductsRequest
    >({
      query: ({ data, id }) => ({
        url: `/product/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: build.mutation<
      PRODUCTS.DeleteProductsResponse,
      PRODUCTS.DeleteProductsRequest
    >({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductsMutation,
  useEditProductsMutation,
  useDeleteProductMutation,
} = api;

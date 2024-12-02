namespace PRODUCTS {
  type GetProductsResponse = ProductGet[];
  type GetProductsRequest = void;

  type CreateProductsResponse = {
    message: string;
  };
  type CreateProductsRequest = ProductPost;

  type EditProductsResponse = {
    message: string;
  };
  type EditProductsRequest = { data: ProductGet; id: number };

  type DeleteProductsResponse = {
    message: string;
  };
  type DeleteProductsRequest = number;
}

interface ProductPost {
  title: string;
  photo: string;
  category: string;
  description: string;
  raiting: number;
  price: number;
  detailImage: string[];
}

interface ProductGet {
  id?: number;
  title: string;
  photo: string;
  category: string;
  description: string;
  raiting: number;
  price: number;
  detailImage: string[];

  createdAt?: string;
  updatedAt?: string;
}

interface ProductBasket {
  id?: number;
  title: string;
  photo: string;
  category: string;
  raiting: number;
  price: number;
  quantity: number;
}

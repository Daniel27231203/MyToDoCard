interface ProductPost {
  title: string;
  photo: string;
  category: string;
  description: string;
  raiting: number;
  price: number;
}

interface ProductGet {
  id?: number;
  title: string;
  photo: string;
  category: string;
  description: string;
  raiting: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

 interface ProductInterface {
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: String[]
}

 interface ProductResponseInterface {
  data: {
   products: ProductInterface[],
   total:Number,
   skip:Number,
   limit:Number
  }
}

export {ProductInterface, ProductResponseInterface}
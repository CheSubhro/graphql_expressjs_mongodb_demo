
import mongoose from "mongoose";

const productsListSchema = new mongoose.Schema({
    category: String,
    productName: String,
    price: Number,
    colors: Object,
    imgPath: String,
})

const ProductModel = mongoose.model('productlists', productsListSchema);

export default ProductModel;
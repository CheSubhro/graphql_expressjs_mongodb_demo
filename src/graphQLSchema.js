import { gql } from "apollo-server-express";
import ProductModel from './models/productSchema.js';

const typeDefs = gql `
    type Product {
        id: ID
        category: String
        productName: String
        price: Int!
        colors: [String!]
    } 
    
    type Query {
        getProductsList: [Product]
        getProduct(id: ID!): Product
    }

    type Mutation {
        updateProduct(id: ID!, category: String!, productName: String!, price: Int!, colors: [String!], imgPath: String!): Product
        addProduct(category: String, productName: String!, price: Int, colors: [String!], imgPath: String): Product
        deleteProduct(id: ID!): Boolean!
    }
`;

const resolvers = {
    Query:{
        getProductsList: async (parent, args) =>{
            const result = ProductModel.find({}).then((res) =>{
                if (res) {
                    return res;
                }
            })
            return result;
        },

        getProduct: async (parent, args) =>{
            const result = ProductModel.findById(args.id).then((res) => {
                if (res) {
                    return res;
                }
            })
            return result;
        }
    },

    Mutation: {
        updateProduct: async (parent, args) => {
            const result = ProductModel.findByIdAndUpdate(args.id, 
                {
                    productName: args.productName,
                    category: args.category,
                    price: args.price,
                    imgPath: args.imgPath,
                    colors: args.colors
                }, {new: true}).then((res) => {
                    if (res) {
                        return res;
                    }
                })
            return result;
        },
        addProduct :  async (parent, args) => {
            let product = new ProductModel({
                productName: args.productName,
                category: args.category,
                price: args.price,
                imgPath: args.imgPath,
                colors: args.colors
            });
           const result = product.save().then((res) => {
                return res;
            })
            return result;
        },
        deleteProduct:  async (parent, args) => {
            try {
                await ProductModel.findOneAndRemove({_id: args.id});
                return true;
            } catch (error) {
                console.log('Error while delete:',error);
                return false;
            }
        }
    }
}

export { typeDefs, resolvers };

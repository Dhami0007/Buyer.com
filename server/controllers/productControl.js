const Products = require('../models/productModel')

// Filtering, sorting and paginating
class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
        const queryObj = {...this.queryString}

        const excludedFields = ["page", "sort", "limit"]
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(",").join("")
            this.query = this.query.sort(sortBy)
            
            console.log(sortBy)
        }
        else{
            this.query = this.query.sort("-createdAt")
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 3;
        const skip = Math.max(0,(page - 1) * limit);
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productControl = {
    getProducts: async (req, res) => {
        try{
            const features = new APIfeatures(Products.find(),req.query).filtering().sorting().paginating();

            const products = await features.query;
            res.json(products);
        }
        catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    createProducts: async (req, res) => {
        try{
            images = req.file;
            console.log(images);
            console.log(typeof images);
            const {product_id, title, price, description, content, category} = req.body;
            
            const product = await Products.findOne({product_id});

            if (product) return res.status(400).json({msg: "This product already exists."});
            
            const newProduct = new Products({product_id, title, price, description, content, images, category});

            await newProduct.save();

            res.json("New product created.");
        }
        catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    deleteProducts: async (req, res) => {
        try{
            await Products.findByIdAndDelete(req.params.id)

            res.json({msg: "Product deleted."});
        }
        catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    updateProducts: async(req,res) => {
        try{
            const product = await Products.findOne({_id: req.params.id});

            if (!product) return res.status(400).json({msg: "This product does not exist."});
            
            const {product_id, title, price, description, content, images, category} = req.body;

            await Products.findByIdAndUpdate({_id: req.params.id}, {product_id, title, price, description, content, images, category});

            res.json({msg: "Product updated."});
        }
        catch(err){
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = productControl;
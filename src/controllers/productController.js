import Product from '../models/productModel'
import asyncHandler from "express-async-handler"

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options : 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    res.json({products, page, pages: Math.ceil(count / pageSize)});
})

// @desc Fetch all products for client use react-query
// @route GET /api/products/react-query
// @access Public
const getProductsForReactQuery = asyncHandler(async (req, res) => {
    //code for react query  
    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options : 'i'
        }
    } : {}
    const page = parseInt(req.query.page) || 0
    const perPage = 3
    const start = page * perPage
    const end = start + perPage
    const products = await Product.find({...keyword})
    console.log(products);
    const productsForPage = products.slice(start, end)
    res.json({productsForPage,hasMore: end < products.length, });
})

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product  not found')
    }
})
// @desc delete product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: "product removed" })
    } else {
        res.status(404)
        throw new Error('Product  not found')
    }
})

// @desc create product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Smaple name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        brand: 'Smaple brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


// @desc update product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock, } = req.body.product

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
    } else {
        res.status(404)
        throw new Error('Product  not found')
    }

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
})


// @desc create new review
// @route POST /api/products/:id/review
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
       const alreadyReviewed= product.reviews.find(r => r.user.toString()=== req.user._id.toString())
       if(alreadyReviewed){
        res.status(400)
        throw new Error("Product already reviewed")
       }
       const review = {
        name:req.user.name,
        rating: Number(rating),
        comment, 
        user: req.user._id
       }
       product.reviews.push(review)
       product.numReviews = product.reviews.length
       product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)
       / product.reviews.length

       await product.save()
       res.status(201).json({message:"Review added"})

    } else {
        res.status(404)
        throw new Error('Product  not found')
    }
})


// @desc get top rted products
// @route POST /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts,
    getProductsForReactQuery
}
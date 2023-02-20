const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const product = {
  getAllProduct: async (req, res) => {
    try {
      Product.find({}, (err, products) => {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200).json(products);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createProduct: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MAIZOSHOP",
      });
      let newProduct = new Product({
        image: result.secure_url,
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        newPrice: req.body.newPrice,
        oldPrice: req.body.oldPrice,
        quantity: req.body.quantity,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MAIZOSHOP",
      });
      const results = await Product.findById(req.params.id);
      if (results.productId === req.body.productId) {
        await results.updateOne({
          $set: {
            image: result.secure_url,
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            newPrice: req.body.newPrice,
            oldPrice: req.body.oldPrice,
            quantity: req.body.quantity,
          },
        });
        res.status(200).json("Update product successfully");
      } else {
        res.status(500).json("Can't update prduct");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      Product.findByIdAndRemove(req.params.id, (err, products) => {
        if (err) {
          res.status(404).json("Can't find Id");
        } else {
          res.status(200).json("Delete product successfully");
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = product;
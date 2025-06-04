const Product = require('../model/productmodel.js')
const mongoose =require('mongoose')
const fs =require('fs')
const path=require('path')


exports.getProducts = async (req, res) => {
    try {
        const getproduct = await Product.find()
        res.status(200).json(getproduct)
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}



exports.getProductsWithid = async (req, res) => {
    const { id } = req.params
    try {
        const getproduct = await Product.findById(id)
        res.status(200).json(getproduct)
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}




exports.addProducts = async (req, res) => {
  try {
    const {
      shopCardName,
      shopCardDec,
      shopCardPrice,
      shopCardType,
      shopCardCat,
      shopCardMet,
      hasSize,
      hasVariant,
      shopCardMenuCat
    } = req.body;

    // Parse sizes and variants as JSON arrays
    // (Assuming frontend sends JSON.stringify(sizes) and JSON.stringify(variants))
    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
    const variants = req.body.variants ? JSON.parse(req.body.variants) : [];

    // Main product image
    const mainImgFile = req.files['mainImageFile']?.[0];
   
    const  shopCardImgUrl= mainImgFile
      ? `http://${req.get('host')}/productlist/uploads/${mainImgFile.filename}`
      : '';
      
    // Map uploaded size images to sizes array
    const sizesImages = req.files['sizesImages'] || [];
    const sizesWithImages = sizes.map((size, idx) => ({
      ...size,
      image: sizesImages[idx]
        ? `http://${req.get('host')}/productlist/uploads/${sizesImages[idx].filename}`
        : ''
    }));

    // Map uploaded variant images to variants array
    const variantsImages = req.files['variantsImages'] || [];
    const variantsWithImages = variants.map((variant, idx) => ({
      ...variant,
      image: variantsImages[idx]
        ? `http://${req.get('host')}/productlist/uploads/${variantsImages[idx].filename}`
        : ''
    }));

    const newProduct = new Product({
      shopCardName,
      shopCardDec,
      shopCardPrice,
      shopCardType,
      shopCardCat,
      shopCardMet,
      shopCardImgUrl,
      shopCardMenuCat,
      hasSize: hasSize === "true" || hasSize === true,
      sizes: sizesWithImages,
      hasVariant: hasVariant === "true" || hasVariant === true,
      variants: variantsWithImages,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Upload successfully', Product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save product to DB', error: err.message });
  }
};





exports.updateProductsWithid= async (req, res) => {
  const { id } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

 

  // Extract fields from req.body
  const {
    shopCardName,
    shopCardDec,
    shopCardPrice,
    shopCardType,
    shopCardCat,
    shopCardMet,
    hasSize,
    hasVariant,
    sizes,
    variants,
  } = req.body;

  console.log({shopCardName,
    shopCardDec,
    shopCardPrice,
    shopCardType,
    shopCardCat,
    shopCardMet,
    hasSize,
    hasVariant,
    sizes,
    variants,})

  // Prepare update object
  const updateData = {
    shopCardName,
    shopCardDec,
    shopCardPrice,
    shopCardType,
    shopCardCat,
    shopCardMet,
    hasSize: hasSize === 'true' || hasSize === true,
    hasVariant: hasVariant === 'true' || hasVariant === true,
  };

  // Main product image
  if (req.file && req.file.filename) {
    updateData.shopCardImgUrl = `http://${req.get('host')}/productlist/uploads/${req.file.filename}`;
  } else if (req.files && req.files['shopCardImgUrl'] && req.files['shopCardImgUrl'][0]) {
    updateData.shopCardImgUrl = `http://${req.get('host')}/productlist/uploads/${req.files['shopCardImgUrl'][0].filename}`;
  }

  // Parse and update sizes
  if (sizes) {
    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (e) {
      parsedSizes = [];
    }
    // Attach images to sizes if uploaded
    if (req.files && req.files['sizesImages']) {
      req.files['sizesImages'].forEach((file, idx) => {
        if (parsedSizes[idx]) {
          parsedSizes[idx].image = `http://${req.get('host')}/productlist/uploads/${file.filename}`;
        }
      });
    }
    updateData.sizes = parsedSizes;
  }

  // Parse and update variants
  if (variants) {
    let parsedVariants = [];
    try {
      parsedVariants = JSON.parse(variants);
    } catch (e) {
      parsedVariants = [];
    }
    if (req.files && req.files['variantsImages']) {
      req.files['variantsImages'].forEach((file, idx) => {
        if (parsedVariants[idx]) {
          parsedVariants[idx].image = `http://${req.get('host')}/productlist/uploads/${file.filename}`;
        }
      });
    }
    updateData.variants = parsedVariants;
  }

  try {
    const newProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!newProduct) {
      return res.status(400).json({ Message: 'Data not Found' });
    }
    res.status(200).json({ Message: 'Data Updated Successfully', Product: newProduct });
  } catch (err) {
    res.status(404).json({ Message: 'Cannot Fetch DataBase', error: err.message });
  }
};



exports.deleteProductsWithid = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findById(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
   const imgUrl=deletedProduct.shopCardImgUrl
  let imageFileName;
        if (imgUrl) {
            imageFileName = imgUrl.split('/').pop();
        }

        // 3. Delete the image file if it exists
        if (imageFileName) {
            const imagePath = path.join(__dirname, '../productlist/uploads', imageFileName);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete the file
            }
        }
             await Product.findByIdDelete(id)
             
    res.status(200).json({ message: 'Deleted successfully', product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};








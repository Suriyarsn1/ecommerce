const Collection = require('../model/productCollections.js');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Get all collections
exports.getCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get collection by ID
exports.getCollectionsWithid = async (req, res) => {
    const { id } = req.params;
    try {
        const collection = await Collection.findById(id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json(collection);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Add a new collection
exports.addCollections = async (req, res) => {
    const { collectionFor, collectionName } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // === CHANGED: Upload image buffer to Cloudinary ===
    let collectionImgUrl = null;
    let imagePublicId = null;
    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'ecommerce_collection_images' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const result = await streamUpload(req);
      collectionImgUrl = result.secure_url;
      imagePublicId = result.public_id;
  
    }
        const newCollection = new Collection({ collectionFor, collectionImgUrl, collectionName, imagePublicId });
        await newCollection.save();
        res.status(201).json({ message: 'Uploaded successfully', collection: newCollection });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save collection to DB', error: err.message });
    }
};

// Update collection by ID
exports.updateCollectionsWithid = async (req, res) => {
    const { id } = req.params;
    // Copy all fields from req.body
  
   

     const updatedCollection = await Collection.findById(id);
        if (!updatedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        // Handle image update if a new file is uploaded
    let  collectionImgUrl = updatedCollection.collectionImgUrl;
    let imagePublicId = updatedCollection.imagePublicId;
   
    if (req.file) {
      if (imagePublicId) await cloudinary.uploader.destroy(imagePublicId);
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'ecommerce_collection_images' },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
       collectionImgUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }
    
   

    try {
          const newData = { ...req.body,collectionImgUrl,imagePublicId };

        const updatedCollection = await Collection.findByIdAndUpdate(id, newData,{ new: true });
        if (!updatedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json({ message: 'Data updated successfully', collection: updatedCollection });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update collection', error: err.message });
    }
};

// Delete collection by ID
exports.deleteCollectionsWithid = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Find the collection to get the image path
        const deletedCollection = await Collection.findById(id);
        if (!deletedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }

     
    // 2. Delete the image from Cloudinary if imagePublicId exists
    if (deletedCollection.imagePublicId) {
      await cloudinary.uploader.destroy(deletedCollection.imagePublicId);
    }


        // 4. Delete the collection document
        await Collection.findByIdAndDelete(id);

        res.status(200).json({ message: 'Deleted successfully', collection: deletedCollection });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete collection', error: err.message });
    }
};

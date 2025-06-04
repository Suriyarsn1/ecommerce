const Collection = require('../model/productCollections.js');
const fs =require('fs')
const path=require('path')

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
        const collectionImgUrl = `http://${req.get('host')}/productlist/uploads/${req.file.filename}`;
        const newCollection = new Collection({ collectionFor, collectionImgUrl, collectionName });
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
    const newData = { ...req.body };
    // Update image URL if file is uploaded
    if (req.file) {
        newData.collectionImgUrl = `http://${req.get('host')}/productlist/uploads/${req.file.filename}`;
    }
    try {
        const updatedCollection = await Collection.findByIdAndUpdate(id, newData, { new: true });
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

        // 2. Extract the image filename from the URL
       
        const imageUrl = deletedCollection.collectionImgUrl;
        let imageFileName;
        if (imageUrl) {
            imageFileName = imageUrl.split('/').pop();
        }

        // 3. Delete the image file if it exists
        if (imageFileName) {
            const imagePath = path.join(__dirname, '../productlist/uploads', imageFileName);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete the file
            }
        }

        // 4. Delete the collection document
        await Collection.findByIdAndDelete(id);

        res.status(200).json({ message: 'Deleted successfully', collection: deletedCollection });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete collection', error: err.message });
    }
};

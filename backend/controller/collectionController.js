const Collection = require('../model/productCollections.js')



exports.getCollections = async (req, res) => {
    try {
        
        const getCollection = await Collection.find()
        res.status(200).json(getCollection)
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}



exports.getCollectionsWithid = async (req, res) => {
    const { id } = req.params
    try {
        const getCollection = await Collection.findById(id)
        res.status(200).json(getCollection )
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}

exports.addCollections = async (req, res) => {
    // Correct destructuring
    const {  collectionFor } = req.body;
    try {
        // Build the image URL
        const collectionImgUrl = `http://${req.get('host')}/productlist/uploads/${req.file.filename}`;
        console.log(collectionImgUrl);

        // Create and save the new collection
        const newCollection = new Collection({ collectionFor, collectionImgUrl });
        await newCollection.save();

        res.status(201).json({ message: 'Upload successfully', Collection: newCollection });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save Collection to DB', error: err.message });
    }
};


exports.updateCollectionsWithid = async (req, res) => {
    const { id } = req.params
    const newData = { collectionTypeName, collectionFor}  = req.body
    console.log(newData)
    if(req.body.collectionImgUrl){
    const collectionImgUrl =`http://${req.get('host')}/productlist/uploads/${req.file.filename}`
    newData.collectionImgUrl=collectionImgUrl }
    try {
        const newCollection = await Collection.findByIdAndUpdate(id, newData,{ new: true })
        if (!newCollection) { return res.status(400).json({ Message: 'Data not Found', error: err.message }) }
        res.status(200).json({ Message: 'Data Updated Sucessfully', Collection: newCollection })
    }
    catch (err) { res.status(404).json({ Message: 'Cannot Fetch DataBase', error: err.message }) }

}



exports.deleteCollectionsWithid = async (req, res) => {
    const { id } = req.params
    try {
        const newCollection = await Collection.findByIdAndDelete(id)
        if (!newCollection) { return res.status(400).json({ Message: 'Data not Found', error: err.message }) }
        res.status(200).json({ Message: ' Deleted Sucessfully', Collection: newCollection })
    }
    catch (err) { res.status(404).json({ Message: 'Cannot Fetch DataBase', error: err.message }) }

}

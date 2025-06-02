const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    menuTitle: { type: String, required: true },
    menuCat: { type: String, required: true },
    subMenuTitle: { type: [String], default: [] }
}, { timestamps: true }); 

module.exports = mongoose.model('Menu', MenuSchema, 'menu');
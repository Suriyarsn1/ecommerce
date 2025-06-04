const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');

const countries = JSON.parse(fs.readFileSync(path.join(dataDir, 'countries.json'), 'utf8'));
const states = JSON.parse(fs.readFileSync(path.join(dataDir, 'states.json'), 'utf8'));
const fullData = JSON.parse(fs.readFileSync(path.join(dataDir, 'indialist.json'), 'utf8'));
const extDistricts = JSON.parse(fs.readFileSync(path.join(dataDir, 'districts.json'), 'utf8'));

const districts = extDistricts.districts;

// Get all countries
exports.getCountries = async (req, res) => {
    try {
        res.status(200).json(countries);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get states by country ID (expects GET with query or POST with body)
exports.getState = async (req, res) => {
    try {
        // Use req.query for GET or req.body for POST
        const { id } = req.method === 'GET' ? req.query : req.body;
        if (!id) {
            return res.status(400).json({ message: 'Country ID is required' });
        }
        const stateList = states.filter(item => item.countryId === id);
        res.status(200).json(stateList);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get districts by state name (expects GET with query or POST with body)
exports.getDistricts = async (req, res) => {
    try {
        const { statename } = req.method === 'GET' ? req.query : req.body;
        if (!statename) {
            return res.status(400).json({ message: 'State name is required' });
        }
        const districtsList = districts.filter(item => item.state === statename);
        res.status(200).json(districtsList);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get cities (subDistricts) by district name (expects GET with query or POST with body)
exports.getCities = async (req, res) => {
    try {
        const { dname } = req.method === 'GET' ? req.query : req.body;
        if (!dname) {
            return res.status(400).json({ message: 'District name is required' });
        }
        const data = fullData.map(item => item.districts).flat();
        const subDistricts = data.filter(item => item.district === dname);
        const cities = subDistricts.flatMap(item => item.subDistricts || []);
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get villages by subDistrict (city) name (expects GET with query or POST with body)
exports.getVillage = async (req, res) => {
    try {
        const { cname } = req.method === 'GET' ? req.query : req.body;
        if (!cname) {
            return res.status(400).json({ message: 'SubDistrict (city) name is required' });
        }
        const data = fullData.map(item => item.districts).flat();
        const subDistricts = data.flatMap(item => item.subDistricts || []);
        const villages = subDistricts.flatMap(item => 
            item.subDistrict === cname ? item.villages || [] : []
        );
        res.status(200).json(villages);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

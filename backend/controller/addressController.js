const express=require('express');
const fs = require('fs');

const countries=JSON.parse(fs.readFileSync('../backend/data/countries.json','utf8'))
const state=JSON.parse(fs.readFileSync('../backend/data/states.json','utf8'))
const fullData=JSON.parse(fs.readFileSync('../backend/data/indialist.json','utf8'))
const extDistricts=JSON.parse(fs.readFileSync('../backend/data/districts.json','utf8'))

 const Districts=extDistricts.districts




exports.getCountries= async (req, res) => {
    try {
        const country=countries.map(item=>item)
        res.status(200).json(country)
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}
exports.getState= async (req, res) => {
    try {
       
        const{id}=req.body
       const stateList=state.filter(item=>item.countryId===id)
     res.status(200).json(stateList)
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}

exports.getDistricts= async (req, res) => {
    try {
         
        const{statename}=req.body
        const districtsList=Districts.filter(item=>item.state===statename)
     res.status(200).json(districtsList)
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}

exports.getCities= async (req, res) => {
    try {
       
        const{ dname}=req.body 
       const data=(fullData.map(item=>item.districts))
     const subDistct=data.flat().filter(item=>item.district===dname)
     const sub=subDistct.flat().map(item=>item.subDistricts)
         res.status(200).json (sub.flat().map(item=>item))
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}

exports.getVillage= async (req, res) => {
    try {
        console.log('citiy')
        const{ cname}=req.body 
      
       const data=fullData.map(item=>item.districts)
       const subDistct=data.flat().map(item=>item.subDistricts)
       const village=subDistct.flat().filter(item=>item.subDistrict===cname)
       const extvillage=village.flat().map(item=>item.villages)
      res.status(200).json(extvillage.flat().map(item=>item))
        console.log(cname)
    }
    catch (err) {
        res.status(500).json({ message: 'Server connection is error', error: err.message })
    }
}

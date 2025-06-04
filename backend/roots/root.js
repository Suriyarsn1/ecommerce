const express = require('express');
const router = express.Router();
const multer = require('multer');


const { addProducts, getProducts,getProductsWithid,updateProductsWithid,deleteProductsWithid} = require('../controller/productController')
const {register,login}=require('../controller/authController')
const {createMenu,getMenu,addSubMenu,deleteMenu}=require('../controller/menuController')
const { addCollections, getCollections,getCollectionsWithid,updateCollectionsWithid,deleteCollectionsWithid}=require('../controller/collectionController')
const {setCartItem,fetchCartItem,updateCartItem,deleteCartItem}=require('../controller/cartController')
const AuthenticationJwt=require('../middleware/jwttoken')
const {getCountries,getState,getDistricts,getCities,getVillage}=require('../controller/addressController')
const {placeOrders,fetchOrders,fetchAdminOrders,updateAdminOrders}=require('../controller/orderController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'productlist/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const upload = multer({ storage })




router.post('/upload',upload.fields([
    { name: 'mainImageFile', maxCount: 1 },
    { name: 'sizesImages', maxCount: 10 },
    { name: 'variantsImages', maxCount: 10 }
  ]), addProducts)
router.get('/getproductlist', getProducts)
router.get('/getproductlist/:id',getProductsWithid)
router.put('/update/:id', upload.fields([
    { name: 'mainImageFile', maxCount: 1 },
    { name: 'sizesImages', maxCount: 10 },
    { name: 'variantsImages', maxCount: 10 }
  ]), updateProductsWithid)
router.delete('/deleteproduct/:id',deleteProductsWithid)
router.post('/register', register)
router.post('/login', login)
router.post('/addmenu',createMenu)
router.post('/getmenu',getMenu)
router.post('/addsubmenu/:id',addSubMenu)
router.delete('/deletemenu/:id',deleteMenu)

router.post('/collection/upload', upload.single('file'), addCollections)
router.get('/collection/getlist', getCollections)
router.get('/collection/getlist/:id',getCollectionsWithid)
router.put('/collection/update/:id', upload.single('collectionImgUrl'), updateCollectionsWithid)
router.delete('/collection/deletecollection/:id',deleteCollectionsWithid)


 router.post('/save/cartitem',AuthenticationJwt,setCartItem)
router.get('/fetch/cartitem',AuthenticationJwt,fetchCartItem)
router.put('/updatecartitem',AuthenticationJwt,updateCartItem)
router.post('/removecartitem',AuthenticationJwt,deleteCartItem)

router.post('/get/countries',getCountries)
router.post('/get/state',getState)
router.post('/get/districts',getDistricts)
router.post('/get/cities',getCities)
router.post('/get/village',getVillage)


router.post('/placeorders',placeOrders)
router.get('/fetch/orders',AuthenticationJwt,fetchOrders)
router.get('/fetch/admin/orders',fetchAdminOrders)
router.put('/admin/orders/update/:orderId',updateAdminOrders)





module.exports = router


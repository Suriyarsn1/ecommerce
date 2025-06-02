const Cart = require('../model/cart')



exports.setCartItem = async (req, res) => {

  const userId = req.userId
  const { productId, newQty } = req.body
try{
  let cart = await Cart.findOne({ user: userId })

  if (cart) {
    const exist = cart.items.find(cartitem => cartitem.productId.toString() === productId)

    if (exist) {
      {
        exist.quantity += newQty
      }
      } else {
      console.log('afer exist new product')
      cart.items.push({ productId, newQty })
    }
       await cart.save()
           }else {
    cart = await Cart.create({ user: userId, items: [{ productId, newQty }] })
    res.status(200).json({ message: 'Cart create sucessfully' })
    }
}catch (err) {
  console.error(err)
  res.status(404).json({ message: 'User not Found', err })
}
}


exports.fetchCartItem = async (req, res) => {
  try {

  const userId = req.userId
   const cart = await Cart.findOne({ user: userId }).populate('items.productId')
  if (cart) return res.send(cart.items || [])
     }
    catch (err) {
    console.log(err)
    res.status(500).json({ Message: "cart not fetch", err })
  }
}


exports.updateCartItem = async (req, res) => {
  try {
  const userId = req.userId
  const {productId,newQty}=req.body
 let cart = await Cart.findOne({ user: userId })
  if (!cart)return res.status(404).json({ Message: "user cart not found", err })
    const exist=cart.items.find(p=>p.productId.toString()===productId)
    if(exist){
      exist.quantity=newQty
       }
  await cart.save()
      res.send(cart)
}catch (err) {
    console.log(err)
    res.status(500).json({ Message: "cart not fetch", err })
  }
}


exports.deleteCartItem = async (req, res) => {
  try {
 
  const userId = req.userId
  const {productId}=req.body
 let cart = await Cart.findOne({ user: userId })
  if (!cart)return res.status(404).json({ Message: "user cart not found", err })
 cart.items= cart.items.filter(p=>p.productId.toString()!=productId)
    if (!cart)return res.status(404).json({ Message: "item cart not found", err })
      await cart.save()
 
      res.send(cart)
}catch (err) {

    console.log(err)
    res.status(500).json({ Message: "cart not fetch", err })
  }
}

const Cart = require('../model/cart')



exports.setCartItem = async (req, res) => {
  const userId = req.userId;
  const { productId, newQty, size } = req.body;
  console.log(productId, newQty, size )
  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Find if the same productId and size already exists
      const exist = cart.items.find(
        item => item.productId.toString() === productId && item.size === size
      );
      if (exist) {
        // Update quantity
        exist.quantity += newQty;
      } else {
        // Add new item
        cart.items.push({ productId, quantity: newQty, size });
      }
      await cart.save();
      res.status(200).json({ message: 'Cart updated successfully', cart });
    } else {
      // Create new cart
      cart = await Cart.create({
        user: userId,
        items: [{ productId, quantity: newQty, size }]
      });
      res.status(200).json({ message: 'Cart created successfully', cart });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.fetchCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.productId');
    if (!cart) {
      return res.status(200).json({ message: 'Cart is empty', items: [] });
    }
    res.status(200).json({ items: cart.items || [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};


exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, newQty } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'User cart not found' });

    const exist = cart.items.find(p => p.productId.toString() === productId);
    if (!exist) return res.status(404).json({ message: 'Item not found in cart' });

    exist.quantity = newQty;
    await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update cart', error: err.message });
  }
};



exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'User cart not found' });

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(p => p.productId.toString() !== productId);
    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to remove item from cart', error: err.message });
  }
};


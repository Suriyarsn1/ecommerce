import { useContext, createContext, useState, useEffect } from "react";
import { Authcontext } from "./authContexts";
import axios from "axios";

// Create a context for the cart
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // State for cart products, loading, selected items, and totals
  const [cartProduct, setCartProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { token } = useContext(Authcontext);
  const [selectedItems, setSelectedItems] = useState({});
  const [total, setTotal] = useState({});

  // Fetch cart products 
  useEffect(() => {
    const fetchCartProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/fetch/cartitem`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartProduct(res.data);
        // By default, select all items in the cart
        const defaultSelected = {};
res.data.forEach(item => {
  if (item.productId && item.productId._id) {
    defaultSelected[item.productId._id] = true;
  }
});
        setSelectedItems(defaultSelected);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchCartProduct();
    else {
      setCartProduct([]);
      setSelectedItems({});
    }
  }, [token]);


  useEffect(() => {
    calculatedTotal();
  
  }, [selectedItems, cartProduct]);

  // Change the quantity of a cart item
  const handleChangeQty = async (productId, newQty) => {
    if (newQty < 1) return;
    setCartProduct(prev =>
      prev.map(item =>
        item.productId._id === productId
          ? { ...item, quantity: Number(newQty) }
          : item
      )
    );
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/updatecartitem`,
        { productId, newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Decrement the quantity of a cart item
  const decrementQty = async (productId, newQty) => {
    if (newQty < 1) return;
    setCartProduct(prev =>
      prev
        .map(item =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/updatecartitem`,
        { productId, newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Increment the quantity of a cart item
  const incrementQty = async (productId, newQty) => {
    setCartProduct(prev =>
      prev.map(item =>
        item.productId._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/updatecartitem`,
        { productId, newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Handle checkbox selection 
  const handleChecked = (itemId, checked) => {
    setSelectedItems(prev => ({ ...prev, [itemId]: checked }));
  };

  // Calculate cart totals 
  function calculatedTotal() {
    const selectionItems = cartProduct.filter(item => item.productId && selectedItems[item.productId._id]);
    let subTotal = selectionItems.reduce(
      (sum, item) => sum + item.quantity * item.productId.shopCardPrice,
      0
    );
    let offerprice = subTotal > 500 ? 10 : 0;
    let taxable = subTotal - offerprice;
    let deliveryFee =
      subTotal <= 500
        ? subTotal * 0.2
        : subTotal > 500 && subTotal <= 1000
        ? subTotal * 0.1
        : 0;
    let gst = taxable * 0.18;
    let grandTotal = taxable + gst + deliveryFee;
    setTotal({
      subTotal,
      deliveryFee,
      offerprice,
      gst,
      grandTotal,
    });
  
  }
  // Remove an item from the cart
  const handleremove = async productId => {
    const updatedCart = cartProduct.filter(
      p => p.productId._id !== productId
    );
    setCartProduct(updatedCart);

    setSelectedItems(prev => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/removecartitem`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Provide all cart state 
  return (
    <CartContext.Provider
      value={{
        cartProduct,
        selectedItems,
        handleremove,
        isLoading,
        setCartProduct,
        handleChangeQty,
        decrementQty,
        incrementQty,
        handleChecked,
        calculatedTotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

import { createContext, useState, useEffect, useContext } from "react";
import { Authcontext } from "./authContexts";
import axios from "axios";

// Create context for products
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // State for all products and productIds added to cart
  const [products, setProducts] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const { token } = useContext(Authcontext);

  // Fetch product list from API on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getproductlist");
        setProducts(res.data);
      } catch (err) {
        console.error("Fetching Failed:", err);
      }
    };
    fetchProduct();
  }, []);

  
   //Add a product to the cart 
   
  const handleAddcart = async (productId) => {
  
    if (!productIds.includes(productId)) {
      setProductIds(prev => [...prev, productId]);
    }

    let newQty = 1;
  
    const exist = products.find((p) => p.productId === productId);

    if (exist && exist.quantity) {
      // If exists, increment the quantity 
      setProducts(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
     
 
    } else {
      
      try {
        await axios.post(
          'http://localhost:5000/api/save/cartitem',
          { productId, newQty },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert('Product Sucessfully Added in to Your Cart')
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    }

    // Remove productId from productIds 
    setTimeout(() => {
      setProductIds(prev => prev.filter(item => item !== productId));
    }, 2000);
  };

  // Provide products and cart 
  return (
    <ProductContext.Provider value={{ products, productIds, setProducts, handleAddcart }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

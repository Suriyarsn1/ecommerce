import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import AuthProvider from './context/authContexts';
import CollectionProvider from './context/collectionContext';
import UtilityProvider from './context/menuContext';
import CartProvider from './context/CartContext';
import ProductProvider from './context/productContext';

// Common Components
import Navbar from './module/navebar';

// User Modules
import Home from './module/home';
import Login from './module/login';
import Register from './module/register';
import Cartlist from './module/cart';
import Checkout from './module/checkoutpage';
import UserOrders from './module/orderpage';
import HomeMenu1 from './module/homemenu1';
import HomeMenu2 from './module/homemenu2';
import ProductList from './module/homeproductlist';
import CollectionList from './module/homeCollectionlist';

// Admin Modules
import Admin from './module/admin';
import AddMenu from './module/adminmenu';
import AdminOrders from './module/adminoderpage';
import AdminProductlist from './module/adminProductlist';
import UploadProductlist from './module/uploadproduct';
import AdminUpdateProductList from './module/adminUpdateProductlist';
import AdminCollectionlist from './module/adminCollection';
import UploadCollectionlist from './module/uploadCollection';
import AdminUpdateCollectionList from './module/adminupdatecollection';

// Styles
import './App.css';
import NewArrivals from './module/newarrivals';
import ProductDetail from './module/selectedProductviewPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <UtilityProvider>
            <CartProvider>
              <ProductProvider>
                <Navbar />
                <Routes>
                  {/* User Routes */}
                  <Route path='/' element={<Home />} />
                  <Route path='/user/login' element={<Login />} />
                  <Route path='/user/register' element={<Register />} />
                  <Route path='/user/cart' element={<Cartlist />} />
                  <Route path='/user/checkout' element={<Checkout />} />
                  <Route path='/user/orders' element={<UserOrders />} />

                  {/* Home Menus and Lists */}
                  <Route path='/homemenu1' element={<HomeMenu1 />} />
                  <Route path='/homemenu2' element={<HomeMenu2 />} />
                  <Route path='/productlist/:id' element={<ProductList />} />
                  <Route path='/collectionlist' element={<CollectionList />} />
                  <Route path='/new/arrivals' element={<NewArrivals />} />
                   <Route path='/productdetails/:id' element={<ProductDetail />} />
                  

                  {/* Admin Routes */}
                  <Route path='/admin/home' element={<Admin />} />
                  <Route path='/admin/menu' element={<AddMenu />} />
                  <Route path='/admin/oder/management' element={<AdminOrders />} />
                  <Route path='/admin/productlist' element={<AdminProductlist />} />
                  <Route path='/admin/upload/productlist' element={<UploadProductlist />} />
                  <Route path='/admin/productlist/updateproduct/:id' element={<AdminUpdateProductList />} />
                  <Route path='/admin/collectionlist' element={<AdminCollectionlist />} />
                  <Route path='/admin/upload/collectionlist' element={<UploadCollectionlist />} />
                  <Route path='/admin/update/collectionlist/:id' element={<AdminUpdateCollectionList />} />

                 
                  <Route path='/navbar' element={<Navbar />} />
                </Routes>
              </ProductProvider>
            </CartProvider>
          </UtilityProvider>
        </CollectionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

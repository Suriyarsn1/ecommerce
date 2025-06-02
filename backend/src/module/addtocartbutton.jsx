
import { ProductContext } from '../context/productContext'
import { Authcontext } from '../context/authContexts'
import { useContext } from 'react'
function AddCartButton(){
    const {cartbuttonText}=useContext( ProductContext )
    return(<>
    <button  className='pt-2 pb-2 pl-3 pr-3 rounded-md bg-blue-400 hover:bg-blue-600 '>{cartbuttonText}</button>
    </>)
}export default AddCartButton
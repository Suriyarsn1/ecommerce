import party from '../Assets/celebiration/party.jpg'
import vaction from '../Assets/celebiration/vaction.jpg'
import onam from '../Assets/celebiration/onam.jpg'
import weding from '../Assets/celebiration/weding.jpg'
import chirst from '../Assets/celebiration/christmas.jpg'
import dewali from '../Assets/celebiration/dewali.jpg'
import { useEffect,useState } from 'react'
import axios from 'axios';



function Partysession(){

    const[getSProduct,setSProduct]=useState([])

useEffect(()=>{
    
    const fetchProduct= async ()=>
{
    try{
        await axios.get('http://localhost:5000/api/getsproduct').then((data)=>setSProduct(data.data.Product)).catch((err)=>{console.log(err)})
    }
    catch(err)
    {
       console.log(err)
    }

}
fetchProduct()

},[])

    return(
        <>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Card 1 */}
  <div className="mt-8 lg:mt-48">
    <div className="relative hover:scale-105 transition duration-300">
      <img
        className="rounded-xl w-full h-72 object-cover"
        src={dewali}
        alt="Dewali"
      />
      <p className="absolute bottom-4 left-4 z-20 text-white text-xl font-thin">
        Dewali
      </p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="grid grid-rows-2 gap-4">
    <div>
      <div className="relative hover:scale-105 transition duration-300">
        <img
          className="rounded-xl w-full h-72 object-cover"
          src={onam}
          alt="Onam"
        />
        <p className="absolute bottom-4 left-4 z-20 text-white text-xl font-thin">
          Onam
        </p>
      </div>
    </div>
    <div>
      <div className="relative hover:scale-105 transition duration-300">
        <img
          className="rounded-xl w-full h-72 object-cover"
          src={party}
          alt="Party"
        />
        <p className="absolute bottom-4 left-4 z-20 text-white text-xl font-thin">
          Party
        </p>
      </div>
    </div>
  </div>

  {/* Card 3 */}
  <div className="grid grid-rows-2 gap-4">
    <div>
      <div className="relative hover:scale-105 transition duration-300">
        <img
          className="rounded-xl w-full h-72 object-cover"
          src={vaction}
          alt="Vacation"
        />
        <p className="absolute bottom-4 left-4 z-20 text-white text-xl font-thin">
          Vacation
        </p>
      </div>
    </div>
    <div>
      <div className="relative hover:scale-105 transition duration-300">
        <img
          className="rounded-xl w-full h-72 object-cover"
          src={chirst}
          alt="Chirst"
        />
        <p className="absolute bottom-4 left-4 z-20 text-white text-xl font-thin">
          Chirst
        </p>
      </div>
    </div>
  </div>

  {/* Card 4 */}
  <div className="mt-8 lg:mt-48">
    <div className="relative hover:scale-105 transition duration-300">
      <img
        className="rounded-xl w-full h-72 object-cover"
        src={weding}
        alt="Wedding"
      />
      <p className="absolute bottom-4 left-4 z-20 text-white text-xl font-thin">
        Wedding
      </p>
    </div>
  </div>
</div>

        </>
    )
}export default Partysession
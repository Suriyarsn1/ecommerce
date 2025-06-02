import Downarrow from '../Assets/icons/darrow.png'
import { useContext} from 'react'
import { UtilityContext } from '../context/menuContext'
function HomeMenu1() {
     const {menu}=useContext(UtilityContext)
 console.log(menu)

    return (<>
        <div className='bg-white flex justify-center gap-4 p-3'>

            {
                menu.filter((p) => p.menuCat === 'Categeroy 1').map((item, index) => (
                   
                        <div key={index} className='flex relative group items-center gap-2'>
                            <p className='text-xl font-extralight cursor-default'>{item.menuTitle}</p>
                            <img className='w-6 h-6 cursor-pointer ' src={Downarrow} alt="arrow" />
                        {item.subMenuTitle.length>0 && (
                            <div className='absolute z-10 top-full left-0 text-gray-800 opacity-90 pl-7 pr-7 font-extralight p-3 bg-white rounded hidden group-hover:block'>
                               {item.subMenuTitle.map((submenu,idx)=>(
                              <a key={idx} className='hover: text-black' href="">{submenu}</a>
                               ))}
                            </div>
                        )}


                        </div>

                   ))
            }

       </div>
    </>)
} export default HomeMenu1
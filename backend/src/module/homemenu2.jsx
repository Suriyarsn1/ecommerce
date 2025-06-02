import { useContext, useState } from 'react'
import { UtilityContext } from '../context/menuContext'
import { CollectionContext } from '../context/collectionContext'


function HomeMenu2() {
  const { menu} = useContext(UtilityContext)
  const { handleSelectedMenu } = useContext(CollectionContext)
  

  return (
    <>
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl mt-16 sm:mt-24 md:mt-28 font-medium">
        SHOP THE LATEST
      </h1>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 md:gap-7 text-gray-500 mt-6 sm:mt-10 text-lg sm:text-xl md:text-2xl font-thin w-full px-2">
        {menu
          .filter((p) => p.menuCat === 'Categeroy 2')
          .map((item, index) => (
            <div className="relative group w-full sm:w-auto" key={index}>
              <button
                onClick={() => handleSelectedMenu(item._id)}
                className="w-full sm:w-auto text-left hover:text-black hover:underline cursor-pointer px-2 py-2 rounded transition"
              >
                {item.menuTitle}
              </button>
            </div>
          ))}
      </div>
    </>
  )
}

export default HomeMenu2

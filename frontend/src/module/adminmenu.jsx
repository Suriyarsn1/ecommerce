import { useEffect, useState } from "react"
import axios from "axios"

function AddMenu() {
  const [menuTitle, setMenuTitle] = useState('')
  const [menu, setMenu] = useState([])
  const [menuCat, setMenuCat] = useState('')
  const [subMenuTitle, setSubMenuTitle] = useState('')
  const [subMcatId, setsubMcatId] = useState('')
  const [msg, setMsg] = useState('')
  const [menuCatFilter, setMenuCatFilter] = useState([])

  useEffect(() => { fetchMenu() }, [])

  const fetchMenu = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/getmenu')
      setMenu(res.data)
    }
    catch (err) { console.log(err) }
  }

  const handleSubmit = async () => {
    if (!menuCat || !menuTitle) { return setMsg('Must enter the MenuCat and MenuTitle') }
    await axios.post('http://localhost:5000/api/addmenu', { menuTitle, menuCat })
      .then((data) => { setMsg(data.data.message) }).catch((err) => { setMsg(err.message) })
    setMenuCat('')
    setMenuTitle('')
    fetchMenu()
  }

  const handleCatfilter = (selectCat) => {
    setMenuCatFilter(menu.filter((p) => p.menuCat === selectCat))
  }

  const handleSubmitSubmenu = async () => {
    if (!subMcatId || !subMenuTitle) { return setMsg('Must Select main menu and Write Submenu ') }
    await axios.post(`http://localhost:5000/api/addsubmenu/${subMcatId}`, { subMenuTitle })
      .then((data) => { setMsg(data.data.message) }).catch((err) => { setMsg(err.message) })
    setSubMenuTitle('')
    fetchMenu()
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/deletemenu/${id}`)
    fetchMenu()
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in-up">Add Menu Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Menu Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-4">Add Main Menu</h2>
          <label className="block mb-1 font-light">Menu Title:</label>
          <input
            type='text'
            value={menuTitle}
            onChange={(e) => setMenuTitle(e.target.value)}
            className='w-full p-2 mb-3 border border-gray-300 bg-transparent rounded-lg outline-none font-thin'
          />
          <label className="block mb-1 font-light">Menu Category:</label>
          <select
            value={menuCat}
            onChange={(e) => setMenuCat(e.target.value)}
            className='w-full mb-3 p-2 border border-gray-300 rounded-lg'
          >
            <option value="">Select Category</option>
            <option value="Categeroy 1">Title Navbar</option>
            <option value="Categeroy 2">Middle Navbar</option>
          </select>
          <button
            onClick={handleSubmit}
            className='w-full px-5 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-pulse'
          >
            Add Menu
          </button>
          <div className="text-sm text-green-600 mt-2">{msg}</div>
        </div>

        {/* Add Submenu Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-4">Add SubMenu</h2>
          <label className="block mb-1 font-light">Menu Category:</label>
          <select
            onChange={(e) => handleCatfilter(e.target.value)}
            className='w-full mb-3 p-2 border border-gray-300 rounded-lg'
          >
            <option value="">Select Main Menu Category</option>
            <option value="Categeroy 1">Title Navbar</option>
            <option value="Categeroy 2">Middle Navbar</option>
          </select>
          <label className="block mb-1 font-light">Main Menu:</label>
          <select
            onChange={(e) => setsubMcatId(e.target.value)}
            className='w-full mb-3 p-2 border border-gray-300 rounded-lg'
          >
            <option value="">Select Main Menu</option>
            {menuCatFilter.map((item, index) => (
              <option key={index} value={item._id}>{item.menuTitle}</option>
            ))}
          </select>
          <label className="block mb-1 font-light">SubMenu:</label>
          <input
            type='text'
            value={subMenuTitle}
            onChange={(e) => setSubMenuTitle(e.target.value)}
            className='w-full p-2 mb-3 border border-gray-300 bg-transparent rounded-lg outline-none font-thin'
          />
          <button
            onClick={handleSubmitSubmenu}
            className='w-full px-5 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-pulse'
          >
            Add Submenu
          </button>
        </div>
      </div>

      {/* Menu Lists */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Title Navbar */}
        <div className="bg-white shadow-lg rounded-xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-4">Title Nav Bar Menus</h2>
          <div className="space-y-4">
            {menu.filter((p) => p.menuCat === 'Categeroy 1').map((item, index) => (
              <div key={index} className="p-3 border rounded-lg flex flex-col gap-2 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.menuTitle}</span>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-50 hover:shadow-lg hover:shadow-red-500/30 transition duration-300 animate-pulse"
                  >
                    Delete
                  </button>
                </div>
                <ul className="pl-3 list-disc">
                  <span className="font-light text-sm">Submenus:</span>
                  {item.subMenuTitle.map((sub, idx) => (
                    <li key={idx} className="text-sm">{sub}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Navbar */}
        <div className="bg-white shadow-lg rounded-xl p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-4">Middle Nav Bar Menus</h2>
          <div className="space-y-4">
            {menu.filter((p) => p.menuCat === 'Categeroy 2').map((item, index) => (
              <div key={index} className="p-3 border rounded-lg flex flex-col gap-2 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.menuTitle}</span>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-50 hover:shadow-lg hover:shadow-red-500/30 transition duration-300 animate-pulse"
                  >
                    Delete
                  </button>
                </div>
                <ul className="pl-3 list-disc">
                  <span className="font-light text-sm">Submenus:</span>
                  {item.subMenuTitle.map((sub, idx) => (
                    <li key={idx} className="text-sm">{sub}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-200 border border-black rounded-lg flex flex-col items-center p-4">
          <h3 className="mb-2 font-semibold">Title NavBar Preview</h3>
          <iframe className="w-full h-56 rounded" src="/homemenu1" title="Title Navbar Preview"></iframe>
        </div>
        <div className="bg-slate-200 border border-black rounded-lg flex flex-col items-center p-4">
          <h3 className="mb-2 font-semibold">Middle NavBar Preview</h3>
          <iframe className="w-full h-56 rounded" src="/homemenu2" title="Middle Navbar Preview"></iframe>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  )
}

export default AddMenu;

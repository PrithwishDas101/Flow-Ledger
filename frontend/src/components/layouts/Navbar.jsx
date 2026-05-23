import { useState } from 'react';
import { LuMenu, LuX } from "react-icons/lu";
import SideMenu from './SideMenu.jsx';

const Navbar = ({ activeMenu }) => {

    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className='flex gap-5 bg-amber-50 border-b-2 border-gray-200/50 backdrop-blur-[2px] px-4 py-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}
            >

                {openSideMenu ? (
                    <LuX className='text-[26px]' />
                ) : (
                    <LuMenu className='text-[26px]' />
                )}
            </button>

            <div className='flex flex-col'>
                <h2 className='text-2xl font-medium text-black font-Unbounded'>Flow Ledger</h2>
            </div>


            {openSideMenu && (
                <div className='fixed top-15.25 -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar
import { useState } from 'react';
import { LuMenu, LuX } from "react-icons/lu";
import SideMenu from './SideMenu.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <header className="app-navbar flex items-center gap-4 px-4 py-4 sm:px-6 sticky top-0 z-30">
            <button
                type="button"
                className="block lg:hidden app-icon-button"
                onClick={() => setOpenSideMenu((open) => !open)}
                aria-label={openSideMenu ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={openSideMenu}
            >
                {openSideMenu ? <LuX className="text-2xl" /> : <LuMenu className="text-2xl" />}
            </button>

            <div className="flex min-w-0 flex-col">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight font-Unbounded">Flow Ledger</h2>
                <p className="hidden sm:block text-xs app-muted mt-0.5">Your money, in focus.</p>
            </div>

            <div className="ml-auto flex items-center gap-3">
                <ThemeToggle />
            </div>

            {openSideMenu && (
                <div className="mobile-menu-panel fixed top-[4.5rem] left-0 right-0 mx-3 rounded-2xl shadow-xl lg:hidden">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </header>
    );
};

export default Navbar;

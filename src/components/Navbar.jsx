import React, { useState } from 'react';
import logo from '../assest/l.png';
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    user?.email ? (
      <>
        <header className="bg-black sticky top-0 z-50">
          <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Trackify</span>
                <img alt="Trackify logo" src={logo} className="h-10 w-auto" />
              </Link>
            </div>

            <form onSubmit={handleSearch} className="flex lg:flex-1 lg:justify-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-[200px] max-w-md px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
              />
              <button type="submit" className="ml-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </form>

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6 text-white" />
              </button>
            </div>

            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <Link to="#" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">All</Link>
              <Link to="#" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">Music</Link>
              <Link to="#" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">Podcasts</Link>
              <Link to="#" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">Library</Link>
            </PopoverGroup>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                Log out <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>

          <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
            <div className="fixed inset-0 z-10 bg-black/70" />
            <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-black text-white px-6 py-6">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Trackify</span>
                  <img alt="Trackify logo" src={logo} className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-300"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700">All</Link>
                    <Link to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700">Music</Link>
                    <Link to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700">Podcasts</Link>
                    <Link to="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700">Library</Link>
                  </div>
                  <div className="py-6">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                    />
                    <button type="submit" onClick={handleSearch} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-700">
                      Search
                    </button>
                    <Link onClick={handleLogout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-700">
                      Log Out
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>
      </>
    ) : (
      <header className="bg-black sticky top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Trackify</span>
              <img alt="Trackify logo" src={logo} className="h-10 w-auto" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6 text-white" />
            </button>
          </div>

          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Link to="/signup" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">Signup</Link>
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"> Log in <span aria-hidden="true">&rarr;</span></Link>
          </PopoverGroup>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
          <div className="fixed inset-0 z-10 bg-black/70" />
          <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm overflow-y-auto bg-black text-white px-6 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Trackify</span>
                <img alt="Trackify logo" src={logo} className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-300"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link to="/signup" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700">Sign Up</Link>
                  <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-700"> Log in <span aria-hidden="true">&rarr;</span></Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    )
  );
};

export default Navbar;

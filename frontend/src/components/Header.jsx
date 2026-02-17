// Header.jsx - UPDATED VERSION with Wooden Street style mobile header
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, User, ShoppingCart, Menu, X, Heart, MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Check login status on mount and when storage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      const name = localStorage.getItem('username') || localStorage.getItem('first_name') || 'User';
      
      if (token && id) {
        setIsLoggedIn(true);
        setUserName(name);
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };
    
    checkAuthStatus();
    
    // Listen for storage changes (login/logout from other tabs/windows)
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  // Fetch wishlist count and listen for updates
  useEffect(() => {
    const fetchWishlistCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { setWishlistCount(0); return; }
        const res = await API.get('/api/wishlist');
        const data = Array.isArray(res.data) ? res.data : (res.data.wishlist || res.data.items || []);
        setWishlistCount(data.length);
      } catch (err) {
        console.warn('Could not fetch wishlist count:', err);
      }
    };

    fetchWishlistCount();
    const onUpdate = () => fetchWishlistCount();
    window.addEventListener('wishlistUpdated', onUpdate);
    return () => window.removeEventListener('wishlistUpdated', onUpdate);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
    window.location.reload();
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/userprofile');
    } else {
      navigate('/login');
    }
  };

  // Main categories with their slugs
  const [categories] = useState([
    { _id: '1', name: 'Sofas', slug: 'sofas' },
    { _id: '2', name: 'Living', slug: 'living' },
    { _id: '3', name: 'Bedroom', slug: 'bedroom' },
    { _id: '4', name: 'Dining & Kitchen', slug: 'dining-kitchen' },
    { _id: '5', name: 'Storage', slug: 'storage' },
    { _id: '6', name: 'Study & Office', slug: 'study-office' },
    { _id: '7', name: 'Custom Furniture', slug: 'custom-furnitures' }
  ]);
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(0);
  const timeoutRef = useRef(null);
  const subMenuTimeoutRef = useRef(null);

  // Comprehensive menu data for all categories
  const menuData = {
    'Sofas': {
      sections: [
        {
          title: 'SOFA SETS',
          items: [ 'Sofas','Sofa Cum Beds', '3 Seater Sofas', '1 Seater Sofas', '3+1+1 Sofa Sets', 'L Shaped Sofas'],
          hasDropdown: true
        },
        
      ]
    },
    'Bedroom': {
      sections: [
        {
          title: 'BEDS',
          items: ['King Size Beds', 'Queen Size Beds', 'Single Beds',  'Hydraulic Storage Beds', 'Poster Beds','Sofa Cum Beds' ],
          hasDropdown: true
        },
        {
          title: 'WARDROBES',
          items: ['Wooden Wardrobe'],
          hasDropdown: true
        },
         {
          title: 'DRESSING TABLES',
          items: ['Wooden Dressing Table'],
          hasDropdown: true
        },
            {
          title: 'BED SIDES',
          items: ['Bed Side Table'],
          hasDropdown: true
        },
      ]
    },
    'Living': {
      sections: [
        {
          title: 'LIVING STORAGE',
          items: ['TV Units', 'Temples','Book Shelves', 'Display Units', 'Shoe Racks', 'Sideboards', 'Chest of Drawers','Trunk Box'],
          hasDropdown: true
        },
        {
          title: 'SEATING & CHAIRS',
          items: ['Chairs', 'Stools', 'Benches', 'Swings'],
          hasDropdown: true
        },
        {
          title: 'TABLES',
          items: ['Coffee Tables', 'Side Tables', 'Console Tables'],
          hasDropdown: true
        },
         {
          title: 'DECOR',
          items: [ 'Wall Shelves & Hanger', 'Wall Mirrors'],
          hasDropdown: true
        },
        {
          title: 'SEATING',
          items: ['Wooden Diwan', 'Benches', 'Stools' ],
          hasDropdown: true
        }
      ]
    },
    'Dining & Kitchen': {
      sections: [
        {
          title: 'DINING FURNITURE',
          items: ['Dining Table Sets', '2 Seater Dining Sets','4 Seater Dining Sets','6 Seater Dining Sets', 'Dining Tables','Dining Chairs', 'Benches'],
          hasDropdown: true
        },
        {
          title: 'KITCHEN FURNITURE' ,
          items: [ 'Kitchen Cabinets & SideBoards' , 'Crockery Units', ],
          hasDropdown: true
        },
         {
          title: 'KITCHENWARE' ,
          items: [ 'Wooden Tray' , 'Wooden Jars', 'Spice Box','Chopping Board' ,'Coasters' ,'Tissue Box' ],
          hasDropdown: true
        }
      ]
    },
    'Storage': {
      sections: [
        {
          title: 'LIVING STORAGE',
          items: ['TV Units', 'Book Shelves' ,'Display Units' , 'Shoe Racks' ,'Temples' ,'Magazine Racks' ,'Wooden Corner','Trunk Box' ],
          hasDropdown: true
        },
        {
          title: 'BEDROOM STORAGE',
          items: ['Chest of Drawers', 'Wooden Wardrobe' ,'Bed Side Tables' , 'Wooden Dressing Table' ,'Almira'  ],
          hasDropdown: true
        },
        {
          title: 'BAR FURNITURE',
          items: ['Bar Cabinets' ],
          hasDropdown: true
        }
      ]
    },
    'Study & Office': {
      sections: [
        {
          title: 'TABLES',
          items: [ 'Study Tables', 'Computer Tables','Wall Mounted Study Table'],
          hasDropdown: true
        },
        {
          title: 'STORAGE',
          items: ['Wooden Corner'],
          hasDropdown: true
        }
      ]
    },
    'Custom Furniture': {
      sections: [],
      hasDropdown: false,
      link: '/contact-us'
    }
  };

  // Navigate function that handles both category and subcategory clicks
  const navigateToSlug = (itemName, isMainCategory = false) => {
    // Close all menus
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
    setActiveSubMenu(null);
    setActiveMobileSubmenu({});

    // If it's a main category click, use the category slug
    if (isMainCategory) {
      const category = categories.find(cat => cat.name === itemName);
      if (category) {
        navigate(`/${category.slug}`);
        return;
      }
    }

    // For subcategory items, create slug from the item name
    const slug = itemName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\+/g, '')
      .replace(/&/g, '');
    
    navigate(`/${slug}`);
  };

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
    }, 300);
  };

  const handleSubMenuEnter = (sectionTitle) => {
    if (subMenuTimeoutRef.current) clearTimeout(subMenuTimeoutRef.current);
    setActiveSubMenu(sectionTitle);
  };

  const handleSubMenuLeave = () => {
    subMenuTimeoutRef.current = setTimeout(() => setActiveSubMenu(null), 200);
  };

  const toggleMobileSubmenu = (menu, section) => {
    const key = `${menu}-${section}`;
    setActiveMobileSubmenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (subMenuTimeoutRef.current) clearTimeout(subMenuTimeoutRef.current);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* MOBILE HEADER - Wooden Street Style */}
          <div className="lg:hidden flex items-center justify-between py-1">
            {/* Left - Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center" onClick={() => navigate('/')}>
              <img 
                src="/SFV Log 637x154 Pxl.png" 
                alt="Sri Furniture Village" 
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Right - Icons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/wishlist')} 
                className="p-2 relative"
              >
                <Heart className="h-6 w-6 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => navigate('/cart')}
                className="p-2 relative"
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH BAR - Below header */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (searchQuery || '').trim();
                    if (q) navigate(`/search?search=${encodeURIComponent(q)}`);
                  }
                }}
                placeholder="Search Products, Color & More..."
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
              />
              <button
                onClick={() => {
                  const q = (searchQuery || '').trim();
                  if (q) navigate(`/search?search=${encodeURIComponent(q)}`);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* DESKTOP HEADER - Original Design */}
          <div className="hidden lg:flex items-center justify-between py-4 border-b border-gray-100">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="/SFV Log 637x154 Pxl.png" 
                alt="Sri Furniture Village Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Search Bar (desktop) */}
            <div className="flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const q = (searchQuery || '').trim();
                      if (q) navigate(`/search?search=${encodeURIComponent(q)}`);
                    }
                  }}
                  placeholder="Search Products, Color & More..."
                  className="w-full px-4 py-2.5 pr-10 border border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                />
                <button
                  onClick={() => {
                    const q = (searchQuery || '').trim();
                    if (q) navigate(`/search?search=${encodeURIComponent(q)}`);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <a href="#location" className="flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group">
                <MapPin className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Stores</span>
              </a>

              <button 
                onClick={handleProfileClick}
                className="flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group p-2"
                title={isLoggedIn ? `View ${userName}'s Profile` : "Login to view profile"}
              >
                <User className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{isLoggedIn ? 'Profile' : 'Login'}</span>
              </button>

              {isLoggedIn && (
                <button 
                  onClick={handleLogout}
                  className="flex flex-col items-center text-gray-700 hover:text-red-600 transition-colors group p-2"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">Logout</span>
                </button>
              )}

              <button onClick={() => navigate('/wishlist')} className="flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group p-2">
                <Heart className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Wishlist ({wishlistCount})</span>
              </button>

              <button 
                onClick={() => navigate('/cart')}
                className="flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group relative p-2"
              >
                <ShoppingCart className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Cart (0)</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Bar - Desktop Only */}
          <nav className="hidden lg:flex items-center justify-center space-x-1 py-3">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(cat.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  onClick={() => navigateToSlug(cat.name, true)} 
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeMenu === cat.name 
                      ? 'text-orange-600 border-b-2 border-orange-600' 
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {cat.name}
                  {menuData[cat.name] && <ChevronDown className="h-4 w-4 inline ml-1 align-sub" />}
                </button>

                {/* Dropdown Menu (for desktop) */}
                {activeMenu === cat.name && menuData[cat.name] && (
                  <div
                    className="absolute left-0 top-full mt-2 bg-white shadow-2xl rounded-lg border border-gray-100 z-50"
                    style={{ minWidth: '220px' }}
                    onMouseEnter={() => handleMouseEnter(cat.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2">
                      {menuData[cat.name].sections.map((section, idx) => (
                        <div 
                          key={idx} 
                          className="relative"
                          onMouseEnter={() => section.hasDropdown && handleSubMenuEnter(section.title)}
                          onMouseLeave={handleSubMenuLeave}
                        >
                          <button
                            onClick={() => !section.hasDropdown && navigateToSlug(section.title)}
                            className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between group"
                          >
                            {section.title}
                            {section.hasDropdown && (
                              <ChevronDown className="h-4 w-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                            )}
                          </button>

                          {/* Nested Dropdown for subcategories */}
                          {section.hasDropdown && activeSubMenu === section.title && (
                            <div
                              className="absolute left-full top-0 ml-1 bg-white shadow-2xl rounded-lg border border-gray-100 z-50"
                              style={{ minWidth: '200px' }}
                              onMouseEnter={() => handleSubMenuEnter(section.title)}
                              onMouseLeave={handleSubMenuLeave}
                            >
                              <div className="py-2">
                                {section.items.map((item, itemIdx) => (
                                  <button
                                    key={itemIdx}
                                    onClick={() => navigateToSlug(item, false)}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center group"
                                  >
                                    <span className="w-1 h-1 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {item}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-600 to-orange-500">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="p-4">
          {categories.map((cat) => (
            <div key={cat._id} className="border-b border-gray-200">
              <button
                onClick={() => {
                  if (menuData[cat.name]) {
                    setActiveMenu(activeMenu === cat.name ? null : cat.name);
                  } else {
                    navigateToSlug(cat.name, true); 
                  }
                }}
                className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800 hover:text-orange-600 transition-colors"
              >
                {cat.name}
                {menuData[cat.name] && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeMenu === cat.name ? 'rotate-180 text-orange-600' : ''
                    }`}
                  />
                )}
              </button>

              {activeMenu === cat.name && menuData[cat.name] && (
                <div className="pb-4 space-y-4">
                  <div className="pl-4 mb-2">
                    <button
                      onClick={() => navigateToSlug(cat.name, true)}
                      className="text-sm font-semibold text-orange-600 hover:text-orange-700 underline"
                    >
                      View All {cat.name}
                    </button>
                  </div>

                  {menuData[cat.name].sections.map((section, idx) => (
                    <div key={idx} className="pl-4">
                      <button
                        onClick={() => toggleMobileSubmenu(cat.name, section.title)}
                        className="flex items-center justify-between w-full text-xs font-bold text-orange-600 uppercase tracking-wider mb-2"
                      >
                        {section.title}
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            activeMobileSubmenu[`${cat.name}-${section.title}`] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {activeMobileSubmenu[`${cat.name}-${section.title}`] && (
                        <ul className="space-y-2 pl-3">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <button 
                                onClick={() => navigateToSlug(item, false)}
                                className="block w-full text-left py-1.5 text-sm text-gray-600 hover:text-orange-600 hover:translate-x-1 transition-all"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Login/Sign Up Button */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {isLoggedIn ? (
            <>
              <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-800">Welcome, {userName}!</p>
              </div>
              <button 
                onClick={() => {
                  navigate('/userprofile');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors mb-2"
              >
                View Profile
              </button>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                navigate('/login');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors mb-2"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, User, ShoppingCart, Menu, X, Heart } from 'lucide-react';

const Header = () => {
  const [categories] = useState([
    { _id: '1', name: 'Sofas', slug: 'sofas' },
    { _id: '2', name: 'Bedroom', slug: 'bedroom' },
    { _id: '3', name: 'Living', slug: 'living' },
    { _id: '4', name: 'Dining & Kitchen', slug: 'dining-kitchen' },
    { _id: '5', name: 'Storage', slug: 'storage' },
    { _id: '6', name: 'Study & Office', slug: 'study-office' },
    { _id: '7', name: 'Mattresses', slug: 'mattresses' },
    { _id: '8', name: 'Home Furnishing', slug: 'home-furnishing' }
  ]);
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const timeoutRef = useRef(null);

  // ✅ Slug mapping for dropdown items - ye backend se match hona chahiye
  const slugMap = {
    'All Sofas': 'all-sofas',
    'Fabric Sofas': 'fabric-sofas',
    'Wooden Sofas': 'wooden-sofas',
    '3 Seater Sofas': '3-seater-sofas',
    '2 Seater Sofas': '2-seater-sofas',
    '1 Seater Sofas': '1-seater-sofas',
    '3+1+1 Sofa Sets': '3-1-1-sofa-sets',
    'Sofa Cum Beds': 'sofa-cum-beds',
    'L Shaped Sofas': 'l-shaped-sofas',
    'Chaise Loungers': 'chaise-loungers',
    'Outdoor Sofas': 'outdoor-sofas',
    'Diwans': 'diwans',
    'All Beds': 'all-beds',
    'Solid Wood Beds': 'solid-wood-beds',
    'Engineered Wood Beds': 'engineered-wood-beds',
    'Upholstered Beds': 'upholstered-beds',
    'Hydraulic Storage Beds': 'hydraulic-storage-beds',
    'Poster Beds': 'poster-beds',
    'Kids Beds': 'kids-beds',
    'Metal Beds': 'metal-beds',
    'King Size Beds': 'king-size-beds',
    'Queen Size Beds': 'queen-size-beds',
    'Double Beds': 'double-beds',
    'Single Beds': 'single-beds',
    'TV Units': 'tv-units',
    'Book Shelves': 'book-shelves',
    'Display Units': 'display-units',
    'Shoe Racks': 'shoe-racks',
    'Sideboards': 'sideboards',
    'Chest of Drawers': 'chest-of-drawers'
    // Add more as needed - ya backend se dynamically fetch karo
  };

  const menuData = {
    'Sofas': {
      sections: [
        {
          title: 'SOFA SETS',
          items: ['All Sofas', 'Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', '3+1+1 Sofa Sets']
        },
        {
          title: 'SOFA TYPES',
          items: ['Sofa Cum Beds', 'L Shaped Sofas', 'Chaise Loungers', 'Outdoor Sofas', 'Diwans']
        }
      ]
    },
    'Bedroom': {
      sections: [
        {
          title: 'BEDS',
          items: ['All Beds', 'Solid Wood Beds', 'Engineered Wood Beds', 'Upholstered Beds', 'Hydraulic Storage Beds', 'Poster Beds', 'Kids Beds', 'Metal Beds']
        },
        {
          title: 'BY SIZE',
          items: ['King Size Beds', 'Queen Size Beds', 'Double Beds', 'Single Beds']
        }
      ]
    },
    'Living': {
      sections: [
        {
          title: 'STORAGE',
          items: ['TV Units', 'Book Shelves', 'Display Units', 'Shoe Racks', 'Sideboards', 'Chest of Drawers']
        },
        {
          title: 'SEATING & CHAIRS',
          items: ['Chairs', 'Stools', 'Benches', 'Swings']
        }
      ]
    }
  };

  // ✅ Navigate to slug
  const navigateToSlug = (itemName) => {
    const slug = slugMap[itemName] || itemName.toLowerCase().replace(/\s+/g, '-').replace(/\+/g, '');
    window.location.href = `/${slug}`;
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
    setActiveMobileSubmenu({});
  };

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
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
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-center py-2 text-sm font-medium">
        <p>🎉 Welcome to Sri Furniture Village - Free Delivery on Orders Above ₹10,000</p>
      </div>

      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <img 
              src="\SFV Log 637x154 Pxl.png" 
              alt="Sri Furniture Village Logo" 
              className="h-20 w-auto object-contain"
            />
            {/* <span className="text-xl font-bold text-orange-600">Sri Furniture Village</span> */}
          </div>



            <nav className="hidden lg:flex items-center space-x-1">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(cat.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    onClick={() => window.location.href = `/${cat.slug}`}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-all duration-200 flex items-center group"
                  >
                    {cat.name}
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {activeMenu === cat.name && menuData[cat.name] && (
                    <div
                      className="absolute left-0 top-full mt-0 bg-white shadow-2xl rounded-lg border border-gray-100 min-w-[600px] z-50"
                      onMouseEnter={() => handleMouseEnter(cat.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-8">
                          {menuData[cat.name].sections.map((section, idx) => (
                            <div key={idx}>
                              <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3 pb-2 border-b border-orange-100">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <button 
                                      onClick={() => navigateToSlug(item)}
                                      className="text-sm text-gray-600 hover:text-orange-600 hover:translate-x-1 transition-all duration-200 flex items-center group"
                                    >
                                      <span className="w-1 h-1 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                {searchOpen ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 text-sm"
                      autoFocus
                    />
                    <button onClick={() => setSearchOpen(false)} className="ml-2">
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Search className="h-5 w-5 text-gray-600" />
                  </button>
                )}
              </div>

              <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>

              <button 
                onClick={() => window.location.href = '/login'}
                className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>

              <button 
                onClick={() => window.location.href = '/cart'}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                onClick={() => setActiveMenu(activeMenu === cat.name ? null : cat.name)}
                className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800 hover:text-orange-600 transition-colors"
              >
                {cat.name}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeMenu === cat.name ? 'rotate-180 text-orange-600' : ''
                  }`}
                />
              </button>

              {activeMenu === cat.name && menuData[cat.name] && (
                <div className="pb-4 space-y-4">
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
                                onClick={() => navigateToSlug(item)}
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

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors mb-2"
          >
            Login / Sign Up
          </button>
          <button className="w-full py-3 border border-orange-600 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors">
            Track Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
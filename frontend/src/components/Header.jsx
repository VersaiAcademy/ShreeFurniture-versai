import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, User, ShoppingCart, Menu, X, Heart, MapPin } from 'lucide-react';

const Header = () => {
  const [categories] = useState([
    { _id: '1', name: 'Sofas', slug: 'sofas' },
    { _id: '2', name: 'Living', slug: 'living' },
    { _id: '3', name: 'Bedroom', slug: 'bedroom' },
    { _id: '4', name: 'Dining & Kitchen', slug: 'dining-kitchen' },
    { _id: '5', name: 'Storage', slug: 'storage' },
    { _id: '6', name: 'Study & Office', slug: 'study-office' },
    { _id: '7', name: 'Custom Furniture', slug: 'custom-furnitures' },
    // { _id: '8', name: 'Home Furnishing', slug: 'home-furnishing' }, // Uncommented
    // { _id: '9', name: 'Lighting & Decor', slug: 'lighting-decor' }, // Uncommented
    // { _id: '10', name: 'Interiors', slug: 'interiors' } // Uncommented
  ]);
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const timeoutRef = useRef(null);

  // Consolidated slug map for deep links
  const slugMap = {
    'All Sofas': 'all-sofas',
    'Fabric Sofas': 'fabric-sofas',
    'Wooden Sofas': 'wooden-sofas',
    '3 Seater Sofas': '3-seater-sofas',
    // ... (rest of your existing slug map)
    'All Beds': 'all-beds',
    'Solid Wood Beds': 'solid-wood-beds',
    // ... (rest of your existing slug map)
    'TV Units': 'tv-units',
    'Book Shelves': 'book-shelves',
    'Display Units': 'display-units',
    'Shoe Racks': 'shoe-racks',
    'Sideboards': 'sideboards',
    'Chest of Drawers': 'chest-of-drawers',
    'Dining Tables': 'dining-tables',
    'Dining Chairs': 'dining-chairs',
    'Modular Kitchens': 'modular-kitchens',
    'Office Desks': 'office-desks',
    'Office Chairs': 'office-chairs',
    'Custom Sofas': 'custom-sofas',
    'Custom Wardrobes': 'custom-wardrobes',
    'Rugs': 'rugs',
    'Curtains': 'curtains',
    'Pillows & Cushions': 'pillows-cushions',
    'Floor Lamps': 'floor-lamps',
    'Wall Art': 'wall-art',
    'Vases': 'vases',
    'Modular Wardrobes': 'modular-wardrobes',
    'Full Home Interiors': 'full-home-interiors'
  };

  // Comprehensive menu data for all categories
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
    },
    'Dining & Kitchen': {
      sections: [
        {
          title: 'DINING',
          items: ['Dining Tables', 'Dining Chairs', 'Dining Sets']
        },
        {
          title: 'KITCHEN',
          items: ['Modular Kitchens', 'Kitchen Cabinets', 'Pantry Units']
        }
      ]
    },
    'Storage': {
      sections: [
        {
          title: 'HOME STORAGE',
          items: ['Wardrobes', 'Cabinetry', 'Trunks']
        },
        {
          title: 'UTILITY STORAGE',
          items: ['Display Units', 'Shoe Racks', 'Wall Shelves']
        }
      ]
    },
    'Study & Office': {
      sections: [
        {
          title: 'Tables',
          items: [ 'Study Tables']
        },
        {
          title: 'Storage',
          items: ['Wooden Corner']
        }
      ]
    },
    'Custom Furniture': {
      sections: [
        {
          title: 'CUSTOM OPTIONS',
          items: ['Custom Sofas', 'Custom Wardrobes', 'Bespoke Tables']
        },
        {
          title: 'CONSULTATION',
          items: ['Design Consultation', 'Measure & Quote']
        }
      ]
    },
    'Home Furnishing': {
      sections: [
        {
          title: 'TEXTILES',
          items: ['Rugs', 'Curtains', 'Pillows & Cushions', 'Bed Linen']
        },
        {
          title: 'FLOORING',
          items: ['Carpets', 'Doormats']
        }
      ]
    },
    'Lighting & Decor': {
      sections: [
        {
          title: 'LIGHTING',
          items: ['Floor Lamps', 'Table Lamps', 'Ceiling Lights']
        },
        {
          title: 'DECOR',
          items: ['Wall Art', 'Vases', 'Mirrors', 'Planters']
        }
      ]
    },
    'Interiors': {
      sections: [
        {
          title: 'SERVICES',
          items: ['Full Home Interiors', 'Room Makeovers', 'Renovations']
        },
        {
          title: 'PRODUCTS',
          items: ['Modular Wardrobes', 'Custom TV Units']
        }
      ]
    }
  };

  const navigateToSlug = (itemName) => {
    // 1. Check slugMap first
    const slug = slugMap[itemName] 
      // 2. Fallback to category slug (e.g., if itemName is a main category like 'Sofas')
      || categories.find(cat => cat.name === itemName)?.slug 
      // 3. Last fallback: basic formatting
      || itemName.toLowerCase().replace(/\s+/g, '-').replace(/\+/g, ''); 
      
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
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
              <img 
                src="/SFV Log 637x154 Pxl.png" 
                alt="Sri Furniture Village Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search Products, Color & More..."
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
             <a href="#location" className="hidden lg:flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group">
              <MapPin className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Stores</span>
            </a>

              <button 
                onClick={() => window.location.href = '/login'}
                className="hidden lg:flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group"
              >
                <User className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Profile</span>
              </button>

              <button className="hidden lg:flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group">
                <Heart className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Wishlist (0)</span>
              </button>

              <button 
                onClick={() => window.location.href = '/cart'}
                className="flex flex-col items-center text-gray-700 hover:text-orange-600 transition-colors group relative"
              >
                <ShoppingCart className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Cart (0)</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden lg:flex items-center justify-center space-x-1 py-3">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(cat.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  // When the main category link is clicked, navigate to its slug
                  onClick={() => navigateToSlug(cat.name)} 
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
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
            />
          </div>

          {categories.map((cat) => (
            <div key={cat._id} className="border-b border-gray-200">
              {/* Main Category Toggle for Mobile */}
              <button
                onClick={() => {
                  if (menuData[cat.name]) {
                    setActiveMenu(activeMenu === cat.name ? null : cat.name);
                  } else {
                    // Navigate directly if no submenu data exists
                    navigateToSlug(cat.name); 
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

              {/* Mobile Submenu Container */}
              {activeMenu === cat.name && menuData[cat.name] && (
                <div className="pb-4 space-y-4">
                  {menuData[cat.name].sections.map((section, idx) => (
                    <div key={idx} className="pl-4">
                      {/* Submenu Section Toggle */}
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
                      
                      {/* Submenu Items */}
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

        {/* Mobile Login/Sign Up Button */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors mb-2"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
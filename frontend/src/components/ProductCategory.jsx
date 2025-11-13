import React from 'react';

const ProductCategoryGrid = () => {
  const categories = [
    // Top Row (5 items)
    [
      { name: 'Beds', image: '/product/1.png', route: '/beds' },
      { name: 'Sofas', image: '/product/2.png', route: '/sofas' }, 
      { name: 'Dining', image: '/product/3.png', route: '/dining-tables' },
      { name: 'Study Table', image: '/product/4.png', route: '/study-tables' },
      { name: 'Temple', image: '/product/5.png', route: '/coffee-tables' },
    ],
    // Bottom Row (5 items)
    [
      { name: 'Coffee Tables', image: '/product/6.png', route: '/tv-units' },
      { name: 'Side Board', image: '/product/7.png', route: '/sideboards' },
      { name: 'TV Unit', image: '/product/8.png', route: '/shoe-racks' },
      { name: 'Book Shelf', image: '/product/9.png', route: '/book-shelves' },
      { name: 'Shoes Rack', image: '/product/10.png', route: '/temples' }
    ]
  ];

  const handleCategoryClick = (route) => {
    window.location.href = route;
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8 lg:px-16 bg-white">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
          Top Picks For You
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4">
          Immersive Collection For Your Dream Home
        </p>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-400 mx-auto mt-3 md:mt-4 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile View - All items in single grid */}
        <div className="md:hidden grid grid-cols-2 gap-2 sm:gap-3">
          {categories.flat().map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.route)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container with Overflow Hidden for Zoom Effect */}
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 mb-2 sm:mb-3">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Category Name */}
              <p className="text-center text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wide group-hover:text-orange-500 transition-colors duration-300 px-1">
                {category.name}
              </p>
            </div>
          ))}
        </div>

        {/* Tablet & Desktop View - Two rows */}
        <div className="hidden md:block space-y-4 lg:space-y-6">
          {categories.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 lg:gap-6"
            >
              {row.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category.route)}
                  className="group cursor-pointer flex flex-col"
                >
                  {/* Image Container with Overflow Hidden for Zoom Effect */}
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 mb-2 sm:mb-3">
                    <div className="aspect-square w-full overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                    
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Category Name */}
                  <p className="text-center text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wide group-hover:text-orange-500 transition-colors duration-300 px-1">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      {/* <div className="mt-12 sm:mt-14 md:mt-16">
        <hr className="border-gray-300" />
      </div> */}
    </div>
  );
};

export default ProductCategoryGrid;
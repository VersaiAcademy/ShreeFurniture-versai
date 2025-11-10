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

      { name: 'TV Unit ', image: '/product/8.png', route: '/shoe-racks' },
       { name: 'Book Shelf', image: '/product/9.png', route: '/book-shelves' },
       { name: ' Shoes Rack', image: '/product/10.png', route: '/temples' }
    ]
  ];

  const handleCategoryClick = (route) => {
    window.location.href = route;
  };

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Top Picks For You
        </h1>
        <p className="text-gray-600 text-lg">
          Immersive Collection For Your Dream Home
        </p>
        <div className="w-24 h-1 bg-orange-400 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto space-y-6">
        {categories.map((row, rowIndex) => (
          <div 
            key={rowIndex}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 px-4 md:px-10"
          >
            {row.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.route)}
                className="group cursor-pointer"
              >
                {/* Image Container with Overflow Hidden for Zoom Effect */}
                <div className="relative overflow-hidden rounded-md bg-white shadow-md hover:shadow-2xl transition-shadow duration-300 mb-3">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-[210px] h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Category Name */}
                <p className="text-center text-xs md:text-sm font-semibold text-gray-800 uppercase tracking-wide group-hover:text-orange-500 transition-colors duration-300">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Divider */}
      <div className="mt-16">
        <hr className="border-gray-300" />
      </div>
    </div>
  );
};

export default ProductCategoryGrid;
import React from 'react'
import CategoryItem from '../components/CategoryItem';

const categories = [
  { href: "/products/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/products/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/products/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/products/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/products/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/products/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/products/bags", name: "Bags", imageUrl: "/bags.jpg" },
];


const Home = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl mt-2 font-bold text-emerald-400 mb-4">
          Explore our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

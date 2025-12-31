// import { Link } from "react-router-dom";

// const Navbar: React.FC = () => {
//   return (
//     <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">Prisma Blog</h1>

//       <div className="space-x-4">
//         <Link to="/">Home</Link>
//         <Link to="/create-post">Write</Link>
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-gray-900 via-black to-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
          Prisma Blog
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            className="hover:text-yellow-400 transition-colors duration-300"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors duration-300"
            to="/create-post"
          >
            Write
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors duration-300"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="px-4 py-2 bg-yellow-500 rounded-lg text-black font-semibold hover:bg-yellow-400 transition-colors duration-300"
            to="/login"
          >
            Login
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
            {isOpen ? (
              <path d="M6 6L14 14M6 14L14 6" />
            ) : (
              <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          <Link
            className="hover:text-yellow-400 transition-colors duration-300"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors duration-300"
            to="/create-post"
          >
            Write
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors duration-300"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="px-4 py-2 bg-yellow-500 rounded-lg text-black font-semibold hover:bg-yellow-400 transition-colors duration-300"
            to="/login"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


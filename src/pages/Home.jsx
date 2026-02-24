import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryStrip from "../components/CategoryStrip";
import DealsOfTheDay from "../components/DealsOfTheDay";
import { localService } from "../services/localService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deviceType, setDeviceType] = useState("desktop");

  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth <= 768 ? "mobile" : "desktop");
    };
    
    handleResize(); // Set initial device type
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Categories Mapping based on available assets
  const categories = [
    { name: "Categories", img: "/assets/images/theme/bars.svg" },
    { name: "Offer Zone", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Mobiles", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Fashion", img: "/assets/images/824aa3a83b4057eb.webp" },
    { name: "Electronics", img: "/assets/images/6ecb75e51b607880.webp" },
    { name: "Home", img: "/assets/images/1faac897db7fa1e8.webp" },
    { name: "Appliances", img: "/assets/images/356d37e9512c7fcb.webp" },
    { name: "Toys & Baby", img: "/assets/images/418dfd603e730185.webp" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const length = 10;
        const start = (page - 1) * length;
        const res = await localService.getProducts({ start, length });
        if (res.success && res.data.length > 0) {
          setProducts((prev) => {
            const newProducts = res.data.filter(
              (p) => !prev.some((existing) => existing.id === p.id),
            );
            return [...prev, ...newProducts];
          });
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchProducts();
    }
  }, [page]);

  // Infinite Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 105 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="bg-gray-100 min-h-screen pb-2">
      {/* View Redirection Links - Mobile View */}
      <div className="block md:hidden bg-white border-b border-gray-200">
        <div className="flex justify-around p-2">
          <a 
            href="/?view=mobile" 
            className={`text-sm font-medium ${deviceType === "mobile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            📱 Mobile View
          </a>
          <a 
            href="/?view=desktop" 
            className={`text-sm font-medium ${deviceType === "desktop" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            💻 Desktop View
          </a>
        </div>
      </div>

      {/* View Redirection Links - Desktop View */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-end space-x-4">
            <a 
              href="/?view=mobile" 
              className={`text-sm hover:text-blue-600 ${deviceType === "mobile" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              📱 Switch to Mobile View
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="/?view=desktop" 
              className={`text-sm hover:text-blue-600 ${deviceType === "desktop" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              💻 Switch to Desktop View
            </a>
          </div>
        </div>
      </div>

      {/* Category Strip */}
      <CategoryStrip />

      {/* Hero Banner */}
      <div className="w-full bg-white -mt-0.5">
        <img
          src="/assets/images/bn1.jpg"
          alt="Bank Offer"
          className="w-full h-auto rounded-sm"
        />
      </div>

      {/* Deals of the Day */}
      <DealsOfTheDay />

      {/* Products Grid Section */}
      <div className="bg-white mb-2">
        <div className={`grid ${deviceType === "mobile" ? "grid-cols-2" : "grid-cols-4 lg:grid-cols-5"}`}>
          {products.length > 0 &&
            products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
        </div>

        {loading && (
          <div className="text-center py-6 w-full bg-white">
            <span className="text-gray-500 font-medium text-sm">
              Loading more products...
            </span>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-10">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Home;import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryStrip from "../components/CategoryStrip";
import DealsOfTheDay from "../components/DealsOfTheDay";
import { localService } from "../services/localService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deviceType, setDeviceType] = useState("desktop");

  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth <= 768 ? "mobile" : "desktop");
    };
    
    handleResize(); // Set initial device type
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Categories Mapping based on available assets
  const categories = [
    { name: "Categories", img: "/assets/images/theme/bars.svg" },
    { name: "Offer Zone", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Mobiles", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Fashion", img: "/assets/images/824aa3a83b4057eb.webp" },
    { name: "Electronics", img: "/assets/images/6ecb75e51b607880.webp" },
    { name: "Home", img: "/assets/images/1faac897db7fa1e8.webp" },
    { name: "Appliances", img: "/assets/images/356d37e9512c7fcb.webp" },
    { name: "Toys & Baby", img: "/assets/images/418dfd603e730185.webp" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const length = 10;
        const start = (page - 1) * length;
        const res = await localService.getProducts({ start, length });
        if (res.success && res.data.length > 0) {
          setProducts((prev) => {
            const newProducts = res.data.filter(
              (p) => !prev.some((existing) => existing.id === p.id),
            );
            return [...prev, ...newProducts];
          });
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchProducts();
    }
  }, [page]);

  // Infinite Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 105 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="bg-gray-100 min-h-screen pb-2">
      {/* View Redirection Links - Mobile View */}
      <div className="block md:hidden bg-white border-b border-gray-200">
        <div className="flex justify-around p-2">
          <a 
            href="/?view=mobile" 
            className={`text-sm font-medium ${deviceType === "mobile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            📱 Mobile View
          </a>
          <a 
            href="/?view=desktop" 
            className={`text-sm font-medium ${deviceType === "desktop" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            💻 Desktop View
          </a>
        </div>
      </div>

      {/* View Redirection Links - Desktop View */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-end space-x-4">
            <a 
              href="/?view=mobile" 
              className={`text-sm hover:text-blue-600 ${deviceType === "mobile" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              📱 Switch to Mobile View
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="/?view=desktop" 
              className={`text-sm hover:text-blue-600 ${deviceType === "desktop" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              💻 Switch to Desktop View
            </a>
          </div>
        </div>
      </div>

      {/* Category Strip */}
      <CategoryStrip />

      {/* Hero Banner */}
      <div className="w-full bg-white -mt-0.5">
        <img
          src="/assets/images/bn1.jpg"
          alt="Bank Offer"
          className="w-full h-auto rounded-sm"
        />
      </div>

      {/* Deals of the Day */}
      <DealsOfTheDay />

      {/* Products Grid Section */}
      <div className="bg-white mb-2">
        <div className={`grid ${deviceType === "mobile" ? "grid-cols-2" : "grid-cols-4 lg:grid-cols-5"}`}>
          {products.length > 0 &&
            products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
        </div>

        {loading && (
          <div className="text-center py-6 w-full bg-white">
            <span className="text-gray-500 font-medium text-sm">
              Loading more products...
            </span>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-10">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Home;import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryStrip from "../components/CategoryStrip";
import DealsOfTheDay from "../components/DealsOfTheDay";
import { localService } from "../services/localService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deviceType, setDeviceType] = useState("desktop");

  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth <= 768 ? "mobile" : "desktop");
    };
    
    handleResize(); // Set initial device type
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Categories Mapping based on available assets
  const categories = [
    { name: "Categories", img: "/assets/images/theme/bars.svg" },
    { name: "Offer Zone", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Mobiles", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Fashion", img: "/assets/images/824aa3a83b4057eb.webp" },
    { name: "Electronics", img: "/assets/images/6ecb75e51b607880.webp" },
    { name: "Home", img: "/assets/images/1faac897db7fa1e8.webp" },
    { name: "Appliances", img: "/assets/images/356d37e9512c7fcb.webp" },
    { name: "Toys & Baby", img: "/assets/images/418dfd603e730185.webp" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const length = 10;
        const start = (page - 1) * length;
        const res = await localService.getProducts({ start, length });
        if (res.success && res.data.length > 0) {
          setProducts((prev) => {
            const newProducts = res.data.filter(
              (p) => !prev.some((existing) => existing.id === p.id),
            );
            return [...prev, ...newProducts];
          });
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchProducts();
    }
  }, [page]);

  // Infinite Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 105 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="bg-gray-100 min-h-screen pb-2">
      {/* View Redirection Links - Mobile View */}
      <div className="block md:hidden bg-white border-b border-gray-200">
        <div className="flex justify-around p-2">
          <a 
            href="/?view=mobile" 
            className={`text-sm font-medium ${deviceType === "mobile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            📱 Mobile View
          </a>
          <a 
            href="/?view=desktop" 
            className={`text-sm font-medium ${deviceType === "desktop" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            💻 Desktop View
          </a>
        </div>
      </div>

      {/* View Redirection Links - Desktop View */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-end space-x-4">
            <a 
              href="/?view=mobile" 
              className={`text-sm hover:text-blue-600 ${deviceType === "mobile" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              📱 Switch to Mobile View
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="/?view=desktop" 
              className={`text-sm hover:text-blue-600 ${deviceType === "desktop" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              💻 Switch to Desktop View
            </a>
          </div>
        </div>
      </div>

      {/* Category Strip */}
      <CategoryStrip />

      {/* Hero Banner */}
      <div className="w-full bg-white -mt-0.5">
        <img
          src="/assets/images/bn1.jpg"
          alt="Bank Offer"
          className="w-full h-auto rounded-sm"
        />
      </div>

      {/* Deals of the Day */}
      <DealsOfTheDay />

      {/* Products Grid Section */}
      <div className="bg-white mb-2">
        <div className={`grid ${deviceType === "mobile" ? "grid-cols-2" : "grid-cols-4 lg:grid-cols-5"}`}>
          {products.length > 0 &&
            products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
        </div>

        {loading && (
          <div className="text-center py-6 w-full bg-white">
            <span className="text-gray-500 font-medium text-sm">
              Loading more products...
            </span>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-10">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Home;import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryStrip from "../components/CategoryStrip";
import DealsOfTheDay from "../components/DealsOfTheDay";
import { localService } from "../services/localService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deviceType, setDeviceType] = useState("desktop");

  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth <= 768 ? "mobile" : "desktop");
    };
    
    handleResize(); // Set initial device type
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Categories Mapping based on available assets
  const categories = [
    { name: "Categories", img: "/assets/images/theme/bars.svg" },
    { name: "Offer Zone", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Mobiles", img: "/assets/images/0f3d008be60995d4.webp" },
    { name: "Fashion", img: "/assets/images/824aa3a83b4057eb.webp" },
    { name: "Electronics", img: "/assets/images/6ecb75e51b607880.webp" },
    { name: "Home", img: "/assets/images/1faac897db7fa1e8.webp" },
    { name: "Appliances", img: "/assets/images/356d37e9512c7fcb.webp" },
    { name: "Toys & Baby", img: "/assets/images/418dfd603e730185.webp" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const length = 10;
        const start = (page - 1) * length;
        const res = await localService.getProducts({ start, length });
        if (res.success && res.data.length > 0) {
          setProducts((prev) => {
            const newProducts = res.data.filter(
              (p) => !prev.some((existing) => existing.id === p.id),
            );
            return [...prev, ...newProducts];
          });
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchProducts();
    }
  }, [page]);

  // Infinite Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 105 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="bg-gray-100 min-h-screen pb-2">
      {/* View Redirection Links - Mobile View */}
      <div className="block md:hidden bg-white border-b border-gray-200">
        <div className="flex justify-around p-2">
          <a 
            href="/?view=mobile" 
            className={`text-sm font-medium ${deviceType === "mobile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            📱 Mobile View
          </a>
          <a 
            href="/?view=desktop" 
            className={`text-sm font-medium ${deviceType === "desktop" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            💻 Desktop View
          </a>
        </div>
      </div>

      {/* View Redirection Links - Desktop View */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-end space-x-4">
            <a 
              href="https://offer-gilt-mu.vercel.app/" 
              className={`text-sm hover:text-blue-600 ${deviceType === "mobile" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              📱 Switch to Mobile View
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="https://b1udn1-cb.myshopify.com/" 
              className={`text-sm hover:text-blue-600 ${deviceType === "desktop" ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              💻 Switch to Desktop View
            </a>
          </div>
        </div>
      </div>

      {/* Category Strip */}
      <CategoryStrip />

      {/* Hero Banner */}
      <div className="w-full bg-white -mt-0.5">
        <img
          src="/assets/images/bn1.jpg"
          alt="Bank Offer"
          className="w-full h-auto rounded-sm"
        />
      </div>

      {/* Deals of the Day */}
      <DealsOfTheDay />

      {/* Products Grid Section */}
      <div className="bg-white mb-2">
        <div className={`grid ${deviceType === "mobile" ? "grid-cols-2" : "grid-cols-4 lg:grid-cols-5"}`}>
          {products.length > 0 &&
            products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
        </div>

        {loading && (
          <div className="text-center py-6 w-full bg-white">
            <span className="text-gray-500 font-medium text-sm">
              Loading more products...
            </span>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-10">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Home;

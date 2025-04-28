"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaRegHeart,
  FaHeart,
  FaShoppingCart,
  FaShare,
} from "react-icons/fa";
import { motion } from "framer-motion";
import AddToCartButton from "../../../components/cart/AddToCartButton";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlist, setWishlist] = useState(false);

  // Mock product data - would typically come from a database or API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would be a real API call in a production environment
      const mockProducts = {
        2: {
          id: 2,
          name: "Premium Pre-Workout Formula",
          description:
            "Boost your energy, focus, and performance with our premium pre-workout formula. Designed to help you push through plateaus and maximize your training sessions.",
          longDescription: `<p>Our Premium Pre-Workout Formula is scientifically designed to enhance your training performance and help you achieve your fitness goals faster.</p>
          <p>Key benefits include:</p>
          <ul>
            <li>Increased energy and focus during workouts</li>
            <li>Enhanced muscular endurance and strength</li>
            <li>Improved blood flow and muscle pumps</li>
            <li>Reduced fatigue for longer, more intense training sessions</li>
          </ul>
          <p>This cutting-edge formula contains a precise blend of ingredients including Citrulline Malate, Beta-Alanine, Caffeine, Taurine, and essential B vitamins to optimize your performance.</p>
          <p>Recommended Use: Mix one scoop with 8-10 oz of water and consume 20-30 minutes before your workout for optimal results.</p>`,
          price: 39.99,
          discountedPrice: 34.99,
          rating: 4.7,
          reviewCount: 123,
          images: [
            "https://images.unsplash.com/photo-1617922879456-3d069aec3132?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJlJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByZSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHByZSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
          ],
          variants: [
            { id: 1, name: "Fruit Punch", inStock: true },
            { id: 2, name: "Blue Raspberry", inStock: true },
            { id: 3, name: "Orange Mango", inStock: false },
          ],
          sizes: [
            { id: 1, name: "30 Servings (300g)", price: 34.99 },
            { id: 2, name: "60 Servings (600g)", price: 59.99 },
          ],
          features: [
            "No artificial flavors or sweeteners",
            "Third-party tested for banned substances",
            "Promotes muscle pumps and vascularity",
            "Enhances mental focus and alertness",
            "Fast-acting formula",
          ],
          category: "Pre-Workout",
          categoryId: 2,
          relatedProducts: [1, 3, 4],
          reviews: [
            {
              id: 1,
              user: "Michael T.",
              rating: 5,
              date: "2023-10-15",
              comment:
                "This pre-workout is amazing! I feel so energized and focused during my workouts. The fruit punch flavor is delicious too.",
            },
            {
              id: 2,
              user: "Sarah K.",
              rating: 4,
              date: "2023-09-22",
              comment:
                "Great product that delivers on its promises. I've noticed my endurance has improved significantly. The only reason for 4 stars is that it can make me a bit jittery.",
            },
            {
              id: 3,
              user: "David L.",
              rating: 5,
              date: "2023-08-17",
              comment:
                "Hands down the best pre-workout I've ever used. Clean energy with no crash afterward.",
            },
          ],
        },
      };

      if (mockProducts[productId]) {
        setProduct(mockProducts[productId]);
        setSelectedVariant(mockProducts[productId].variants[0]);
      }
      setLoading(false);
    }, 500);
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Product Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Sorry, the product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  const productForCart = {
    ...product,
    variant: selectedVariant?.name,
    quantity: quantity,
    image: product.images[0],
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link
                href={`/products?category=${product.categoryId}`}
                className="hover:text-primary"
              >
                {product.category}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden mb-6">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.discountedPrice && (
                <div className="absolute top-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded">
                  {Math.round(
                    ((product.price - product.discountedPrice) /
                      product.price) *
                      100
                  )}
                  % OFF
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-24 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <StarRating rating={product.rating} />
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mb-6">
              {product.discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-primary mr-3">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Flavor</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.inStock}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedVariant?.id === variant.id
                          ? "border-primary bg-primary text-white"
                          : variant.inStock
                          ? "border-gray-300 hover:border-primary"
                          : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {variant.name}
                      {!variant.inStock && " (Out of Stock)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <div
                      key={size.id}
                      className="border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-primary"
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-primary">
                        ${size.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <AddToCartButton
                product={productForCart}
                size="large"
                className="flex-grow md:flex-grow-0"
              />

              <button
                onClick={toggleWishlist}
                className="px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                {wishlist ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>

              <button className="px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50">
                <FaShare />
              </button>
            </div>

            {/* Features */}
            {product.features && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 font-medium ${
                  activeTab === "description"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 font-medium ${
                  activeTab === "reviews"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>
          </div>

          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <div className="text-5xl font-bold text-primary mb-2">
                        {product.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        <StarRating rating={product.rating} />
                      </div>
                      <div className="text-gray-500">
                        Based on {product.reviewCount} reviews
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="font-medium mb-4">Write a Review</h3>
                      <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Submit Review
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{review.user}</h3>
                          <span className="text-gray-500 text-sm">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex mb-3">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/product/${
                    product.relatedProducts[
                      index % product.relatedProducts.length
                    ]
                  }`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-100">
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Product Image
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">
                        Related Product {index + 1}
                      </h3>
                      <div className="text-primary font-medium"> 29.99</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

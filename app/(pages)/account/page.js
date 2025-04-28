"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaBox, FaHeart, FaCog, FaSignOutAlt, FaRupeeSign } from "react-icons/fa";
import Image from "next/image";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data - would typically come from a database or API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    image: null, // User image URL could go here
    orders: [
      {
        id: "ORD-123456",
        date: "2023-10-15",
        status: "Delivered",
        total: 89.99,
      },
      {
        id: "ORD-123455",
        date: "2023-09-28",
        status: "Delivered",
        total: 125.5,
      },
      {
        id: "ORD-123454",
        date: "2023-08-12",
        status: "Cancelled",
        total: 45.99,
      },
    ],
    wishlist: [
      { id: 1, name: "Protein Powder", price: 49.99 },
      { id: 2, name: "Pre-Workout Formula", price: 39.99 },
      { id: 3, name: "BCAA Supplement", price: 29.99 },
    ],
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">My Account</h1>

        <div className="grid md:grid-cols-4 gap-10">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-primary text-white">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUser size={32} />
                  )}
                </div>
                <h2 className="text-xl font-bold text-center">{user.name}</h2>
                <p className="text-sm text-center text-white/80 mt-1">
                  {user.email}
                </p>
              </div>

              <nav className="p-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaUser className="mr-3" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "orders"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaBox className="mr-3" />
                  <span>My Orders</span>
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "wishlist"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaHeart className="mr-3" />
                  <span>Wishlist</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaCog className="mr-3" />
                  <span>Settings</span>
                </button>

                <hr className="my-3" />

                <button className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                  <FaSignOutAlt className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">
                    Personal Information
                  </h2>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue={user.phone}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          defaultValue="************"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Update Profile
                    </button>
                  </form>

                  <hr className="my-8" />

                  <h2 className="text-xl font-bold mb-6">Shipping Addresses</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">Home</h3>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                          Default
                        </div>
                      </div>
                      <p className="text-gray-600">
                        123 Main Street
                        <br />
                        Apt 4B
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                      <div className="mt-4 flex space-x-3">
                        <button className="text-primary text-sm hover:underline">
                          Edit
                        </button>
                        <button className="text-gray-500 text-sm hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="border border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center">
                      <button className="text-primary hover:underline">
                        + Add New Address
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Order History</h2>

                  {user.orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-gray-500">
                              Order ID
                            </th>
                            <th className="px-4 py-3 text-gray-500">Date</th>
                            <th className="px-4 py-3 text-gray-500">Status</th>
                            <th className="px-4 py-3 text-gray-500">Total</th>
                            <th className="px-4 py-3 text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {user.orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4">{order.id}</td>
                              <td className="px-4 py-4">{order.date}</td>
                              <td className="px-4 py-4">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 flex items-center">
                                <FaRupeeSign /> {order.total.toFixed(2)}
                              </td>
                              <td className="px-4 py-4">
                                <button className="text-primary hover:underline">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">
                        You haven&apos;t placed any orders yet.
                      </p>
                      <Link
                        href="/products"
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">My Wishlist</h2>

                  {user.wishlist.length > 0 ? (
                    <div className="space-y-4">
                      {user.wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-primary font-medium flex items-center">
                              <FaRupeeSign />{item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex space-x-3">
                            <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                              Add to Cart
                            </button>
                            <button className="px-3 py-2 text-gray-400 hover:text-red-500 transition-colors">
                              <FaHeart />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">
                        Your wishlist is empty.
                      </p>
                      <Link
                        href="/products"
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Browse Products
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="order-updates"
                            defaultChecked
                            className="mr-3"
                          />
                          <label htmlFor="order-updates">Order updates</label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="promotions"
                            defaultChecked
                            className="mr-3"
                          />
                          <label htmlFor="promotions">
                            Promotions and discounts
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="newsletter"
                            defaultChecked
                            className="mr-3"
                          />
                          <label htmlFor="newsletter">Newsletter</label>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div>
                      <h3 className="font-medium mb-4">Delete Account</h3>
                      <p className="text-gray-600 mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

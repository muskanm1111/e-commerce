"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
      // Here you would typically send the email to your API
      setIsSubmitted(true);
      setEmail("");

      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "Protein", href: "/products?category=protein" },
        { name: "Pre-Workout", href: "/products?category=pre-workout" },
        { name: "Mass Gainers", href: "/products?category=mass-gainers" },
        { name: "BCAA", href: "/products?category=bcaa" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Store Locations", href: "/locations" },
        { name: "Our Guarantee", href: "/guarantee" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Shipping & Returns", href: "/shipping" },
        { name: "Track Order", href: "/track-order" },
      ],
    },
  ];

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-montserrat font-bold"
            >
               <Image src="/logo.png" alt="Logo"  width={200} height={200} className="pb-2"  /> 
            </motion.div>
            <p className="text-gray-400 max-w-xs">
              Premium quality supplements for athletes and fitness enthusiasts.
              Fuel your performance with the best.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#4267B2" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#E1306C" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#1DA1F2" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#FF0000" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube size={24} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-bold uppercase">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Power Supplements. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

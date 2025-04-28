export async function generateMetadata({ params }) {
  // In a real application, you would fetch the product data here
  // and use it to generate dynamic metadata

  return {
    title: `Product Details | Power Supplements`,
    description: "View detailed information about our premium supplements",
  };
}

export default function ProductLayout({ children }) {
  return children;
}

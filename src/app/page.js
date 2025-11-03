import { HeaderAuth } from "./component/auth"
import Card from "./component/ui/Card"
import ProductRow from "./component/layout/ProductRow";
import Navbar from "./component/layout/Navbar";
import Divider from "./component/ui/Divider";

export default function LandingPage() {
  const mockProducts = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Basic tee",
      price: '$35',
      color: 'Black',
      category: "trending"
    },
    {
      id: 2,
      name: 'Basic Tee',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
      imageAlt: "Basic tee",
      price: '$35',
      color: 'Aspen White',
      category: "trending"
    },
    {
      id: 3,
      name: 'Basic Tee',
      href: '/products/3',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
      imageAlt: "Basic tee",
      price: '$35',
      color: 'Charcoal',
      category: "foryou"
    },
    {
      id: 4,
      name: 'Artwork Tee',
      href: '#',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
      imageAlt: "Basic tee",
      price: '$35',
      color: 'Iso Dots',
      category: "trending"
    },
  ]

  const trendingProducts = mockProducts.filter(product => product.category === "trending");
  const forYouProducts = mockProducts.filter(product => product.category === "foryou");

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8">
        <section>
          <ProductRow products={mockProducts} label={"Em promoção"}/>
          <Divider />
          <ProductRow products={trendingProducts} label = {"Itens mais vendidos"} />
          <Divider />
          <ProductRow products={forYouProducts} label = {"Itens para você"} />
        </section>
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600">© {new Date().getFullYear()} E-commerce </div>
      </footer>
    </div>
  )
}

import { HeaderAuth } from "./component/auth"
import ProductRow from "./component/layout/ProductRow";
import Navbar from "./component/layout/Navbar";
import Divider from "./component/ui/Divider";
import { useSession } from "next-auth/react";
import HeroSection from "./component/layout/HeroSection";
import LandingPageFooter from "./component/layout/LandingPageFooter";

export default function LandingPage() {
  const mockProducts = [
    {
      id: 1,
      name: 'Camiseta Preta',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Camiseta Preta",
      price: 'R$60',
      color: 'Preta',
      category: "Novidades"
    },
    {
      id: 2,
      name: 'Camiseta Branca',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
      imageAlt: "Camiseta Branca",
      price: 'R$50',
      color: 'Branco',
      category: "Novidades"
    },
    {
      id: 3,
      name: 'Camiseta Cinza',
      href: '/products/3',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
      imageAlt: "Camiseta Cinza",
      price: 'R$60',
      color: 'Cinza Escuro',
      category: "Novidades"
    },
    {
      id: 4,
      name: 'Camiseta Pontilhada',
      href: '#',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
      imageAlt: "Camiseta Pontilhada",
      price: 'R$67',
      color: 'Bege Claro',
      category: "Novidades"
    },
  ]
  const trendingProducts = [
    {
      id: 1,
      name: 'Camiseta Preta',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Camiseta Preta",
      price: 'R$60',
      color: 'Preta',
      category: "Novidades"
    },
    {
      id: 2,
      name: 'Camiseta Branca',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
      imageAlt: "Camiseta Branca",
      price: 'R$50',
      color: 'Branco',
      category: "Novidades"
    },
    {
      id: 3,
      name: 'Camiseta Cinza',
      href: '/products/3',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
      imageAlt: "Camiseta Cinza",
      price: 'R$60',
      color: 'Cinza Escuro',
      category: "Novidades"
    },
    {
      id: 4,
      name: 'Camiseta Pontilhada',
      href: '#',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
      imageAlt: "Camiseta Pontilhada",
      price: 'R$67',
      color: 'Bege Claro',
      category: "Novidades"
    },
  ]
  const forYouProducts = [
    {
      id: 1,
      name: 'Camiseta Preta',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Camiseta Preta",
      price: 'R$60',
      color: 'Preta',
      category: "Novidades"
    },
    {
      id: 2,
      name: 'Camiseta Branca',
      href: '/products/2',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
      imageAlt: "Camiseta Branca",
      price: 'R$50',
      color: 'Branco',
      category: "Novidades"
    },
    {
      id: 3,
      name: 'Camiseta Cinza',
      href: '/products/3',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
      imageAlt: "Camiseta Cinza",
      price: 'R$60',
      color: 'Cinza Escuro',
      category: "Novidades"
    },
    {
      id: 4,
      name: 'Camiseta Pontilhada',
      href: '#',
      imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
      imageAlt: "Camiseta Pontilhada",
      price: 'R$67',
      color: 'Bege Claro',
      category: "Novidades"
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <HeroSection />
      <main className={"flex-1 max-w-6xl mx-auto px-0 py-0"}>
        <section >
          <ProductRow products={mockProducts} label={"Novidades"}/>
          <Divider />
          <div className="-mt-24">
          <ProductRow products={trendingProducts} label = {"Itens mais vendidos"} />
          </div>
          <Divider />
          <div className="mb-30 -mt-24">
          <ProductRow products={forYouProducts} label = {"Itens para você"} />
          </div>
          <Divider />
        </section>
      </main>

      <footer>
        <LandingPageFooter />
      </footer>
    </div>
  )
}

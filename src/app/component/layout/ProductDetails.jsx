"use client";

import { useState, useContext } from "react";
import { useParams } from "next/navigation";
import { Products } from "./Products";
import { HeaderAuth } from "../auth";
import { CartContext, CartProvider } from "../../context/CartContext";
import { useSession } from "next-auth/react";

export default function ProductDetails() {

    const params = useParams()
    const productId = params.id
    const [selectedColor, setSelectedColor] = useState(null);

    const product = Products.find(
        (item) => item.id === Number(productId)
    )

    const [selectedSize, setSelectedSize] = useState("Large")
    const [quantity, setQuantity] = useState(1)


    const sizes = ["P", "M", "G", "GG"]
    const colors = [
        {name: "Verde", class: "bg-green-900"}, 
        {name: "Vermelho" ,class: "bg-red-700"}, 
        {name: "Azul", class: "bg-indigo-900"}
    ]
    const [isOpen, setIsOpen] = useState(false)
    const { cart, setCart, IncreaseQuantity } = useContext(CartContext);
    const { data: session, status } = useSession()
    const [showCartSnackbar, setShowCartSnackbar] = useState(false)
    const [showSnackbar, setShowSnackbar] = useState(false)

    function handleAddToCart() {
        if (selectedColor == null || !selectedSize) {
            setShowSnackbar(true)
            setTimeout(() => setShowSnackbar(false), 5000)
        }
        if (!session) {
            setShowCartSnackbar(true)
            setTimeout(() => setShowCartSnackbar(false), 5000)
        }
        if (session && (selectedColor || selectedColor == 0) && selectedSize) {
            IncreaseQuantity({
                ...product,
                quantity,
                color: selectedColor,
                size: selectedSize
            })
        }
    }

    if (!product) {
        return <h1 className="text-center text-2xl p-20">Produto não encontrado</h1>
    }

    return (
        <section className="w-full flex justify-center py-16 bg-white mb-65">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    >
                        <div onClick={() => setIsOpen(false)} className="cursor-pointer absolute top-4 right-4 text-white text-2xl ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </div>
                        <img
                            src={product.imageSrc}
                            className="max-w-[90%] max-h-[90%] object-contain"
                        />
                    </div>
                )}
                {/* Left - Images */}
                <div className="flex gap-6">

                    {/* Thumbnails */}
                    <div className="flex flex-col gap-4">
                        <img src={product.imageSrc} className="w-24 cursor-pointer" onClick={() => setIsOpen(true)} />
                        <img src={product.imageSrc} className="w-24 cursor-pointer" onClick={() => setIsOpen(true)} />
                        <img src={product.imageSrc} className="w-24 cursor-pointer" onClick={() => setIsOpen(true)} />
                    </div>

                    {/* Main image */}
                    <div className="bg-[#f4f1ee] p-6 rounded-xl">
                        <img
                            src={product.imageSrc}
                            className="w-[380px] object-contain cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        />
                    </div>

                </div>

                {/* Right - Product info */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {product.name}
                    </h1>

                    {/* Stars */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="text-yellow-400 text-lg">★★★★★</div>
                        <span className="text-sm text-gray-500">4.5/5</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl font-bold">
                            {product.price}
                        </span>

                        {product.oldPrice && (
                            <>
                                <span className="line-through text-gray-400">
                                    R${product.oldPrice}
                                </span>

                                <span className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-full">
                                    -{product.discount}%
                                </span>
                            </>
                        )}
                    </div>

                    <p className="text-gray-600 mb-6">
                        {product.description}
                    </p>

                    {/* Colors */}


                    <div className="mb-6">
                        <h3 className="font-medium mb-2">Cor</h3>
                        <div className="flex gap-4">
                            {colors.map((c, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedColor(c.name)}
                                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${c}`}
                                >
                                    {selectedColor === c.name && (
                                        <span className="text-white text-sm font-bold">✓</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-2">Tamanho</h3>
                        <div className="flex gap-3 flex-wrap">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-1.5 rounded-full border text-sm transition cursor-pointer
                    ${selectedSize === size
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity + Cart */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center rounded-full border px-4 py-2 gap-5">
                            <button className="cursor-pointer" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                                −
                            </button>

                            <span>{quantity}</span>

                            <button className="cursor-pointer" onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>

                        <button onClick={() => handleAddToCart()} className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition cursor-pointer">
                            Adicionar ao Carrinho
                        </button>
                        {showCartSnackbar && (
                            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50 transition">
                                Você precisa estar logado para adicionar ao carrinho
                            </div>
                        )}
                        {showSnackbar && (
                            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50 transition">
                                Você precisa escolher uma cor e um tamanho para adicionar ao carrinho
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    )
}

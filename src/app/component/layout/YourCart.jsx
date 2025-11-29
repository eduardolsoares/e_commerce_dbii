"use client"

import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import Link from "next/link"
import ProductDetails from "./ProductDetails"

export default function YourCart() {
  const { cart, IncreaseQuantity, DecreaseQuantity, RemoveFromCart } =
    useContext(CartContext)

  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price.replace("R$", "").replace(",", ".")) * Number(item.quantity),
    0
  )

  const delivery = subtotal - subtotal * (96 / 100)
  const discount = subtotal * 0.2
  const total = subtotal - discount + delivery

  return (
    <div className="min-h-screen flex flex-col">

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto py-20 px-4 mb-30">

          <h1 className="text-4xl font-bold mb-10">Carrinho</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* PRODUTOS */}
            <div className="md:col-span-2 bg-white rounded-xl border p-6">
              {cart.length === 0 && (
                <p className="text-gray-500">Nenhum item no carrinho.</p>
              )}

              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex items-center gap-6 border-b py-6 last:border-b-0"
                >
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Link href={`/ProductPage/${item.id}`}>
                      <img
                        src={item.imageSrc}
                        className="w-24 h-24 object-contain cursor-pointer hover:scale-105 transition"
                      />
                    </Link>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-400">
                      Tamanho: {item.size}
                    </p>
                    <p className="text-sm text-gray-400">
                      Cor: {item.color}
                    </p>
                    <p className="font-bold mt-2">{item.price}</p>
                  </div>

                  <div className="flex flex-col items-end gap-3">

                    <button
                      onClick={() =>
                        RemoveFromCart(
                          item.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      className="text-red-500 cursor-pointer"
                    >
                      🗑
                    </button>

                    <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full">
                      <button className="cursor-pointer" onClick={() => DecreaseQuantity({ ...item, quantity: 1 })}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          IncreaseQuantity({ ...item, quantity: 1 })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RESUMO */}
            <div className="border rounded-xl p-6 h-fit">
              <h2 className="text-xl font-bold mb-6">
                Seu Pedido
              </h2>

              <div className="flex justify-between mb-3">
                <span>Preço Total</span>
                <span>R${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3 text-red-500">
                <span>Desconto</span>
                <span>-R${discount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Taxa de Entrega</span>
                {subtotal > 0 && <span>R${delivery.toFixed(2)}</span>}
                {subtotal <= 0 && <span>R$0.00</span>}
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                <span>Total</span>
                <span>R${total.toFixed(2)}</span>
              </div>

              <button className="mt-8 w-full bg-black text-white py-4 rounded-full cursor-pointer">
                Pagamento →
              </button>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

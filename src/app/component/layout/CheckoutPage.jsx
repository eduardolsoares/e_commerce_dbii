"use client"

import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CheckoutPage({ finalizeOrder, orderId }) {
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const { cart } = useContext(CartContext);
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price *
      Number(item.quantity),
    0
  );
  const deliveryFee = subtotal > 0 ? subtotal * 0.04 : 0;
  const discount = subtotal * 0.2;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT SIDE — FORM */}
        <div>
          <h1 className="text-3xl font-bold mb-8">Pagamento</h1>

          <h2 className="font-semibold mb-4">Shipping Information</h2>

          {/* Delivery / Pick Up */}
          <div className="flex gap-4 mb-8">
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition cursor-pointer
                ${shippingMethod === "delivery"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                  : "border-gray-300 bg-white"}
              `}
              onClick={() => setShippingMethod("delivery")}
            >
              <img src="/truckFast.png"/> Delivery
            </button>

            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition cursor-pointer
                ${shippingMethod === "pickup"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                  : "border-gray-300 bg-white"}
              `}
              onClick={() => setShippingMethod("pickup")}
            >
              <img src="/packageIcon.png"/> Buscar na Agência
            </button>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            <div>
              <label className="font-medium">Nome Completo *</label>
              <input className="w-full p-3 border rounded-xl mt-1" placeholder="Insira nome completo" />
            </div>

            <div>
              <label className="font-medium">Endereço de email *</label>
              <input className="w-full p-3 border rounded-xl mt-1" placeholder="Insira endereço de email" />
            </div>

            <div>
              <label className="font-medium">Número de celular *</label>
              <div className="flex items-center border rounded-xl px-3 mt-1">
                <span className="mr-3">+55</span>
                <input className="w-full p-3 outline-none" placeholder="Insira número de celular" />
              </div>
            </div>

            <div>
              <label className="font-medium">Estado *</label>
              <select className="w-full p-3 border rounded-xl mt-1">
                <option>Distrito Federal</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Forma de Pagamento *</label>
              <select className="w-full p-3 border rounded-xl mt-1">
                <option>Boleto</option>
                <option>Pix</option>
                <option>Crédito</option>
                <option>Débito</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Cidade</label>
              <input className="w-full p-3 border rounded-xl mt-1" placeholder="Inserir cidade" />
            </div>

            <div className="flex items-center gap-3 mt-2 mb-100">
              <input type="checkbox" className="h-4 w-4" />
              <p className="text-sm text-gray-600">
                I have read and agree to the Terms and Conditions.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — CART SUMMARY */}
        <div className="bg-white p-6 rounded-xl border h-fit">
          <h2 className="font-bold text-lg mb-6">Seu Pedido</h2>

          {/* LISTA REAL DE PRODUTOS */}
          {cart.map((item) => (
            <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center gap-4 mb-6">
              <img
                src={item.image}
                className="w-20 rounded-lg border"
              />

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity}x</p>
                <p className="text-sm text-gray-500">Cor: {item.color}</p>
                <p className="text-sm text-gray-500">Tamanho: {item.size}</p>
                <p className="font-semibold mt-1">R${item.price}</p>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <p className="text-gray-500">Carrinho vazio.</p>
          )}

          {/* CUPOM */}
          <div className="flex items-center gap-3 mb-6">
            <input
              placeholder="Cupom de Desconto"
              className="flex-1 p-3 border rounded-xl"
            />
            <button className="text-indigo-600 font-semibold">Aplicar</button>
          </div>

          {/* PREÇOS REAIS */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p>Preço Total</p>
              <p>R${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p>Taxa de Entrega</p>
              <p>R${deliveryFee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between text-red-500">
              <p>Desconto</p>
              <p>- R${discount.toFixed(2)}</p>
            </div>

            <div className="flex justify-between font-bold border-t pt-4 mt-3 text-lg">
              <p>Total</p>
              <p>R${total.toFixed(2)}</p>
            </div>
          </div>

          <button className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 cursor-pointer"
            onClick={() => finalizeOrder(orderId)}>
            Realizar Pagamento
          </button>

          <div className="mt-5 flex items-start gap-3 text-sm">
            <span>🔒</span>
            <p className="text-gray-600">
              <strong>Secure Checkout – SSL Encrypted</strong><br />
              Garantindo que a compra seja feita com segurança.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

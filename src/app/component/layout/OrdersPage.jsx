"use client";

import { useSession } from "next-auth/react";

export default function OrdersPage({ orders = [] }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-center text-gray-600">É preciso estar logado para ver seus pedidos</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Seus Pedidos</h1>

      <div className="w-full max-w-3xl space-y-4">
        {orders.length === 0 && (
          <div className="text-center text-gray-500 py-12">Nenhum pedido encontrado</div>
        )}

        {orders.map((order) => (
          <article key={order.id} className="bg-white rounded-2xl shadow-sm p-6">
            <header className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium">Pedido #{String(order.id).slice(0,8)}</h2>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">Itens</span>
                <p className="font-semibold">{order.items?.length || 0}</p>
              </div>
            </header>

            <div className="space-y-3 border-t pt-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={item.imageSrc || '/placeholder.png'} alt={item.name} className="w-14 h-14 object-cover rounded-md bg-gray-100" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity} × {item.size || '—'} • {item.color || '—'}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">R${(Number(item.price) || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <footer className="mt-4 border-t pt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Status: <span className="font-medium text-gray-800">{order.status || 'Paid'}</span></div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="font-bold">R${(Number(order.total) || 0).toFixed(2)}</div>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

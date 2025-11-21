import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background */}
      <img
        src="/Rectangle.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold leading-tight text-black">
            ESTILO QUE DEFINE <br />
            O SEU PROPÓSITO<br />
            
          </h1>

          <p className="text-gray-600 mt-4 max-w-md">
            Descubra peças pensadas para realçar sua identidade, com design de qualidade e estilo que acompanha o seu dia a dia.
          </p>

          <button className="mt-6 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Compre Agora
          </button>

          <div className="grid grid-cols-3 gap-6 mt-10">
            <div>
              <h3 className="text-3xl font-bold">200+</h3>
              <p className="text-gray-600 text-sm">Marcas Internacionais</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">2,000+</h3>
              <p className="text-gray-600 text-sm">Produtos de Alta Qualidade</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">30,000+</h3>
              <p className="text-gray-600 text-sm">Clientes Satisfeitos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

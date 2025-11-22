"use client";

import { useState } from "react";

export default function LandingPageFooter() {
  const [email, setEmail] = useState("");

  const companyLinks = [
    "Quem Somos",
    "Destaques",
    "Nossos projetos",
    "Trabalhe Conosco"
  ];

  const helpLinks = [
    "Atendimento ao Cliente",
    "Informações de Entrega",
    "Condições e Termos",
    "Política de Privacidade"
  ];

  const faqLinks = [
    "Segurança",
    "Guia de Tamanhos",
    "Garantia",
    "Newsletter"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
  };

  return (
    <footer className="w-full bg-[#efefef] pt-48 pb-10 flex justify-center">
      <div className="max-w-[1240px] w-full flex flex-col gap-20 px-4">

        <div className="bg-black text-white rounded-2xl p-10 flex flex-col lg:flex-row items-center justify-between gap-10 -mt-73">

          <h2 className="font-bold text-2xl lg:text-3xl leading-tight max-w-[580px]">
            MANTENHA-SE ATUALIZADO SOBRE NOSSAS ÚLTIMAS OFERTAS!
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[350px] gap-4">

            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </span> 

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu endereço de email"
                required
                className="w-full px-5 py-3 pl-12 rounded-full text-black placeholder-gray-500 bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition"
            >
              Inscreva-se ao Newsletter
            </button>

          </form>
        </div>

        <img src={"/line4.png"} className="w-full h-px object-cover" alt="" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-16">

          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">SHOP.CO</h1>
            <p className="text-sm text-black/70">
              Roupas que expressam seu estilo. Vista-se com orgulho. Moda feminina e masculina.
            </p>
            <img src={"/social.png"} alt="social links" className="w-[150px]" />
          </div>

          <FooterColumn title="SOBRE NÓS" items={companyLinks} />
          <FooterColumn title="SUPORTE" items={helpLinks} />
          <FooterColumn title="FAQ" items={faqLinks} />

        </div>

        <img src={"/line4.png"} className="w-full h-px object-cover" alt="" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <p className="text-sm text-black/60">
            Shop.co © 2000-2025, All Rights Reserved
          </p>

          <img src={"/frame-53.svg"} alt="Payment methods" className="h-10" />
        </div>

      </div>
    </footer>
  );
}


function FooterColumn({ title, items }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold tracking-[3px]">{title}</h3>

      <ul className="flex flex-col gap-3 text-black/70 text-sm">
        {items.map((text, i) => (
          <li key={i}>
            <a href="#" className="hover:text-black transition">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

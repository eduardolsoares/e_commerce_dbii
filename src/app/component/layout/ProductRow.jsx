import { StarIcon } from '@heroicons/react/20/solid'
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["700", "800"],
  subsets: ["latin"],
});

export default function ProductRow({products, label}) {

  const renderRatingStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);

    return Array.from({ length: totalStars }, (_, index) => (
      <StarIcon
        key={index}
        className={
          index < filledStars
            ? 'size-4 text-yellow-400'
            : 'size-4 text-gray-300'
        }
        aria-hidden="true"
      />
    ));
  };

  return (
    <div className="bg-white rounded-3xl">
      <div className="rounded-2xl mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <h2 className={`${montserrat.className} text-4xl font-extrabold tracking-tight text-center`}>
          { label }
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">

              <div
                className="aspect-square w-full rounded-lg bg-gray-200
                           overflow-hidden lg:aspect-auto lg:h-80"
              >
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="object-cover w-full h-full group-hover:opacity-75"
                />
              </div>

              <div className="mt-4">

                <h3 className="text-xl font-bold text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>

                <div className="flex items-center mt-1">
                  <div className="flex items-center space-x-0.5">
                    {renderRatingStars(4)}
                  </div>

                  <p className="ml-2 text-sm text-gray-500">4.0/5</p>
                </div>

                <p className="mt-2 text-2xl font-bold text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    <div className="flex justify-center">
      <button className="px-14 py-4 border border-gray-300 rounded-full text-black text-lg bg-white hover:bg-gray-50 transition">
        Ver Mais
      </button>
    </div>
    <div className="w-[1240px] h-px mt-20" role="separator" aria-hidden="true">
      <img
        className=" left-[calc(50.00%_-_620px)] w-[1240px] h-px object-cover"
        alt=""
        src={"/line4.png"}
      />
    </div>
    </div>
  )
}

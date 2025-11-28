"use client";
import { useState } from "react";
import { createContext, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

    const IncreaseQuantity = (product) => {
        setCart((prevCart) => {
        const itemExists = prevCart.find((item) => item.id === product.id);

        if (itemExists) {
            return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: Number(item.quantity) + Number(product.quantity || 1) }
                : item
            );
        }

        return [...prevCart, { ...product, quantity: Number(product.quantity || 1) }];
    });
    };

    const DecreaseQuantity = (product) => {
  setCart((prevCart) => {
    const updatedCart = prevCart
      .map((item) => {
        if (item.id === product.id) {
          const newQuantity =
            Number(item.quantity) - Number(product.quantity || 1);

          if (newQuantity <= 0) {
            return null;
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        }

        return item;
      })
      .filter((item) => item !== null);

    return updatedCart;
  });
};

const RemoveFromCart = (id, selectedSize, selectedColor) => {
  setCart((prevCart) =>
    prevCart.filter(
      (item) =>
        !(
          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        )
    )
  )
}

    return (
        <CartContext.Provider value={{ cart, setCart, IncreaseQuantity, DecreaseQuantity, RemoveFromCart }}>
        {children}
        </CartContext.Provider>
    );
}

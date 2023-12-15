import React from "react";
import { useCartStore } from "../../cartStore";
import "./Quantity.scss";

export const Quantity: React.FC<{ productId: number }> = ({ productId }) => {
  const { products, add, removeOneById, removeAllById } = useCartStore();

  const qty = products.find((product) => product.id === productId)?.quantity ?? 0;

  return (
    <div className="quantity-container">
      <div className="action">
        <button className="btn" onClick={() => removeOneById(productId)}>
          -
        </button>
        <div className="qty">{qty}</div>
        <button className="btn" onClick={() => add(productId)}>
          +
        </button>
      </div>
      <button className="remove" onClick={() => removeAllById(productId)}>
        REMOVE
      </button>
    </div>
  );
};

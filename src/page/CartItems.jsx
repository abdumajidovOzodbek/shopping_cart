import React from 'react';
import { deleteItem, updateItem } from '../data/db';

function CartItem({ id, imgSrc, title, description, quantity, price, setItems, setTotal}) {
  const handleIncrease = () => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
    setTotal((prevTotal) => prevTotal + price);
    
    updateItem(id, { quantity: quantity + 1 });
  };

  const handleDecrease = () => {
    if (quantity >= 0) {
      updateItem(id, { quantity: quantity - 1 });
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      );
      setTotal((prevTotal) => prevTotal - price);
    }
  };
  if (quantity === 0) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  const handleDelete = async () => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setTotal((prevTotal) => prevTotal - price);
    await deleteItem(id)

  };

  return (
    <li className="flex gap-5 justify-between items-center py-2.5 pr-10 pl-2.5 mt-6 w-full bg-white rounded-2xl shadow-lg max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
      <div className="flex gap-5 w-[37%]">
        <img loading="lazy" src={imgSrc} alt={title} className="shrink-0 w-20 aspect-[0.98]" />
        <div className="flex flex-col my-auto">
          <h3 className="text-lg text-stone-900">{title}</h3>
          <p className="mt-2.5 text-sm text-stone-900">{description}</p>
        </div>
      </div>
      <div className="flex justify-between gap-2 items-center content-center ">
        <h2 className="font-bold">{quantity}</h2>
        <div className="flex flex-col items-center">
        <button onClick={handleIncrease} className="text-3xl w-5 aspect-square">
          <i className="fas fa-caret-up"></i>
        </button>
        
        <button onClick={handleDecrease} className="text-3xl aspect-square fill-neutral-700">
          <i className="fas fa-caret-down"></i>
        </button>
        </div>
      </div>
      <div className="flex gap-5 items-center text-sm text-right whitespace-nowrap">
        <span className="my-auto">${price}</span>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <i className="fas fa-trash-alt fa-lg text-black text-xl"></i>
        </button>
      </div>
    </li>
  );
}

export default CartItem;

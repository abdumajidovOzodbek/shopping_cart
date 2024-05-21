import React from 'react';

function CartItem({ imgSrc, title, description, quantity, price, onIncrease, onDecrease, onDelete }) {
  return (
    <li className="flex gap-5 justify-between items-center py-2.5 pr-10 pl-2.5 mt-6 w-full bg-white rounded-2xl shadow-lg max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
      <div className="flex gap-5 w-[37%]" >
        <img loading="lazy" src={imgSrc} alt={title} className="shrink-0 w-20 aspect-[0.98]" />
        <div className="flex flex-col my-auto">
          <h3 className="text-lg text-stone-900">{title}</h3>
          <p className="mt-2.5 text-sm text-stone-900">{description}</p>
        </div>
      </div>
    <div className='flex justify-between gap-2 items-center '>
        <h2 className='font-bold'>{quantity}</h2>
      <div className="flex flex-col my-auto text-2xl font-bold">
      <button onClick={onIncrease} className=" h-3.5" >
          <i className="fas fa-caret-up"></i>
        </button>
        <button onClick={onDecrease}>
          <i className="fas fa-caret-down"></i>
        </button>
        {/* <span>{quantity}</span> */}
        
        
      </div>
    </div>
      <div className="flex gap-5 items-center text-sm text-right whitespace-nowrap">
        <span className="my-auto">${price}</span>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/620e87c51a6cb2fde9b1a6b4973413b2bab4151f2979b91b5f731bd336f37fd7?apiKey=7e724f8dbe7341e8950e7325e9acf7be&" alt="Item" className="shrink-0 aspect-square w-[25px]" />
      </div>
    </li>
  );
}

export default CartItem;

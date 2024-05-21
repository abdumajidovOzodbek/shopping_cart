import React, { useEffect, useState } from 'react';
import CartItem from './CartItems';
import { openDatabase, getAllItems } from '../db';

function ShopCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      try {
        const db = await openDatabase();
        const allItems = await getAllItems(db);
        setItems(allItems);
        setTotal(calculateTotal(allItems));
      } catch (error) {
        console.error('Failed to fetch items from IndexedDB', error);
      }
    }

    fetchItems();
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="px-9 py-12 bg-white rounded-2xl max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <section className="w-[62%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
            <div className="flex items-center gap-0 text-lg font-semibold text-stone-900">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/36293e14b6688f1e5dbd1f7abd47f76c321f9243cadab588c022f9380c9d4436?apiKey=7e724f8dbe7341e8950e7325e9acf7be&"
                alt=""
                className="shrink-0 aspect-square w-[30px]"
              />
              <h2 className="flex-auto my-auto">Shopping Continue</h2>
            </div>
            <div className="flex flex-col mt-5 font-medium text-neutral-700 max-md:max-w-full">
              <hr className="shrink-0 h-px border-2 border-solid bg-stone-300 border-stone-300 max-md:max-w-full" />
              <h2 className="mt-8 text-lg text-stone-900 max-md:max-w-full">Shopping cart</h2>
              <p className="mt-1 text-sm text-stone-900 max-md:max-w-full">You have {items.length} item(s) in your cart</p>
              <ul>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    imgSrc={item.imgSrc}
                    title={item.title}
                    description={item.description}
                    quantity={item.quantity}
                    price={item.price}
                    setItems={setItems}
                    setTotal={setTotal}
                  />
                ))}
              </ul>
              <div className="mt-5 text-lg text-stone-900 max-md:max-w-full">Total: ${total}</div>
            </div>
          </div>
        </section>
        <aside className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 py-5 mx-auto w-full font-medium bg-indigo-700 rounded-3xl max-md:mt-10">
            <div className="flex items-center gap-5 text-2xl font-semibold text-white">
              <h2 className="flex-auto my-auto">Card Details</h2>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/38ddc26b3b4fca6dbbfbf40ff92970d224468bc980021148c4ae4d9a167d2aed?apiKey=7e724f8dbe7341e8950e7325e9acf7be&"
                alt="Card details"
                className="shrink-0 aspect-square w-[50px]"
              />
            </div>
            <p className="mt-5 text-base text-white">Card type</p>
            <div className="flex gap-4 mt-4 text-sm font-bold text-center text-white">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4134fd6b17881787c71ca10afdc4346055716b0db91701cec449f03fbd0eaeb6?apiKey=7e724f8dbe7341e8950e7325e9acf7be&"
                alt="Card type"
                className="shrink-0 aspect-[1.37] w-[100px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/607af968395b4cfdc1ec118bc08b0ee442c00ac3dcbf80f29fb9c7f2c88f4761?apiKey=7e724f8dbe7341e8950e7325e9acf7be&"
                alt="Card type"
                className="shrink-0 aspect-[1.37] w-[100px]"
              />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e97b3ddf546bfbc0ee21" alt="Card type" className="shrink-0 aspect-[1.37] w-[100px]" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ShopCart;

import React, { useState, useEffect } from "react";

import { openDatabase, getAllItems, addItem } from "../db.js";
import CartItem from "./CardItems";

export default function MyComponent() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async function () {
            const db = await openDatabase()
            const data = await getAllItems(db)
            setItems(data)
        })()
    }, [])

    return (
        <div className="px-9 py-12 bg-white rounded-2xl max-md:px-5">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <section className="w-[62%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
                        <div className="flex items-center gap-0 text-lg font-semibold text-stone-900">
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/36293e14b6688f1e5dbd1f7abd47f76c321f9243cadab588c022f9380c9d4436?apiKey=7e724f8dbe7341e8950e7325e9acf7be&" alt="" className="shrink-0 aspect-square w-[30px]" />
                            <h2 className="flex-auto my-auto">Shopping Continue</h2>
                        </div>
                        <div className="flex flex-col mt-5 font-medium text-neutral-700 max-md:max-w-full">
                            <hr className="shrink-0 h-px border-2 border-solid bg-stone-300 border-stone-300 max-md:max-w-full" />
                            <h2 className="mt-8 text-lg text-stone-900 max-md:max-w-full">Shopping cart</h2>
                            <p className="mt-1 text-sm text-stone-900 max-md:max-w-full">You have {items.length} item(s) in your cart</p>
                            <ul>
                                {items.map(item => (
                                    <CartItem
                                        key={item.id}
                                        imgSrc={item.imgSrc}
                                        title={item.title}
                                        description={item.description}
                                        quantity={item.quantity}
                                        price={item.price}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
                <aside className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 py-5 mx-auto w-full font-medium bg-indigo-700 rounded-3xl max-md:mt-10">
            <div className="flex items-center gap-5 text-2xl font-semibold text-white">
              <h2 className="flex-auto my-auto">Card Details</h2>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/38ddc26b3b4fca6dbbfbf40ff92970d224468bc980021148c4ae4d9a167d2aed?apiKey=7e724f8dbe7341e8950e7325e9acf7be&" alt="Card details" className="shrink-0 aspect-square w-[50px]" />
            </div>
            <p className="mt-5 text-base text-white">Card type</p>
            <div className="flex gap-4 mt-4 text-sm font-bold text-center text-white">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4134fd6b17881787c71ca10afdc4346055716b0db91701cec449f03fbd0eaeb6?apiKey=7e724f8dbe7341e8950e7325e9acf7be&" alt="Card type" className="shrink-0 aspect-[1.37] w-[100px]" />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/607af968395b4cfdc1ec118bc08b0ee442c00ac3dcbf80f29fb9c7f2c88f4761?apiKey=7e724f8dbe7341e8950e7325e9acf7be&" alt="Card type" className="shrink-0 aspect-[1.37] w-[100px]" />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e97b3ddf546bfbc0ee21f844d8e90c9c301506ca1fa98c038fac3f9ff38b67?apiKey=7e724f8dbe7341e8950e7325e9acf7be&" alt="Card type" className="shrink-0 aspect-[1.37] w-[100px]" />
              <button className="justify-center px-4 py-6 rounded-md bg-zinc-300 bg-opacity-20 cursor-pointer w-[100px]">See all</button>
            </div>
            <label className="mt-8 text-sm text-white" htmlFor="nameOnCard">Name on card</label>
            <input id="nameOnCard" className="px-5 py-4 mt-3 text-xs bg-indigo-500 rounded-md text-stone-300 max-md:pr-5" type="text" placeholder="Name" aria-label="Name on card" />
            <label className="mt-5 text-sm text-white" htmlFor="cardNumber">Card Number</label>
            <input id="cardNumber" className="px-5 py-4 mt-2.5 text-xs bg-indigo-500 rounded-md text-stone-300 max-md:pr-5" type="text" value="1111 2222 3333 4444" readOnly />
            <div className="flex gap-2 mt-5">
              <div className="flex flex-col flex-1">
                <label className="text-sm text-white" htmlFor="expirationDate">Expiration date</label>
                <input id="expirationDate" className="px-5 py-3.5 mt-1.5 text-xs bg-indigo-500 rounded-md text-stone-300 max-md:pr-5" type="text" placeholder="mm/yy" aria-label="Expiration date" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm text-white" htmlFor="cvv">CVV</label>
                <input id="cvv" className="px-5 py-3.5 mt-1.5 text-xs bg-indigo-500 rounded-md text-stone-300 max-md:pr-5" type="text" placeholder="123" aria-label="CVV" />
              </div>
            </div>
            <hr className="shrink-0 mt-5 h-px bg-indigo-500 border border-indigo-500 border-solid" />
            <div className="flex gap-5 justify-between mt-5 text-sm text-white">
              <div>
                <p>Subtotal</p>
                <p className="mt-4">Shipping</p>
                <p className="mt-2.5">Total (Tax incl.)</p>
              </div>
              <div className="text-right">
                <p>$1,668</p>
                <p className="mt-3.5">$4</p>
                <p className="mt-4">$1,672</p>
              </div>
            </div>
            <div className="flex gap-5 justify-between px-6 py-5 mt-7 w-full text-base text-white bg-teal-300 rounded-xl max-md:pl-5">
              <p className="my-auto">$1,672</p>
              <div className="flex items-center gap-2 cursor-pointer" role="button" tabIndex="0">
                <span>Checkout</span>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/af6b0acbfc3f32c227a0e7775da13090d3bc97c87e29eac3d4765ae8abfbe4a1?apiKey=7e724f8dbe7341e8950e7325e9acf7be&" alt="Checkout" className="shrink-0 aspect-square w-[25px]" />
              </div>
            </div>
          </div>
        </aside>
            </div>
        </div>
    );
}

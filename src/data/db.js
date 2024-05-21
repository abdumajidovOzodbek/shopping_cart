export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("CartDatabase", 1);
        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("cartItems", { keyPath: "id", autoIncrement: true });
        };
    });
}

export function getAllItems(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["cartItems"], "readonly");
        const store = transaction.objectStore("cartItems");
        const request = store.getAll();
        request.onerror = (event) => {
            reject(`Transaction error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

export function addItem(db, item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["cartItems"], "readwrite");
        const store = transaction.objectStore("cartItems");
        const request = store.add(item);

        request.onerror = (event) => {
            reject(`Add item error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}
export async function deleteItem(id) {
    const db = await openDatabase()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["cartItems"], "readwrite");
        const store = transaction.objectStore("cartItems");
        const deleteRequest = store.delete(id);
        deleteRequest.onerror = (deleteEvent) => {
            reject(`Delete item error: ${deleteEvent.target.errorCode}`);
        };
        deleteRequest.onsuccess = (deleteEvent) => {
            resolve(deleteEvent.target.result);
        };
    });
}
export function updateItem(id, updatedItem) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(["cartItems"], "readwrite");
            const store = transaction.objectStore("cartItems");
            const request = store.get(id);

            request.onerror = (event) => {
                reject(`Get item error: ${event.target.errorCode}`);
            };

            request.onsuccess = (event) => {
                const data = event.target.result;
                if (data) {
                    const updatedData = { ...data, ...updatedItem };
                    if (updatedData.quantity === 0) {
                        const deleteRequest = store.delete(id);
                        deleteRequest.onerror = (deleteEvent) => {
                            reject(`Delete item error: ${deleteEvent.target.errorCode}`);
                        };
                        deleteRequest.onsuccess = (deleteEvent) => {
                            resolve(deleteEvent.target.result);
                        };
                    } else {
                        const updateRequest = store.put(updatedData);
                        updateRequest.onerror = (updateEvent) => {
                            reject(`Update item error: ${updateEvent.target.errorCode}`);
                        };
                        updateRequest.onsuccess = (updateEvent) => {
                            resolve(updateEvent.target.result);
                        };
                    }
                } else {
                    reject(`Item with id ${id} not found.`);
                }
            };
        } catch (error) {
            reject(`Error updating item: ${error.message}`);
        }
    });
}

export function clearAll() {
    const DBDeleteRequest = window.indexedDB.deleteDatabase("CartDatabase");

    DBDeleteRequest.onerror = (event) => {
        console.error("Error deleting database.");
    };

    DBDeleteRequest.onsuccess = (event) => {
        console.log("Database deleted successfully");
    };
}



(async function () {
    const db = await openDatabase();
    const allItems = await getAllItems(db);
    console.log(allItems);
    if (!allItems.length) {
        await Promise.all([
            addItem(db, {
                imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f323fefcb8dc64629100962333618602ce38ca831668e6c56b2102deb366840b?apiKey=7e724f8dbe7341e8950e7325e9acf7be&",
                title: "Italy Pizza",
                description: "Extra cheese and topping",
                quantity: 1,
                price: 681
            }),
            addItem(db, {
                imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/394059da929999217857497ce2624b43920f43637c04a276554354a93d554e85?apiKey=7e724f8dbe7341e8950e7325e9acf7be&",
                title: "Combo Plate",
                description: "Extra cheese and topping",
                quantity: 1,
                price: 681
            }),
            addItem(db, {
                imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/08debe566708b0604069012bb45c4f826d9aeec0abe28eb21d9a7e8177a9ba38?apiKey=7e724f8dbe7341e8950e7325e9acf7be&",
                title: "Spanish Rice",
                description: "Extra garlic",
                quantity: 1,
                price: 681
            })
        ])
    }
})()












export function openDatabaseOfShipping() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ShippingDB', 1);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.errorCode);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('ShippingCost')) {
                db.createObjectStore('ShippingCost', { keyPath: 'id' });
            }
        };
    });
}



function saveShippingCost(cost) {
    const request = indexedDB.open('ShippingDB', 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['ShippingCost'], 'readwrite');
        const objectStore = transaction.objectStore('ShippingCost');
        const data = { id: 'fixedShippingCost', cost: cost };

        const putRequest = objectStore.put(data);
        putRequest.onerror = (event) => {
            console.error('Error saving shipping cost:', event.target.errorCode);
        };
    };
}

saveShippingCost(4);

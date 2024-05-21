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

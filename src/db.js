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
                    const updateRequest = store.put(updatedData);

                    updateRequest.onerror = (updateEvent) => {
                        reject(`Update item error: ${updateEvent.target.errorCode}`);
                    };

                    updateRequest.onsuccess = (updateEvent) => {
                        resolve(updateEvent.target.result);
                    };
                } else {
                    reject(`Item with id ${id} not found.`);
                }
            };
        } catch (error) {
            reject(`Error updating item: ${error.message}`);
        }
    });
}

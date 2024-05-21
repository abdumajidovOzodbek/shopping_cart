export function openDatabaseOfOrder() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("OrderDatabase", 1);
        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("orders", { keyPath: "id", autoIncrement: true });
        };
    });
}
export function getAllOrders(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["orders"], "readonly");
        const store = transaction.objectStore("orders");
        const request = store.getAll();
        request.onerror = (event) => {
            reject(`Transaction error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

export function addOrder(db, item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["orders"], "readwrite");
        const store = transaction.objectStore("orders");
        const request = store.add(item);
        request.onerror = (event) => {
            reject(`Add item error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

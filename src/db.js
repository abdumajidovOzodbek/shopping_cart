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
  
class Queue {
    constructor() {
      this.items = [];
    }
  
    include(token){
        return this.items.includes(token)
    }

    enqueue(element) {
      this.items.push(element);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return false;
      }
      return this.items.shift();
    }
  
    front() {
      if (this.isEmpty()) {
        return "No elements in queue";
      }
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  // Example usage:
  
  const customQueue = new Queue();
  
  module.exports = customQueue
  
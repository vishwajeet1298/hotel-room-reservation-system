export class Room {
    constructor(floor, number, type = 'Standard', price = 100, amenities = []) {
      this.floor = floor;
      this.number = number;
      this.type = type;
      this.price = price;
      this.amenities = amenities;
      this.isBooked = false;
      this.recentlyBooked = false; // New property
    }
  
    book() {
      if (!this.isBooked) {
        this.isBooked = true;
        this.recentlyBooked = true; // Mark as recently booked
        return true;
      }
      return false;
    }
  
    unbook() {
      if (this.isBooked) {
        this.isBooked = false;
        this.recentlyBooked = false; // Reset recently booked status
        return true;
      }
      return false;
    }
  }
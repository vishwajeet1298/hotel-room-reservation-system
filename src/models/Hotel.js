import { Room } from './Room';

export class Hotel {
  constructor() {
    this.rooms = this.initializeRooms();
  }

  initializeRooms() {
    const rooms = [];
    for (let floor = 1; floor <= 9; floor++) {
      for (let number = 1; number <= 10; number++) {
        rooms.push(new Room(floor, floor * 100 + number));
      }
    }
    for (let number = 1; number <= 7; number++) {
      rooms.push(new Room(10, 1000 + number));
    }
    return rooms;
  }

  getAvailableRooms() {
    return this.rooms.filter(room => !room.isBooked);
  }

  calculateTravelTime(rooms) {
    if (rooms.length <= 1) return 0;

    let travelTime = 0;
    rooms.sort((a, b) => (a.floor === b.floor ? a.number - b.number : a.floor - b.floor));

    for (let i = 1; i < rooms.length; i++) {
      if (rooms[i].floor === rooms[i - 1].floor) {
        travelTime += Math.abs(rooms[i].number - rooms[i - 1].number);
      } else {
        travelTime += 2 * Math.abs(rooms[i].floor - rooms[i - 1].floor);
      }
    }

    return travelTime;
  }

  bookRooms(numRooms) {
    if (numRooms > 5) {
      return null; // A single guest can book up to 5 rooms at a time
    }

    const availableRooms = this.getAvailableRooms();
    if (availableRooms.length < numRooms) {
      return null;
    }

    // Prioritize booking rooms on the same floor
    const roomsByFloor = {};
    availableRooms.forEach(room => {
      if (!roomsByFloor[room.floor]) {
        roomsByFloor[room.floor] = [];
      }
      roomsByFloor[room.floor].push(room);
    });

    for (const floor in roomsByFloor) {
      if (roomsByFloor[floor].length >= numRooms) {
        const roomsToBook = roomsByFloor[floor].slice(0, numRooms);
        roomsToBook.forEach(room => room.book());
        return roomsToBook;
      }
    }

    // If not enough rooms on the same floor, minimize travel time
    const roomsToBook = [];
    let remainingRooms = numRooms;
    for (const floor in roomsByFloor) {
      if (remainingRooms <= 0) break;
      const roomsOnFloor = roomsByFloor[floor];
      const roomsToTake = Math.min(remainingRooms, roomsOnFloor.length);
      roomsToBook.push(...roomsOnFloor.slice(0, roomsToTake));
      remainingRooms -= roomsToTake;
    }

    // Calculate the travel time and optimize the room selection
    let minTravelTime = Infinity;
    let bestCombination = null;

    const combinations = this.getCombinations(roomsToBook, numRooms);
    combinations.forEach(combination => {
      const travelTime = this.calculateTravelTime(combination);
      if (travelTime < minTravelTime) {
        minTravelTime = travelTime;
        bestCombination = combination;
      }
    });

    if (bestCombination) {
      bestCombination.forEach(room => room.book());
      return bestCombination;
    }

    return null;
  }

  getCombinations(arr, k) {
    const result = [];
    const f = (prefix, arr) => {
      if (prefix.length === k) {
        result.push(prefix);
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        f([...prefix, arr[i]], arr.slice(i + 1));
      }
    };
    f([], arr);
    return result;
  }

  resetBookings() {
    this.rooms.forEach(room => {
      room.unbook();
      room.recentlyBooked = false; // Reset recently booked status
    });
  }

  randomizeOccupancy() {
    this.rooms.forEach(room => {
      room.isBooked = Math.random() < 0.5;
      room.recentlyBooked = false; // Reset recently booked status
    });
  }
}
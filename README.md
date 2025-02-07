# Hotel Room Reservation System

## Table of Contents
- Introduction
- Problem Statement
- Features
- Installation
- Usage
- Contributing
- License

## Introduction
This project is a React Native application designed to manage room reservations in a hotel with 97 rooms distributed across 10 floors. The system dynamically calculates the total travel time between booked rooms and optimally assigns rooms based on predefined rules.

## Problem Statement
A hotel has 97 rooms distributed across 10 floors:
- **Floors 1-9**: Each floor has 10 rooms, numbered sequentially (e.g., Floor 1: 101-110, Floor 2: 201-210, and so on).
- **Floor 10 (Top Floor)**: Has only 7 rooms, numbered 1001-1007.

### Building Structure
1. A staircase and lift are located on the left side of the building.
2. Rooms on each floor are arranged sequentially from left to right, with the first room on each floor being closest to the stairs/lift.

### Room Proximity (Travel Time)
1. **Horizontal travel**: Moving between two adjacent rooms on the same floor takes 1 minute per room.
2. **Vertical travel**: Moving between floors takes 2 minutes per floor using the stairs/lift.

### Booking Rules
1. A single guest can book up to 5 rooms at a time.
2. Priority is to book rooms on the same floor first.
3. If rooms are not available on the same floor, priority is to book rooms that minimize the total travel time between the first and last room in the booking.
4. If the required number of rooms is unavailable on one floor, booking should span across floors, prioritizing rooms that minimize the combined vertical and horizontal travel time.

## Features
- Interface to enter the number of rooms and book them.
- Visualization of booking.
- Button to generate random occupancy on rooms.
- Button to reset entire booking.

## Installation
To install and run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hotel-room-reservation.git
   cd hotel-room-reservation

2. Install the dependencies:
   ```bash
   npm install
4. Run the application:
   ```bash
   npm start

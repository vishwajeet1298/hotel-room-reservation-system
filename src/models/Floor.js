import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Floor = ({ floorNumber, rooms }) => {
  return (
    <View style={styles.floorContainer}>
      <Text style={styles.floorLabel}>Floor {floorNumber}</Text>
      <ScrollView horizontal contentContainerStyle={styles.roomsContainer}>
        {rooms.map(room => (
          <View
            key={room.number}
            style={[
              styles.room,
              room.isBooked && styles.bookedRoom,
              room.recentlyBooked && styles.recentlyBookedRoom,
            ]}
          >
            <Text>{room.number}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  floorContainer: {
    padding: 10,
    backgroundColor: '#FFEB3B', // Yellow for floor
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  floorLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212121',
  },
  roomsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  room: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  bookedRoom: {
    backgroundColor: '#D32F2F', // Dark Red for occupied room
  },
  recentlyBookedRoom: {
    borderColor: '#1976D2', // Dark Blue for recently booked room
    borderWidth: 2,
  },
});

export default Floor;
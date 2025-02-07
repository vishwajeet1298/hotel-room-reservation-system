import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Floor from '../models/Floor';

const Building = ({ hotel }) => {
  const floors = [];
  for (let floor = 10; floor >= 1; floor--) {
    const rooms = hotel.rooms.filter(room => room.floor === floor);
    floors.push(<Floor key={floor} floorNumber={floor} rooms={rooms} />);
  }

  return (
    <View style={styles.buildingContainer}>
      <View style={styles.stairsLiftContainer}>
        <View style={styles.stairsLift}>
          <Text style={styles.stairsLiftText}>Stairs/Lift</Text>
        </View>
      </View>
      <View style={styles.floorsContainer}>
        {floors}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    buildingContainer: {
      flexDirection: 'row',
      paddingVertical: 5,
    },
    stairsLiftContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2E7D32', // Dark Green for stairs/lift
      borderRadius: 5,
      padding: 10,
    },
    stairsLift: {
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stairsLiftText: {
      color: '#FFFFFF', // White text for contrast
      fontWeight: 'bold',
    },
    floorsContainer: {
      flex: 1,
    },
  });
  
  export default Building;
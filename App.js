import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Building from './src/components/Building';
import { Hotel } from './src/models/Hotel';
import { bookRooms } from './src/utils/booking';

const hotel = new Hotel();

const App = () => {
    const [availableRooms, setAvailableRooms] = useState(hotel.getAvailableRooms());
    const [bookedRooms, setBookedRooms] = useState([]);
    const [numRooms, setNumRooms] = useState('');

    const handleBookRooms = () => {
        const rooms = bookRooms(hotel, parseInt(numRooms));
        if (rooms) {
            setBookedRooms(rooms);
            setAvailableRooms(hotel.getAvailableRooms());
            Alert.alert('Success', 'Rooms booked successfully!');
        } else {
            Alert.alert('Error', 'Not enough rooms available.');
        }
    };

    const handleReset = () => {
        hotel.resetBookings();
        setAvailableRooms(hotel.getAvailableRooms());
        setBookedRooms([]);
    };

    const handleRandomize = () => {
        hotel.randomizeOccupancy();
        setAvailableRooms(hotel.getAvailableRooms());
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Hotel Room Reservation System</Text>
            <Text style={styles.subtitle}>Available Rooms: {availableRooms.length}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter number of rooms"
                keyboardType="numeric"
                value={numRooms}
                onChangeText={setNumRooms}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleBookRooms}>
                    <Text style={styles.buttonText}>Book Rooms</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                 
                    <Text style={styles.buttonText}>Reset Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleRandomize}>
                   
                    <Text style={styles.buttonText}>Randomize Occupancy</Text>
                </TouchableOpacity>
            </View>
            {bookedRooms.length > 0 && (
                <View style={styles.bookedRoomsContainer}>
                    <Text style={styles.subtitle}>Recently Booked Rooms:</Text>
                    {bookedRooms.map(room => (
                        <Text key={room.number} style={styles.bookedRoom}>
                            Room {room.number} on Floor {room.floor}
                        </Text>
                    ))}
                </View>
            )}
            <Building hotel={hotel} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#212121',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#212121',
    },
    input: {
        height: 40,
        borderColor: '#6200EE',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    bookedRoomsContainer: {
        marginVertical: 20,
    },
    bookedRoom: {
        fontSize: 16,
        color: '#1976D2',
        marginBottom: 5,
    },
});

export default App;
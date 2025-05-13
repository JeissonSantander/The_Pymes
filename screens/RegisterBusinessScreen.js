import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function RegisterBusinessScreen() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    'Restaurante', 'Tienda', 'Cafetería', 'Supermercado', 'Mercado',
    'Frutería', 'Ferretería', 'Farmacia', 'Librería', 'Ropa',
    'Zapatería', 'Juguetería', 'Papelería', 'Barbería', 'Estética',
  ];

  const handleRegister = async () => {
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      alert('Latitud y longitud válidas son requeridas.');
      return;
    }

    try {
      const newBusiness = {
        name,
        category,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'negocios'), newBusiness);

      alert('Negocio registrado correctamente');
      setName('');
      setCategory('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
      alert('Hubo un error al guardar el negocio');
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso para acceder a la ubicación fue denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    } catch (error) {
      alert('Error al obtener la ubicación');
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar Negocio</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="business" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre del negocio"
            value={name}
            onChangeText={setName}
          />
        </View>

        <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
          <Ionicons name="pricetag" size={20} color="#666" style={styles.icon} />
          <Text style={styles.input}>{category || 'Selecciona una categoría'}</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => {
                      setCategory(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.categoryText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.inputContainer}>
          <Ionicons name="locate" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Latitud (ej: 1.205)"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="locate" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Longitud (ej: -77.278)"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
          <Text style={styles.locationButtonText}>📍 Usar mi ubicación actual</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>📌 Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#2196F3',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

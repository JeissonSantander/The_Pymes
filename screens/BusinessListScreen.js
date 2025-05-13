import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const categoryIcons = {
  'Restaurante': 'restaurant',
  'Tienda': 'cart',
  'Cafetería': 'cafe',
  'Supermercado': 'basket',
  'Mercado': 'storefront',
  'Frutería': 'leaf',
  'Ferretería': 'hammer',
  'Farmacia': 'medkit',
  'Librería': 'book',
  'Ropa': 'shirt',
  'Zapatería': 'walk',
  'Juguetería': 'game-controller',
  'Papelería': 'document',
  'Barbería': 'cut',
  'Estética': 'color-palette',
};

export default function BusinessListScreen() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'negocios'), (snapshot) => {
      const businessData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          category: data.category || '',
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        };
      }).filter(b => !isNaN(b.latitude) && !isNaN(b.longitude)); // Validación de coordenadas
      setBusinesses(businessData);
      setLoading(false);
    }, (error) => {
      console.log('Error al cargar negocios:', error);
      setLoading(false);
    });

    return () => unsubscribe(); // limpieza
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons
        name={categoryIcons[item.category] || 'business'}
        size={32}
        color="#2196F3"
        style={styles.icon}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.coordinates}>
          Lat: {item.latitude} | Lon: {item.longitude}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Cargando negocios...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={businesses}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#f4f6f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  coordinates: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

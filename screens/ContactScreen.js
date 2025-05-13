import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ContactScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Contáctanos</Text>
        <View style={styles.separator} />
        <Text style={styles.text}>
          📧 Email: soporte@pymesmanager.com{'\n\n'}
          📞 Teléfono: +57 317 000 0000{'\n\n'}
          📍 Dirección: San Juan de Pasto, Nariño, Colombia
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#2196F3',
    width: '30%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: width * 0.045,
    lineHeight: 26,
    textAlign: 'justify',
    color: '#333',
  },
});

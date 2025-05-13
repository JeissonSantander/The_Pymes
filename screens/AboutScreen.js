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

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sobre Nosotros</Text>
        <View style={styles.separator} />
        <Text style={styles.text}>
          The Pymes Manager es una plataforma dedicada a fortalecer a las
          MiPymes de San Juan de Pasto mediante tecnología, visibilidad y
          gestión moderna. Buscamos empoderar a los pequeños negocios con
          herramientas digitales para crecer, conectar y posicionarse en su
          comunidad.
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
    fontSize: width * 0.06, // Aproximadamente 22px
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
    fontSize: width * 0.045, // Aproximadamente 16px
    lineHeight: 24,
    textAlign: 'justify',
    color: '#333',
  },
});

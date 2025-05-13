import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RegisterClientScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const userTypes = ['Cliente', 'Emprendedor'];

  const handleRegister = async () => {
    if (!name || !email || !password || !document || !phone || !address || !userType) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.7:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          document,
          phone,
          address,
          userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registro exitoso', data.message);
        navigation.goBack(); // o navega al login
      } else {
        Alert.alert('Error en el registro', data.error || 'No se pudo registrar el usuario.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'Error de conexión con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top section */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Registro</Text>
      </View>

      {/* Bottom section */}
      <ScrollView contentContainerStyle={styles.bottomSection} showsVerticalScrollIndicator={false}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <TextInput style={styles.input} placeholder="Nombre completo" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Número de documento" value={document} onChangeText={setDocument} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Dirección" value={address} onChangeText={setAddress} />

        <Text style={styles.label}>Tipo de usuario</Text>
        <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
          <Text style={{ color: userType ? '#000' : '#888' }}>
            {userType || 'Selecciona una opción...'}
          </Text>
        </TouchableOpacity>

        {/* Modal de tipo de usuario */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView>
                {userTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => {
                      setUserType(type);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>📝 Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topSection: {
    height: height * 0.22,
    backgroundColor: '#0A0E21',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: width * 0.08,
    fontWeight: 'bold',
  },
  bottomSection: {
    padding: width * 0.06,
    paddingBottom: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#2E86DE',
    width: '100%',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#0066cc',
    textAlign: 'center',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: 400,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  modalClose: {
    marginTop: 20,
    backgroundColor: '#2E86DE',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default RegisterClientScreen;

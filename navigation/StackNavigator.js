// navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterBusinessScreen from '../screens/RegisterBusinessScreen';
import MapScreen from '../screens/MapScreen';
import RegisterClientScreen from '../screens/RegisterClientScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Inicio"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Registro"
                component={RegisterBusinessScreen}
                options={{ title: 'Registrar Negocio' }}
            />
            <Stack.Screen
                name="Mapa"
                component={MapScreen}
                options={{ title: 'Negocios Cercanos' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterClientScreen}
                options={{ title: 'Registro' }}
            />
        </Stack.Navigator>
    );
}

const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');  // Agregar bcrypt para hashing de contraseñas
const saltRounds = 10;  // Definir los rounds para el hashing

// REGISTRO DE CLIENTE
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, document, phone, address, userType } = req.body;

    // Verificar si ya existe el usuario
    const existingUser = await pool.query('SELECT * FROM clients WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario con la contraseña encriptada
    await pool.query(
      'INSERT INTO clients (name, email, password, document, phone, address, userType) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, email, hashedPassword, document, phone, address, userType]
    );

    res.status(201).json({ message: 'Cliente registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// LOGIN DE CLIENTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM clients WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Comparar la contraseña proporcionada con la almacenada (con hash)
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Login exitoso
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

module.exports = router;

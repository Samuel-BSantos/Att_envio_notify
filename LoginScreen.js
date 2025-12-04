import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = () => {
    axios.get('http://localhost:3000/usuarios')
      .then(res => {
        const users = res.data;
        const user = users.find(u => u.email === email && u.senha === senha);

        if (user) {
          navigation.navigate('Home');
        } else {
          Alert.alert("Erro", "Email ou senha inválidos");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#f7f9fc'
  },

  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    elevation: 2,          
    shadowColor: '#000',  
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6
  },

  buttonText: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold' 
  },

  link: { 
    color: '#4A90E2', 
    marginTop: 20, 
    textAlign: 'center',
    fontSize: 16
  }
});

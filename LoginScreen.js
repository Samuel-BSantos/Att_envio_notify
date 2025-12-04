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
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 15, borderRadius: 5
  },
  button: {
    backgroundColor: '#0066ff', padding: 15,
    borderRadius: 5, alignItems: 'center', marginTop: 10
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' }
});

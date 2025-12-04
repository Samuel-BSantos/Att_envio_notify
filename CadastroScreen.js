import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const gerarToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString();
  };

  const save = () => {
    const tokenGerado = gerarToken();

    axios.post('http://localhost:3000/usuarios', {
      nome,
      email,
      senha,
      token: tokenGerado
    })
    .then(() => navigation.navigate('Login'))
    .catch(err => console.log("Erro ao cadastrar:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

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

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Já tenho conta</Text>
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
    elevation: 2,          // sombra Android
    shadowColor: '#000',   // sombra iOS
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
    shadowRadius: 5
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

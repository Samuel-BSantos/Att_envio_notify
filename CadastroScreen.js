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
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 15, borderRadius: 5
  },
  button: {
    backgroundColor: '#28a745', padding: 15,
    borderRadius: 5, alignItems: 'center', marginTop: 10
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' }
});

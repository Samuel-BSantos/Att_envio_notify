import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  Modal, TextInput
} from 'react-native';
import axios from 'axios';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const carregarUsuarios = () => {
    axios.get('http://localhost:3000/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.log("Erro ao buscar usuários:", err));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const abrirModal = (usuario) => {
    setUsuarioSelecionado(usuario);
    setMensagem('');
    setModalVisible(true);
  };

 const enviarNotificacao = async () => {
  try {
    await axios.post("https://exp.host/--/api/v2/push/send", {
      to: usuarioSelecionado.token,
      sound: "default",
      title: "Nova mensagem",
      body: mensagem
    });

    alert("Notificação enviada!");
  } catch (err) {
    console.log("Erro:", err);
  }

  setModalVisible(false);
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>

      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => abrirModal(item)}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Enviar notificação para {usuarioSelecionado?.nome}
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Digite a mensagem"
              value={mensagem}
              onChangeText={setMensagem}
            />

            <TouchableOpacity style={styles.modalBtn} onPress={enviarNotificacao}>
              <Text style={styles.modalBtnTxt}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.link}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f7f9fc'
  },

  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 25,
    textAlign: 'center',
    color: '#333'
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,              // Android
    shadowColor: '#000',       // iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },

  nome: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333' 
  },

  email: { 
    fontSize: 16, 
    color: '#777',
    marginTop: 5
  },

  modalFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)'
  },

  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fdfdfd',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20
  },

  modalBtn: {
    backgroundColor: '#4A90E2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },

  modalBtnTxt: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold' 
  },

  link: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#4A90E2',
    fontSize: 16 
  }
});

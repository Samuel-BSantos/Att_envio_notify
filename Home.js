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
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#f1f1f1', padding: 15,
    borderRadius: 8, marginBottom: 10
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#555' },

  modalFundo: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    width: '85%', backgroundColor: '#fff',
    padding: 20, borderRadius: 10
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalInput: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 10, borderRadius: 5, marginBottom: 15
  },
  modalBtn: {
    backgroundColor: '#0066ff', padding: 12,
    borderRadius: 8, alignItems: 'center'
  },
  modalBtnTxt: { color: '#fff', fontWeight: 'bold' },
  link: { textAlign: 'center', marginTop: 15, color: 'blue' }
});

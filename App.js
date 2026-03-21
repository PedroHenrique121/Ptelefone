import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

const DATA = [
  {
    title: "Marcos Andrade",
    telefone: "81 988553424",
    email: "marcosAndrade67@gmail.com"
  },
  {
    title: "Patrícia Tavares",
    telefone: "81 998765332",
    email: "patriciaTavares67@gmail.com"
  },
  {
    title: "Rodrigo Antunes",
    telefone: "81 987765525",
    email: "rodrigoAntunes67@gmail.com"
  }
];

const Item = ({ title, telefone }) => (
  <View style={styles.item}>
    <View>
      <Image
        style={{ width: 50, height: 50, marginBottom: 20 }}
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }}
      />
    </View>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{telefone}</Text>
    </View>
  </View>
);

// LOGIN
function LoginT({ navigation }) {

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    console.log("Tela de login carregada");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Text>Senha</Text>
      <TextInput
        placeholder="senha"
        secureTextEntry={true}
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <View style={{ marginTop: 20, width: 200 }}>
        <View style={{ borderBlockColor: 'black', borderWidth: 1, borderRadius: 5, marginBottom: 10 }}>
          <Button
            title="Entrar"
            color={'red'}
            onPress={() => navigation.navigate('ListaContatos')}
          />
        </View>

        <View style={{ borderBlockColor: 'black', borderWidth: 1, borderRadius: 5 }}>
          <Button title="Cadastrar-se" onPress={() => navigation.navigate('Cadastro')} />
        </View>
      </View>
    </View>
  );
}

function ListaContatos({ navigation }) {

  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    buscarContatos();
  }, []);

  async function buscarContatos() {
    try {
      const response = await api.get('/contatos');
      setContatos(response.data);
    } catch (error) {
      console.log("Erro ao buscar:", error);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 60 }}>
      <FlatList
        data={contatos}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('AlteraContatos', item)}>
            <Item title={item.nome} telefone={item.telefone} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// CADASTRO
function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop:60}}>
     
      <Text style={{fontSize:24}}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={{fontSize:24}}>CPF</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={setCpf} />

      <Text style={{fontSize:24}}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={{fontSize:24}}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Cadastrar-se" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

function CadastroContato({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  async function salvarContato() {
    try {
      await api.post('/contatos', {
        nome,
        email,
        telefone
      });

      navigation.navigate('ListaContatos');

    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop:60}}>
     
      <Text>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text>Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

      <Button title="Salvar" onPress={salvarContato} />
    </View>
  );
}
function AlteraContatos({ navigation, route }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    if (route.params) {
      setNome(route.params.nome);
      setEmail(route.params.email);
      setTelefone(route.params.telefone);
    }
  }, [route.params]);

  async function alterarContato() {
    try {
      await api.put(`/contatos/${route.params.id}`, {
        nome,
        email,
        telefone
      });

      navigation.navigate('ListaContatos');

    } catch (error) {
      console.log("Erro ao atualizar:", error);
    }
  }

  async function deletarContato() {
    try {
      await api.delete(`/contatos/${route.params.id}`);
      navigation.navigate('ListaContatos');
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop:50 }}>

      <Text style={{fontSize:24}}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={{fontSize:24}}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={{fontSize:24}}>Telefone</Text>
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

      <View style={{ width:200, marginTop:30}}>

        <Button
          title="Alterar"
          color={'blue'}
          onPress={alterarContato}
        />

        <Button
          title="Excluir"
          color={'red'}
          onPress={deletarContato}
        />

      </View>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginT} options={{ headerShown: false }} />
        <Stack.Screen
          name="ListaContatos"
          component={ListaContatos}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerRight: () => (
              <Button
                title="+"
                onPress={() => navigation.navigate("CadastroContato")}
              />
            ),
          })}
        />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="CadastroContato" component={CadastroContato} options={{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="AlteraContatos" component={AlteraContatos} options={{ headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ESTILOS (intactos)
const styles = {
  input: {
    width: 200,
    backgroundColor: '#D3D3D3',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 12
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#dad8d8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 300,
    flexDirection: "row"
  },
  title: {
    fontSize: 16
  },
}

export default App;
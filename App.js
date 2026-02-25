import * as React from 'react';
import { View, Text , Button, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

function Login({navigation}) {
return (

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#fff' }}>
<Image
          style={{ width: 100, height: 100, marginBottom: 20 }}
        source={{
          uri: 'data:image/jpeg;base64,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',
        }}
  />
<Text>Login</Text>
<input type="text" placeholder="Username" style={ {width: '200',

    backgroundColor: '#ffffff',
    height: 30,
    }} />
<Text>Senha</Text>
<input type="password" placeholder="senha" style={ {width: '250',

    backgroundColor: '#ffffff',
    height: 30
    }} />
<View style={{marginTop: 20, width: 180, }}>

    <View style={{borderBlockColor: 'black', borderWidth: 1, borderRadius: 5}}>
     <Button
          title="Entrar"
          color={'red'}

          onPress={() => navigation.navigate('ListaContatos')}
        /></View>
        <br></br>
        <View style={{borderBlockColor: 'black', borderWidth: 1, borderRadius: 5}}>

        <Button title="Cadastrar-se" onPress={() => navigation.navigate('Cadastro')}/> 
        </View>
      
</View>
</View>
);        
}

function ListaContatos() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Lista de Contatos</Text>
</View>
);
}
function Cadastro() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Cadastro</Text>
<Text>Nome</Text>
<input type="text" placeholder="Username" />
<Text>CPf</Text>
<input type="password" placeholder="CPF" />
<Text>Email</Text>
<input type="text" placeholder="E-mail" />
<Text>Senha</Text>
<input type="password" placeholder="senha" />
<Button title="Cadastrar-se" onPress={() => navigation.navigate('Login')}>
  </Button> 
</View>
);
}
function CadastroContato() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Cadastro</Text>
<Text>Nome</Text>
<input type="text" placeholder="Username" />
<Text>Email</Text>
<input type="text" placeholder="E-mail" />
<Text>Senha</Text>
<input type="password" placeholder="senha" />
<Button title="Salvar" onPress={() => navigation.navigate('ListaContatos')}>
  </Button> 
</View>
);
}
function AlteraContatos() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Cadastro</Text>
<Text>Nome</Text>
<input type="text" placeholder="Username" />
<Text>Email</Text>
<input type="text" placeholder="E-mail" />
<Text>Telefone</Text>
<input type="text" placeholder="Telefone" />
<Button title="Alterar" onPress={() => navigation.navigate('ListaContatos')}>
  </Button> 
  <Button title="Excluir" onPress={() => navigation.navigate('ListaContatos')}>
  </Button>
</View>
);
}

const Stack = createNativeStackNavigator();

function App() {
return (
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
<Stack.Screen name="ListaContatos" component={ListaContatos} options={{headerTitleAlign: 'center'}}/>
<Stack.Screen name="Cadastro" component={Cadastro} options={{headerTitleAlign: 'center'}}/>
</Stack.Navigator>
</NavigationContainer>
);
}

export default App;

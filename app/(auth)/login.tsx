import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, Alert, Platform } from 'react-native';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useRouter } from 'expo-router';
// import { saveToken, removeToken } from '../utils/auth';
import { useAuth } from '@/contexts/AuthContext';



type Inputs = {
  email: string; 
  senha: string;
  continuar: boolean;
};

console.log("API URL:", process.env.EXPO_PUBLIC_URL_API);


const LoginScreen = () => {
  // const {setMemoryToken} = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [continuar, setContinuar] = useState(false)
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const { setMemoryToken, savePersistentToken, setUserData } = useAuth();

  // essa lógica ja está na API, comentada por enquanto
  // const validateForm = () => {
  //   const newErrors: { email?: string, password?: string } = {};

  //   if (!email) {
  //     newErrors.email = 'O e-mail é obrigatório';
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = 'E-mail inválido';
  //   }

  //   if (!senha) {
  //     newErrors.password = 'A senha é obrigatória';
  //   } else if (senha.length < 6) {
  //     newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  async function verificaLogin(data: Inputs) {

    setLoading(true)
    try {
      const {continuar, ...dadosLimpos} = data;
      console.log("Dados enviados:", dadosLimpos);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_URL_API}/clientes/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosLimpos),
        }
      );
      

      if (response.status === 200) {
        const dados = await response.json(); 
        console.log(dados)
        console.log(dados.id)
        // Salvar dados no AsyncStorage
          if (data.continuar) {
            await savePersistentToken(dados.token, dados.id); // Passe o id junto
            setUserData(dados.id);
            setMemoryToken(dados.token);
          } else {
            setMemoryToken(dados.token);
            setUserData(dados.id);
          }
          setLoading(false)

          router.replace('/'); // vai para home se estiver logado
        } else {
          if (Platform.OS == 'web') {
            window.alert('Login ou senha incorretos')
          } else {
            Alert.alert('Erro', 'Login ou senha incorretos');
          }
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Algo deu errado...');
      }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/calendario.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Minha Agenda</Text>
          <Text style={styles.subtitle}>
            Organize sua rotina com facilidade
          </Text>
        </View>

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          error={errors.email}
        />

        <Input
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setContinuar(true)}
          style={styles.checkboxContainer}
        >
          <View
            style={[styles.checkbox, continuar && styles.checkboxChecked]}
          />
          <Text style={styles.checkboxLabel}>Continuar logado</Text>
        </TouchableOpacity>

        <Button
          title="Entrar"
          onPress={() => verificaLogin({ email, senha, continuar })}
          loading={loading}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#6B7280'
  },
  forgotPassword: {
    marginBottom: 24,
    alignSelf: 'flex-end'
  },
  forgotPasswordText: {
    color: '#3B82F6'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32
  },
  registerText: {
    color: '#6B7280'
  },
  registerLink: {
    color: '#3B82F6',
    fontWeight: '500'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    marginRight: 8,
  },
  
  checkboxChecked: {
    backgroundColor: '#007bff', // azul ou a cor que quiser
  },
  
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
});

export default LoginScreen;
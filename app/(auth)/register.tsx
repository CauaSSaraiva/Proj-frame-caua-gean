import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Header from '../components/common/Header';




const RegisterScreen: React.FC = () => {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string,
    email?: string,
    senha?: string,
    confirmSenha?: string
  }>({});

  type Inputs = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  };

  
  const handleRegister = async (data: Inputs) => {
    if (data.senha !== data.confirmarSenha) {  
      alert("As senhas não coincidem!");  
      return;  
    }


    try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_URL_API}/clientes/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            }
          );
    
          if (response.status === 200) {
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso')
            router.replace('./login'); // vai para home se estiver logado
          } else {
            Alert.alert('Erro', 'Login ou senha incorretos');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Erro', 'Algo deu errado...');
        }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Criar Conta"
        showBackButton
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.introText}>
          Crie sua conta para gerenciar seus compromissos de forma eficiente
        </Text>

        <Input
          label="Nome"
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome completo"
          error={errors.name}
        />

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
          error={errors.senha}
        />

        <Input
          label="Confirmar senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          placeholder="Confirme sua senha"
          secureTextEntry
          error={errors.confirmSenha}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Cadastrar"
            onPress={() => handleRegister({ email, senha, confirmarSenha, nome })}
            loading={loading}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já possui uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 24
  },
  introText: {
    color: '#6B7280',
    marginBottom: 24
  },
  buttonContainer: {
    marginTop: 16
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32
  },
  loginText: {
    color: '#6B7280'
  },
  loginLink: {
    color: '#3B82F6',
    fontWeight: '500'
  }
});

export default RegisterScreen;
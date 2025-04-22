import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Input from './components/common/Input';
import Button from './components/common/Button';
import Header from './components/common/Header';




const RegisterScreen: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string,
      email?: string,
      password?: string,
      confirmPassword?: string
    } = {};

    if (!name) {
      newErrors.name = 'O nome é obrigatório';
    }

    if (!email) {
      newErrors.email = 'O e-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'A senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulação de registro
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navegar para a tela de login após registro bem-sucedido
      ('Login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      // Exibir mensagem de erro
    } finally {
      setLoading(false);
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
          value={name}
          onChangeText={setName}
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
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          error={errors.password}
        />

        <Input
          label="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirme sua senha"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Cadastrar"
            onPress={handleRegister}
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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Input from './components/common/Input';
import Button from './components/common/Button';
import { useRouter } from 'expo-router';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  App: undefined;
};



const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string, password?: string } = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulação de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navegar para a tela principal após login bem-sucedido
      // navigation.replace('App');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Exibir mensagem de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Image 
            source={require('../assets/icon.png')} 
            style={styles.logo}
          />
          <Text style={styles.title}>Agenda App</Text>
          <Text style={styles.subtitle}>Organize sua rotina com facilidade</Text>
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
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          error={errors.password}
        />
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        
        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
        />
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
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
  }
});

export default LoginScreen;
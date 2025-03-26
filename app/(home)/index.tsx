import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Tela Inicial</Text> */}
      <Link href={'/login'}>Ir para Login</Link>
      <Link href={'/cronograma'}>Ir para Cronograma</Link>
      <Link href={'/anotacoes'}>Ir para Anotações</Link>
      <Link href={'/tarefas'}>Ir para Tarefas</Link>
      <Link href={'/config/index'}>Ir para Configurações</Link>
      <Link href={'/config/user'}>Ir para Configurações do Usuário</Link>
    </View>
  );
}


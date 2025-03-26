import { Text, View } from "react-native";


// aqui seria /config/user, o index e o padrao / do config
// pq ta na pasta config

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Página de configurações do usuário</Text>
    </View>
  );
}

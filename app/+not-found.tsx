import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Página Não Encontrada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
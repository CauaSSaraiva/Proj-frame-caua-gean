import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from './components/common/Header';
import Input from './components/common/Input';
import Button from './components/common/Button'; // Caminho corrigido (common/Button em vez de common.Button)
import { useRouter, useLocalSearchParams } from 'expo-router';

const COLORS = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // purple
  '#EC4899', // pink
];






const AddEventScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Convertendo o parâmetro de data
  const initialDate = params.date 
    ? new Date(params.date as string) 
    : new Date();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(initialDate.toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      // Mostrar erro
      return;
    }

    setLoading(true);
    
    try {
      // Simulação de uma operação assíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navegar de volta após salvar
      router.back();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Novo Evento" 
        showBackButton
        onBackPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Input
          label="Título"
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título do evento"
          error=""
        />

        <Input
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          placeholder="Digite uma descrição"
          multiline
          error=""
        />

        <Input
          label="Data"
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          error=""
        />

        <View style={styles.timeContainer}>
          <Input
            label="Hora de início"
            value={startTime}
            onChangeText={setStartTime}
            placeholder="HH:MM"
            style={styles.timeInput}
            error=""
          />

          <Input
            label="Hora de término"
            value={endTime}
            onChangeText={setEndTime}
            placeholder="HH:MM"
            style={styles.timeInput}
            error=""
          />
        </View>

        <Input
          label="Local"
          value={location}
          onChangeText={setLocation}
          placeholder="Digite o local do evento"
          error=""
        />

        <Text style={styles.colorLabel}>Cor</Text>
        <View style={styles.colorContainer}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        <Button
          title="Salvar Evento"
          onPress={handleSave}
          loading={loading}
          type="primary"
        />
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
    padding: 16
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 16
  },
  timeInput: {
    flex: 1
  },
  colorLabel: {
    color: '#4B5563', // text-gray-700
    fontWeight: '500', // font-medium
    marginBottom: 8 // mb-2
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24 // mb-6
  },
  colorOption: {
    width: 32, // w-8
    height: 32, // h-8
    borderRadius: 16 // rounded-full
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'black'
  }
});

export default AddEventScreen;
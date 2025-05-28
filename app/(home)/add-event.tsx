import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button'; // Caminho corrigido (common/Button em vez de common.Button)
import { useRouter, useLocalSearchParams } from 'expo-router';

type Inputs = {
  title: string
  descricao: string
  data: Date
  timeInicio: string
  timeFim: string
  localizacao: string
  corSelecionada: string
}


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
  const eventoId = params.eventId as string | undefined;

  console.log("Todos os parâmetros:", params);
  console.log("eventoId recebido:", eventoId)

  // Convertendo o parâmetro de data
  const dataInicial = params.date
    ? new Date(params.date as string)
    : new Date();

  const [title, setTitle] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(dataInicial.toISOString().split('T')[0]);
  const [timeInicio, setTimeInicio] = useState('09:00');
  const [timeFim, setTimeFim] = useState('10:00');
  const [localizacao, setLocalizacao] = useState('');
  const [corSelecionada, setCorSelecionada] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);


    useEffect(() => {
    if (eventoId) {
      const carregarEvento = async () => {
        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_URL_API}/eventos/${eventoId}`
          );
          const evento = await response.json();
          
          // Preenche os estados com os dados do evento
          setTitle(evento.title);
          setDescricao(evento.descricao);
          setData(evento.data.split('T')[0]); // Ajuste conforme o formato da sua API
          setTimeInicio(evento.timeInicio);
          setTimeFim(evento.timeFim);
          setLocalizacao(evento.localizacao);
          setCorSelecionada(evento.corSelecionada);
        } catch (error) {
          console.error("Erro ao carregar evento:", error);
        }
      };

      carregarEvento();
    }
  }, [eventoId]);

  const handleSave = async () => {
    if (!title.trim()) {
      // Mostrar erro
      return;
    }

    setLoading(true);

    console.log("Data antes do envio:", data);
    try {
      // Simulação de uma operação assíncrona
      // await new Promise(resolve => setTimeout(resolve, 1000));

      const novoEvento: Inputs = {
        title,
        descricao,
        data: new Date(data),
        timeInicio,
        timeFim,
        localizacao,
        corSelecionada

      }

    const url = eventoId
      ? `${process.env.EXPO_PUBLIC_URL_API}/eventos/${eventoId}` // PUT (edição)
      : `${process.env.EXPO_PUBLIC_URL_API}/eventos`; // POST (criação)

    const method = eventoId ? "PUT" : "POST";

    console.log(url)  
    console.log(method)
      
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoEvento),
    });
      console.log(novoEvento)

      if (response.status == 201) {
        console.log("caiu no 201")
        
      }

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
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite uma descrição"
          multiline
          error=""
        />

        <Input
          label="Data"
          value={data}
          onChangeText={setData}
          placeholder="YYYY-MM-DD"
          error=""
        />

        <View style={styles.timeContainer}>
          <Input
            label="Hora de início"
            value={timeInicio}
            onChangeText={setTimeInicio}
            placeholder="HH:MM"
            style={styles.timeInput}
            error=""
          />

          <Input
            label="Hora de término"
            value={timeFim}
            onChangeText={setTimeFim}
            placeholder="HH:MM"
            style={styles.timeInput}
            error=""
          />
        </View>

        <Input
          label="Local"
          value={localizacao}
          onChangeText={setLocalizacao}
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
                corSelecionada === color && styles.selectedColor
              ]}
              onPress={() => setCorSelecionada(color)}
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
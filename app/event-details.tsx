import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/common/Header';
import Button from './components/common/Button';
import { EventItem } from './components/agenda/AgendaItem';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EventDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { eventId } = params;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_URL_API}/eventos/pesquisa/${eventId}`,
          {
            method: "GET",
            headers: { "Content-type": "Application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          setEvent(null);
        }
      } catch (error) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

const deletarEvento = async () => {
  try {
    await fetch(
      `${process.env.EXPO_PUBLIC_URL_API}/eventos/${eventId}`,
      { method: "DELETE" }
    );
    router.back();
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    if (Platform.OS === 'web') {
      alert('Não foi possível excluir o evento.');
    } else {
      Alert.alert('Erro', 'Não foi possível excluir o evento.');
    }
  }
}
  

const handleEdit = () => {
  router.push({
    pathname: "/add-event",
    params: { eventId: event?.id },
  });
};

const handleDelete = () => {
  if (Platform.OS == 'web') {
    if (window.confirm("Tem certeza de que deseja excluir este evento?")) {
      deletarEvento()
      router.back();
    }
  } else {

    Alert.alert(
      'Confirmar exclusão',
      "Tem certeza de que deseja excluir este evento?",
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deletarEvento() // Forma correta para onPress
        }
      ]
    );
  }
};

if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Detalhes do Evento"
        showBackButton
        onBackPress={() => router.back()}
      />
      <View style={styles.centerContainer}>
        <Text>Carregando...</Text>
      </View>
    </SafeAreaView>
  );
}

if (!event) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Detalhes do Evento"
        showBackButton
        onBackPress={() => router.back()}
      />
      <View style={styles.centerContainer}>
        <Text>Evento não encontrado</Text>
      </View>
    </SafeAreaView>
  );
}

return (
  <SafeAreaView style={styles.container}>
    <Header
      title="Detalhes do Evento"
      showBackButton
      onBackPress={() => router.back()}
    />

    <ScrollView style={styles.scrollView}>
      <View
        style={[styles.colorBar, { backgroundColor: event.corSelecionada || '#3B82F6' }]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={18} color="#666" />
            </View>
            <Text style={styles.infoText}>{new Date(event.data).toLocaleDateString('pt-BR')}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="time-outline" size={18} color="#666" />
            </View>
            <Text style={styles.infoText}>{event.timeInicio} - {event.timeFim}</Text>
          </View>

          {event.localizacao && (
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="location-outline" size={18} color="#666" />
              </View>
              <Text style={styles.infoText}>{event.localizacao}</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{event.descricao}</Text>

        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button
              title="Editar"
              onPress={handleEdit}
              type="outline"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Excluir"
              onPress={handleDelete}
              type="secondary"
            />
          </View>
        </View>
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1
  },
  colorBar: {
    height: 8,
    width: '100%'
  },
  content: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  infoSection: {
    marginBottom: 24
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  iconContainer: {
    marginRight: 8
  },
  infoText: {
    color: '#6B7280'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8
  },
  description: {
    color: '#6B7280',
    marginBottom: 24
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16
  },
  buttonContainer: {
    flex: 1
  }
});

export default EventDetailsScreen;
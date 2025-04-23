import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from './components/common/Header';
import Button from './components/common/Button';
import { EventItem } from './components/agenda/AgendaItem';


// tem que adaptar essa página toda pra parar de usar react-navigation e etc

type EventDetailsParams = {
  eventId: string;
};

type Props = NativeStackScreenProps<any, 'EventDetails'>;

const EventDetailsScreen = ({ navigation, route }: Props) => {
  const { eventId } = route.params as EventDetailsParams;
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento do evento a partir de um ID
    // Em um app real, isso viria de uma API ou banco de dados
    const mockEvent: EventItem = {
      id: eventId,
      title: 'Reunião de equipe',
      description: 'Discussão sobre o andamento do projeto e próximos passos. Preparar apresentação de status e trazer relatórios de progresso.',
      date: '2023-10-15',
      startTime: '09:00',
      endTime: '10:00',
      location: 'Sala de conferência - 3º andar',
      color: '#3B82F6'
    };

    setTimeout(() => {
      setEvent(mockEvent);
      setLoading(false);
    }, 500);
  }, [eventId]);

  const handleEdit = () => {
    navigation.navigate('AddEvent', { event });
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza de que deseja excluir este evento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Aqui você deletaria o evento no backend
            // Depois navega de volta
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="Detalhes do Evento" 
          showBackButton
          onBackPress={() => navigation.goBack()}
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
          onBackPress={() => navigation.goBack()}
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
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView}>
        <View 
          style={[styles.colorBar, { backgroundColor: event.color || '#3B82F6' }]}
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="calendar-outline" size={18} color="#666" />
              </View>
              <Text style={styles.infoText}>{new Date(event.date).toLocaleDateString('pt-BR')}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="time-outline" size={18} color="#666" />
              </View>
              <Text style={styles.infoText}>{event.startTime} - {event.endTime}</Text>
            </View>
            
            {event.location && (
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location-outline" size={18} color="#666" />
                </View>
                <Text style={styles.infoText}>{event.location}</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{event.description}</Text>
          
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
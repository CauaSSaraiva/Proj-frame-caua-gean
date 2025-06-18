import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/common/Header";
import CustomCalendar from "../components/calendar/CustomCalendar";
import AgendaList from "../components/agenda/AgendaList";
import { EventItem } from "../components/agenda/AgendaItem";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from 'react';
  import { useAuth } from "@/contexts/AuthContext";


//comentado provisóriamente para testes, depois pode ser removido
// const mockEvents: EventItem[] = [
//   {
//     id: '1',
//     title: 'Reunião de equipe',
//     description: 'Discussão sobre o novo projeto',
//     date: '2023-10-15',
//     startTime: '09:00',
//     endTime: '10:00',
//     location: 'Sala de conferência'
//   },
//   {
//     id: '2',
//     title: 'Almoço com cliente',
//     description: 'Apresentação da proposta comercial',
//     date: '2023-10-15',
//     startTime: '12:00',
//     endTime: '13:30',
//     location: 'Restaurante Central'
//   },
//   {
//     id: '3',
//     title: 'Entrevista de emprego',
//     description: 'Vaga para desenvolvedor front-end',
//     date: '2023-10-16',
//     startTime: '14:00',
//     endTime: '15:00',
//     location: 'Online - Google Meet',
//     color: '#FF6B6B'
//   }
// ];

const HomeScreen = () => {
  const router = useRouter();
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
 
  const { userData, memoryToken, isAuthChecked } = useAuth();

  // useEffect(() => {
  //   if (memoryToken && !userData) {
  //     loadUserData();
  //   }
  // }, [memoryToken]);
  // const [recarregar, setRecarregar] = useState(false);


  async function getDados() {
    console.log(`USERDATA: ${userData}`)
    const url = `${process.env.EXPO_PUBLIC_URL_API}/eventos/input/${userData}${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`;
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: { "Content-type": "Application/json" },
      }
    )
    const dados = await response.json()
    setEvents(dados)
  }
  // useEffect(() => {
  //   console.log('recarregou')

  //   getDados()
  // }, [recarregar]); //adicionado recarregar pra atualizar quando inserido evento
  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      if (userData && isAuthChecked) {
        getDados();
      }
    }, [userData, isAuthChecked, dataSelecionada, searchTerm])
   )

const handleDateSelect = (date: Date) => {
  setDataSelecionada(date);
};

const handleEventPress = (event: EventItem) => {
  router.push({
    pathname: "/event-details",
    params: { eventId: event.id },
  });
};

const handleAddEvent = () => {
  // Formata a data como string simples (YYYY-MM-DD)
  // setRecarregar(prev => !prev);
  try {
    router.push({
      pathname: "/add-event",
      params: { date: dataSelecionada.toISOString() },
    });
  } catch (error) {
    console.error("Erro ao navegar:", error);
  }
};

// Formatação de data para comparação com os eventos
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Retorna só o "YYYY-MM-DD"
};

const markedDates = events.map((event) => event.data);

console.log(markedDates)

const filteredEvents = searchTerm
  ? events // Se está buscando, mostra todos os eventos retornados pela API (já filtrados)
  : events.filter((event) => {
      const eventDate = typeof event.data === "string"
        ? event.data.split("T")[0]
        : new Date(event.data).toISOString().split("T")[0];
      return eventDate === formatDate(dataSelecionada);
    });

// tem que concertar esse filtered events, ta saindo igual mas ele não ta funcionando
// ta saindo o filteredevents como array vazia, embora testando deveria estar achando o evento
console.log(formatDate(dataSelecionada))
console.log(filteredEvents)
return (
  <SafeAreaView style={styles.container}>
    <Header
      title="Minha Agenda"
      rightComponent={
        <TouchableOpacity onPress={handleAddEvent}>
          <Ionicons name="add-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      }
    />

    <View style={styles.contentContainer}>
      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#888"
          returnKeyType="search"
        />
      </View>
      {!searchTerm && (
        <CustomCalendar
          selectedDate={dataSelecionada}
          onDateSelect={handleDateSelect}
          markedDates={markedDates}
        />
      )}

      <View style={styles.eventsContainer}>
        <Text style={styles.dateHeader}>
          {searchTerm
            ? `Resultados para "${searchTerm}"`
            : `Eventos para ${dataSelecionada.toLocaleDateString("pt-BR")}`}
        </Text>
        <AgendaList
          events={filteredEvents}
          onEventPress={handleEventPress}
          groupByDate={false}
        />
      </View>
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    paddingVertical: 0,
  },
});

export default HomeScreen;

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
import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { formatDateOnly } from "@/utils/date";

const HomeScreen = () => {
  const router = useRouter();
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [proxEvento, setProxEvento] = useState<EventItem | null>(null);

  const { userData, memoryToken, isAuthChecked } = useAuth();


  async function getDados() {
    console.log(`USERDATA: ${userData}`);
    const url = `${process.env.EXPO_PUBLIC_URL_API}/eventos/input/${userData}${
      searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""
    }`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "Application/json" },
    });
    const dados = await response.json();
    setEvents(dados);
  }

  useEffect(() => {
    if (!events || events.length === 0) {
      setProxEvento(null);
      return;
    }

    const hoje = new Date();
    const hojeStr = hoje.toISOString().split("T")[0];

    // primeiro evento do dia atual
    const eventoHoje = events.find((ev) => {
      const dataEvStr =
        typeof ev.data === "string"
          ? ev.data.split("T")[0]
          : new Date(ev.data).toISOString().split("T")[0];
      return dataEvStr === hojeStr;
    });

    setProxEvento(eventoHoje || null);
    console.log("Próximo evento:", eventoHoje);
  }, [events]);

  useFocusEffect(
    useCallback(() => {
      if (userData && isAuthChecked) {
        getDados();
      }
    }, [userData, isAuthChecked, dataSelecionada, searchTerm])
  );

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

  const datasMarcadas = events.map((event) => event.data);

  console.log(datasMarcadas);

  const eventosFiltrados = searchTerm
    ? events // Se está buscando, mostra todos os eventos retornados pela API (já filtrados)
    : events.filter((event) => {
        const eventDate =
          typeof event.data === "string"
            ? event.data.split("T")[0]
            : new Date(event.data).toISOString().split("T")[0];
        return eventDate === formatDate(dataSelecionada);
      });


  console.log(formatDate(dataSelecionada));
  console.log(eventosFiltrados);

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
          <Ionicons
            name="search"
            size={18}
            color="#888"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#888"
            returnKeyType="search"
          />
        </View>

        {/* Card do próximo evento */}
        {proxEvento && (
          <TouchableOpacity
            style={styles.proxEventoCard}
            onPress={() => handleEventPress(proxEvento)}
            activeOpacity={0.8}
          >
            <Ionicons
              name="alarm"
              size={20}
              color="#3B82F6"
              style={{ marginRight: 8 }}
            />
            <View>
              <Text style={styles.proxEventoTitle}>
                Próximo evento: {proxEvento.title}
              </Text>
              <Text style={styles.proxEventoInfo}>
                {proxEvento.timeInicio
                  ? `Dia ${formatDateOnly(proxEvento.data)} às ${
                      proxEvento.timeInicio
                    }`
                  : `Dia ${formatDateOnly(proxEvento.data)}`}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Calendário e lista de eventos */}
        {!searchTerm && (
          <CustomCalendar
            selectedDate={dataSelecionada}
            onDateSelect={handleDateSelect}
            markedDates={datasMarcadas} 
          />
        )}

        <View style={styles.eventsContainer}>
          <Text style={styles.dateHeader}>
            {searchTerm
              ? `Resultados para "${searchTerm}"`
              : `Eventos para ${dataSelecionada.toLocaleDateString("pt-BR")}`}
          </Text>
          <AgendaList
            events={eventosFiltrados} 
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
  proxEventoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 12,
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  proxEventoTitle: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 15,
  },
  proxEventoInfo: {
    color: "#2563EB",
    fontSize: 13,
    marginTop: 2,
  },
});

export default HomeScreen;

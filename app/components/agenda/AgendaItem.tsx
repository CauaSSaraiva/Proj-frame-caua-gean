import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface EventItem {
  id: number;
  // data: any;
  // title: string;
  // description: string;
  // date: string;
  // startTime: string;
  // endTime: string;
  // location?: string;
  // color?: string;
  title: string
  descricao: string
  data: string
  timeInicio: string
  timeFim: string
  localizacao: string
  corSelecionada: string
}


interface AgendaItemProps {
  event: EventItem;
  onPress: (event: EventItem) => void;
}

const AgendaItem: React.FC<AgendaItemProps> = ({ event, onPress }) => {
  const { title, descricao, timeInicio, timeFim, localizacao, corSelecionada = '#3B82F6' } = event;

  return (
    <TouchableOpacity 
      onPress={() => onPress(event)}
      style={styles.container}
    >
      <View style={styles.contentRow}>
        <View
          style={[styles.colorIndicator, { backgroundColor: corSelecionada }]}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.timeText}>{timeInicio} - {timeFim}</Text>
          </View>
          
          <Text numberOfLines={2} style={styles.description}>{descricao}</Text>
          
          {location && (
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>{localizacao}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  contentRow: {
    flexDirection: 'row'
  },
  colorIndicator: {
    width: 8
  },
  contentContainer: {
    padding: 16,
    flex: 1
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4
  },
  timeText: {
    color: '#4B5563', // text-gray-600
    fontSize: 14
  },
  description: {
    color: '#4B5563', // text-gray-600
    marginBottom: 8
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    color: '#6B7280', // text-gray-500
    fontSize: 12,
    marginLeft: 4
  }
});

export default AgendaItem;
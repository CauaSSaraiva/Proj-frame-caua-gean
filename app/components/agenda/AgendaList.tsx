import React from 'react';
import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';
import AgendaItem, { EventItem } from './AgendaItem';

interface AgendaListProps {
  events: EventItem[];
  onEventPress: (event: EventItem) => void;
  groupByDate?: boolean;
}

interface Section {
  title: string;
  data: EventItem[];
}

const AgendaList: React.FC<AgendaListProps> = ({ 
  events, 
  onEventPress,
  groupByDate = true 
}) => {
  
  // Agrupar eventos por data
  const groupEventsByDate = (): Section[] => {
    const grouped: Record<string, EventItem[]> = {};
    
    events.forEach(event => {
      if (!grouped[event.data]) {
        grouped[event.data] = [];
      }
      grouped[event.data].push(event);
    });
    
    return Object.keys(grouped).map(date => ({
      title: date,
      data: grouped[date]
    }));
  };



  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
      </View>
    );
  }

  if (groupByDate) {
    return (
      <SectionList
        sections={groupEventsByDate()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AgendaItem event={item} onPress={onEventPress} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
      />
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AgendaItem event={item} onPress={onEventPress} />
      )}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  emptyText: {
    color: '#6B7280' // text-gray-500
  },
  sectionHeader: {
    backgroundColor: '#F3F4F6', // bg-gray-100
    paddingHorizontal: 16, // px-4
    paddingVertical: 8 // py-2
  },
  sectionHeaderText: {
    fontWeight: 'bold'
  },
  list: {
    flex: 1
  },
  contentContainer: {
    padding: 16
  }
});

export default AgendaList;
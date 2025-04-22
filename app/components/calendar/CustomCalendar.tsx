import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  markedDates?: string[]; // datas com eventos em formato 'YYYY-MM-DD'
  selectedDate?: Date;
}

const CustomCalendar: React.FC<CalendarProps> = ({
  onDateSelect,
  markedDates = [],
  selectedDate = new Date()
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderWeekdays = () => {
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return weekdays.map((day, index) => (
      <View key={index} style={styles.weekdayCell}>
        <Text style={styles.weekdayText}>{day}</Text>
      </View>
    ));
  };

  const formatDateToString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const renderDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    
    // // Adicionar espaços em branco para os dias antes do primeiro dia do mês
    // for (let i = 0; i < firstDay; i++) {
    //   days.push(
    //     <View key={`empty-${i}`} style={styles.dayCell} />
    //   );
    // }

    // Adicionar os dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = formatDateToString(date);
      const isSelected = selectedDate && formatDateToString(selectedDate) === dateString;
      const hasEvents = markedDates.includes(dateString);

      days.push(
        <TouchableOpacity
          key={i}
          onPress={() => onDateSelect(date)}
          style={[
            styles.dayCell, 
            styles.dayCellClickable, 
            isSelected && styles.selectedDayCell
          ]}
        >
          <Text style={isSelected ? styles.selectedDayText : styles.dayText}>
            {i}
          </Text>
          {hasEvents && !isSelected && (
            <View style={styles.eventIndicator} />
          )}
        </TouchableOpacity>
      );
    }

    // Agrupar os dias em semanas (7 dias cada)
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        <View key={`week-${i}`} style={styles.weekRow}>
          {days.slice(i, i + 7)}
        </View>
      );
    }

    return weeks;
  };

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </Text>
        
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekdayRow}>
        {renderWeekdays()}
      </View>
      
      <View style={styles.weeksContainer}>
        {renderDays()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8
  },
  weekdayText: {
    color: '#6B7280',
    fontWeight: '500'
  },
  weeksContainer: {
    // Container para as semanas
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  dayCell: {
    width: '14.285%', // 100% / 7 dias
    aspectRatio: 1,
  },
  dayCellClickable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedDayCell: {
    backgroundColor: '#3B82F6',
    borderRadius: 9999
  },
  dayText: {
    color: 'black'
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold'
  },
  eventIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2
  }
});

export default CustomCalendar;
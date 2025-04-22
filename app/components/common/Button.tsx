import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return 'bg-blue-500';
      case 'secondary':
        return 'bg-gray-500';
      case 'outline':
        return 'bg-transparent border border-blue-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getTextStyle = () => {
    return type === 'outline' ? 'text-blue-500' : 'text-white';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        { padding: 12, borderRadius: 8 },
        type === 'outline' && { borderWidth: 1, borderColor: '#3B82F6' },
        type === 'primary' && { backgroundColor: '#3B82F6' },
        type === 'secondary' && { backgroundColor: '#6B7280' },
        disabled && { opacity: 0.5 }
      ]}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? '#3B82F6' : '#FFFFFF'} />
      ) : (
        <Text style={[{ textAlign: 'center', fontWeight: '500' }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
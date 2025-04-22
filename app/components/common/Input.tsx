import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  error?: string;
  style?: StyleProp<ViewStyle>;
  multiline?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  style,
  multiline = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          multiline={multiline}
          style={[
            styles.input,
            error ? styles.inputError : styles.inputNormal,
            multiline && styles.multilineInput
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility} 
            style={styles.visibilityToggle}
          >
            <Ionicons 
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    color: '#4B5563', // text-gray-700
    marginBottom: 4,
    fontWeight: '500' // font-medium
  },
  inputContainer: {
    position: 'relative',
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderRadius: 6, // rounded-md
    paddingHorizontal: 12, // px-3
    paddingVertical: 8, // py-2
    width: '100%'
  },
  inputNormal: {
    borderColor: '#D1D5DB', // border-gray-300
  },
  inputError: {
    borderColor: '#EF4444', // border-red-500
  },
  multilineInput: {
    height: 96, // h-24
    textAlignVertical: 'top'
  },
  visibilityToggle: {
    position: 'absolute',
    right: 12,
    top: 12
  },
  errorText: {
    color: '#EF4444', // text-red-500
    fontSize: 12, // text-xs
    marginTop: 4 // mt-1
  }
});

export default Input;
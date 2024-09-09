import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Image, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar 
} from 'react-native';

const ResponsiveApp = () => {
  const [isPortrait, setIsPortrait] = useState(true);

  // Hàm kiểm tra hướng màn hình
  const checkOrientation = () => {
    const { height, width } = Dimensions.get('window');
    setIsPortrait(height >= width);
  };

  // Sử dụng Dimensions để phát hiện thay đổi hướng màn hình
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', checkOrientation);
    checkOrientation(); // Gọi ngay lập tức để kiểm tra hướng hiện tại
    return () => {
      subscription.remove();
    };
  }, []);

  const screenWidth = Dimensions.get('window').width;

  // Điều chỉnh kích thước các thành phần dựa trên hướng màn hình
  const buttonWidth = isPortrait ? screenWidth * 0.5 : screenWidth * 0.4;
  const imageWidth =  isPortrait ? screenWidth * 0.8 : screenWidth * 0.5;
  const imageHeight = isPortrait ? imageWidth * 0.5 : imageWidth * 0.3;

  // Tùy chỉnh thanh trạng thái dựa trên hướng màn hình và nền tảng
  useEffect(() => {
    StatusBar.setBackgroundColor(isPortrait ? '#3498db' : '#2ecc71');
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'light-content' : 'dark-content');
  }, [isPortrait]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <View style={[styles.buttonContainer, { flexDirection: isPortrait ? 'column' : 'row' }]}>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3214/3214679.png' }}
        style={[styles.image, { width: imageWidth, height: imageHeight }]}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập văn bản"
        placeholderTextColor="#aaa"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
  button: {
    textShadowColor: '#000000',
    backgroundColor: '#FFA500',
    padding: Platform.select({ ios: 20, android: 15 }),  
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    marginTop: 20,
  },
  input: {
    width: '80%',
    padding: Platform.select({ ios: 15, android: 10 }),  
    borderColor: '#FFA500',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 40,
  },
});

export default ResponsiveApp;

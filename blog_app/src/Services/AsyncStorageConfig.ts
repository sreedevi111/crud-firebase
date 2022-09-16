import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getItem(key: string) {
  const val = await AsyncStorage.getItem(key);
  try {
    if (val != null) {
    // if (!val) {
      return val;
    }
    return false;
  } catch (error) {
    console.log('Error in getItem:', error);
  }
}

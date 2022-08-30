import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getItem(key: string) {
  let val = await AsyncStorage.getItem(key);
  try {
    if (val != null || val != '') {
      return val;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error in getItem:', error);
  }
}

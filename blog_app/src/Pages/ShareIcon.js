import { StyleSheet, Text, View, Share, Button } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const ShareIcon = () => {
  const onShare = async () => {

    try {
      const icon = await Share.open({
        
      })
     
      const result = await Share.share({
        
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        console.log("Result", result)
        if (result.activityType) {
          
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default ShareIcon

const styles = StyleSheet.create({})
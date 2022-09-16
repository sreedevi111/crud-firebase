import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';

const ModalCategory = props => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <View>
             
              <TouchableOpacity style={styles.categoryStyle} onPress={props.settingCategory1}>
              <Text style={styles.textStyle}>{props.category1}</Text>
              </TouchableOpacity>

              <TouchableOpacity  style={styles.categoryStyle} onPress={props.settingCategory2}>
              <Text style={styles.textStyle}>{props.category2}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity  style={styles.categoryStyle} onPress={props.settingCategory3}>
              <Text style={styles.textStyle}>{props.category3}</Text>
              </TouchableOpacity>
              
            </View> */}

            <TouchableOpacity >
              <Text
                
                style={[styles.button, styles.buttonClose, styles.cross]}
                onPress={() => props.setModalVisible(false)}>
                X
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCategory;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  cross: {
    color: 'black',
    bottom: 100,
    left:100
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: 250,
    width:280,
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
   
  },
 
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
  categoryStyle:{
    backgroundColor: '#59133b',
    borderRadius:5,
    justifyContent:'center',
    textAlign:'center',
    padding:5,
    margin:10
  }
});

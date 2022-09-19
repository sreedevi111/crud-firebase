import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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
          props.setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList data={props.data} renderItem={props.renderItem} />

            <TouchableOpacity>
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
    left: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: 250,
    width: 280,
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
});

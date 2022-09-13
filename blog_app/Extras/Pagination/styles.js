import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    itemWrapperStyle: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },
    itemImageStyle: {
      width: 50,
      height: 50,
      marginRight: 16,
    },
    contentWrapperStyle: {
      justifyContent: "space-around",
    },
    txtNameStyle: {
      fontSize: 16,
      color: "#777",
    },
    txtEmailStyle: {
      color: "#777",
    },
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
  });
export default styles;
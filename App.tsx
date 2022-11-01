import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

type Car = {
  id: number;
  brand: string;
  model: string;
};

export default function App() {
  const [cars, setCars] = useState<Array<Car>>([]);

  const handleGetAll = async () => {
    const response = await axios.get("https://pdm-cars-api.herokuapp.com/cars");
    const { data, status } = response;
    // console.log(data, status);
    setCars(data);
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://pdm-cars-api.herokuapp.com/carss",
        {
          brand: "ford",
          model: "F1000",
          hp: 85,
        }
      );

      const { data, status } = response;

      console.log(data, status);
    } catch (error) {
      console.log(error);
      Alert.alert("Error creating car!");
    }
  };

  return (
    <View style={styles.container}>
      {cars.map((car) => (
        <Text key={car.id}>{car.model}</Text>
      ))}

      <Button onPress={handleGetAll} title="Get All" />
      <Button onPress={handleCreate} title="Create" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

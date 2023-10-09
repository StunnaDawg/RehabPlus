import { View, Text, FlatList } from "react-native"
import React, { useState } from "react"
import { Button, Searchbar, Title, ButtonProps } from "react-native-paper"

const Categories = [
    { id: 1, title: "Bicep" },
    { id: 2, title: "Quad" },
    { id: 3, title: "Plyometrics" },
    { id: 4, title: "Tricep" },
    { id: 5, title: "Hamstring" },
    { id: 6, title: "Chest" },
    { id: 7, title: "Back" },
    { id: 8, title: "Glutes" },
    { id: 9, title: "Forearm" },
    { id: 10, title: "Shoulder" },
    { id: 11, title: "Abs" },
    { id: 12, title: "Lats" },
    { id: 13, title: "Deltoid" },
    { id: 14, title: "Calves" },
    { id: 15, title: "Hip Flexors" },
    { id: 16, title: "Obliques" },
    { id: 17, title: "Neck" },
    { id: 18, title: "Shin" },
    { id: 19, title: "Adductors" },
    { id: 20, title: "Abductors" },
];


const DatabaseCategories = () => {
  const [pressedButtonId, setPressedButtonId] = useState(null)

  const renderItem = ({ item: category }) => (
    <Button
      mode={pressedButtonId === category.id ? "contained" : "outlined"}
      onPress={() => {
        pressedButtonId === category.id
          ? setPressedButtonId(null)
          : setPressedButtonId(category.id);
      }}
    >
      {category.title}
    </Button>
  );
  
  return (
    <FlatList
    horizontal={true}
      data={Categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default DatabaseCategories
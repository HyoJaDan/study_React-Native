import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsvisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { data: enteredGoalText, id: Math.random().toString() },
    ]);
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
    endAddGoalHandler();
  };

  const startAddGoalHandler = () => {
    setModalIsvisible(true);
  };

  const endAddGoalHandler = () => {
    setModalIsvisible(false);
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        {modalIsVisible && (
          <GoalInput
            visible={modalIsVisible}
            onAddGoal={addGoalHandler}
            onCancle={endAddGoalHandler}
          />
        )}
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <View style={styles.goalItem}>
                  <Pressable
                    android_ripple={{ color: "#dddddd" }}
                    onPress={deleteGoalHandler.bind(this, itemData.item.id)}
                    style={({ pressed }) => pressed && styles.pressedItem}
                  >
                    <Text style={styles.goalText}>{itemData.item.data}</Text>
                  </Pressable>
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
});

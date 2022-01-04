import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Header from '../components/header';
import TodoItem from '../components/todoItem';
import AddTodo from '../components/addTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';


import globalStyles from '../styles/globalStyles';

const getLastList = async (email) => {

  try {

    const value = await AsyncStorage.getItem("@" + email);
    if (value !== null) return JSON.parse(value);
    else return [];
  }
  catch (e) {
    console.log(e);
  }
}

const storeList = async (data, email) => {
  try {
    const jsonData = JSON.stringify(data);

    await AsyncStorage.setItem("@" + email, jsonData);
  }
  catch (e) {
    console.log(e);
  }
}

const Home = ({ navigation, route }) => {
  const email = route.params.email;
  const [todos, setTodos] = useState()
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    })
  }
  useEffect(() => {
    getLastList(email).then(data => setTodos(data)).catch(err => console.log(err))

  }, [])
  useEffect(() => {
    if (todos !== undefined) {



      storeList(todos, email).catch(err => console.log(err));

    }
  }, [todos])
  const submitHandler = (text) => {
    if (text.length > 3) {
      if (todos.length < 1) {
        setTodos([{ text: text, key: Math.random().toString() }]);
      } else
        setTodos((prevTodos) => {
          return [
            { text: text, key: Math.random().toString() },
            ...prevTodos
          ]
        })
    }
  }
  const accountIconOnPressHandler = () => {

    navigation.navigate('Account', { "email": email });
  }
  return (
    //<Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      if (Platform.OS != 'web')
        Keyboard.dismiss();
    }}>
      <View style={globalStyles.homeContainer}>
        {/* header*/}
        <Header onPressHandler={accountIconOnPressHandler} />

        <View style={globalStyles.homeContent}>
          {/* to form */}
          <AddTodo submitHandler={submitHandler} />
          <View style={globalStyles.homeList}>
            <FlatList
              style={globalStyles.homeList}
              data={todos}
              renderItem={({ item }) => (
                <View>
                  <TodoItem item={item} pressHandler={pressHandler} />
                </View>
              )}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Home;

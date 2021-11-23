import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import globalStyles from '../styles/globalStyles';
const TodoItem  = ({ item, pressHandler }) =>
{
    return (
        <TouchableOpacity >
            <View style = {globalStyles.item}>
                <MaterialIcons name = 'delete' size = {24} color = '#333' onPress = { () => pressHandler(item.key)} />
                <Text style = {globalStyles.itemText}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default TodoItem;
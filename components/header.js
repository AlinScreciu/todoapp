import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import globalStyles from '../styles/globalStyles';


export default function Header({ onPressHandler }) {

    return (
        <View style={globalStyles.header}>
            <Text style={globalStyles.headerTitle}>My Todos</Text>
            <TouchableOpacity style={globalStyles.accIcon} onPress={onPressHandler}>
                <Icon name="person" size={30} color="white" />
            </TouchableOpacity>

        </View>
    )
}

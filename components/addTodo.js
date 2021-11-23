import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/globalStyles';


const AddTodo = ({submitHandler}) => 
{
    const [text, setText] = useState('');
    const [err, setErr] = useState('');
    const [focused, setFocused] = useState(false);
    const changeHandler = (val) => {
        setText(val);
    }

    useEffect(() => 
    {
        ( focused && (text.length < 3 || text.length == 0) ) ? 
        setErr('Length has to be over 3 characters') 
        :
        setErr('')
    }, [text, focused])
        

    const clearText = () => {setText('')};
    
    return (
        <View>
            {
            err ? 
            <Text style={styles.issueNotif}>{err}</Text>
            :
            null
            }
            <TextInput 
                style = {styles.input}
                placeholder = 'new todo...'
                onChangeText = {changeHandler}
                value = {text}
                onFocus = {() => setFocused(true)}
                onBlur = {() => setFocused(false)}
            />
   
            <TouchableOpacity
                onPress = { () => {
                    submitHandler(text); 
                    clearText(); 
                }}
                style={styles.button}
                
            >
                <Text style={styles.buttonText}>ADD TODO</Text>
            </TouchableOpacity>
            </View>
    )
}

export default AddTodo;

const styles = StyleSheet.create({
    issueNotif: {
        marginHorizontal: 30,
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold',
    },
    input: 
    {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        fontSize: 20,
    },
    button:
    {
        backgroundColor: '#6D28D9',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    buttonText:
    {
        fontWeight: 'bold',
        color: 'white',
    }
})

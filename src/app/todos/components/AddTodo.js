import PropsTypes from 'prop-types'
import React from 'react'
import {COLORS} from "../../shared/constants";
import {Ionicons} from '@expo/vector-icons'
import {TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {View, Body, CheckBox} from 'native-base'


const propTypes = {
    newTodo: PropsTypes.shape({
        title: PropsTypes.string.isRequired,
        completed: PropsTypes.bool,
        createdAt: PropsTypes.number
    }),
    onSubmit: PropsTypes.func.isRequired,
    onChangeText: PropsTypes.func.isRequired,
    onCancelDelete: PropsTypes.func.isRequired,
    onBlur: PropsTypes.func.isRequired
}

const AddTodo = ({onSubmit, onChangeText, onBlur, onCancelDelete, newTodo}) => (

    <View style={styles.container}>

        <CheckBox checked={newTodo.completed} onPress={onCancelDelete}/>

        <Body style={styles.inner}>

            <TextInput
                style={styles.input}
                placeholder='What needs to be done?'
                autoFocus
                blurOnSubmit
                underlineColorAndroid='transparent'
                underlineColor='transparent'
                maxLength={50}
                onSubmitEditing={() => onSubmit()}
                onChangeText={onChangeText}
                value={newTodo.title}
                autoCorrect={false}
                autoCapitalize='none'
                onBlur={() => onSubmit()}
            />

        </Body>

        <TouchableOpacity style={{paddingHorizontal: 20}} onPress={onCancelDelete}>
            <Ionicons name='ios-close-outline' size={30} color='black'/>
        </TouchableOpacity>

    </View>

)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 6,
        height: 50,
        width: '100%'
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 25
    },
    input: {
        width: '100%',
        color: COLORS.warningText
    },
})

AddTodo.propTypes = propTypes;

export default AddTodo;

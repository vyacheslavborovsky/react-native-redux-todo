import PropTypes from 'prop-types';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View, CheckBox, Body} from 'native-base';

const TodoItem = ({todo, onUpdate, onLongPress, onDelete}) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.row}
            onPress={() => onUpdate({...todo, completed: !todo.completed})}
            onLongPress={() => onLongPress(todo)}>

            <CheckBox checked={todo.completed} onPress={() => onUpdate({...todo, completed: !todo.completed})}/>

            <Body style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingLeft: 25
            }}>

            <Text style={{
                color: todo.completed ? 'grey' : 'black',
                textDecorationLine: todo.completed ? 'line-through' : 'none'
            }}>
                {todo.title}
            </Text>

            </Body>
        </TouchableOpacity>

        <TouchableOpacity style={{paddingHorizontal: 20}}
                          onPress={() => onDelete(todo)}>
            <Ionicons name='ios-trash-outline' color={`${todo.title.length > 0 ? 'black' : 'grey'}`} size={23}/>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: 'transparent'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    }
});

const propTypes = {
    todo: PropTypes.shape({
        title: PropTypes.string,
        completed: PropTypes.bool,
        createdAt: PropTypes.number,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

TodoItem.propTypes = propTypes;

export default TodoItem;

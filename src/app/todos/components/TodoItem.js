import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {CheckBox, Body} from 'native-base';
import moment from 'moment';
import {COLORS} from "../../shared/constants/colors";

const duration = 250, height = 60;

class TodoItem extends PureComponent {

    constructor(props) {
        super(props);

        this._animated = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this._animated, {
            toValue: 1,
            duration: duration,
        }).start();
    }

    _onRemove = () => {
        const {onDelete, todo} = this.props;

        Animated.timing(this._animated, {
            toValue: 0,
            duration: duration,
        }).start(() => onDelete(todo));
    }

    render() {
        const {onUpdate, onLongPress, todo} = this.props;

        return (
            <Animated.View style={[
                styles.container,
                {
                    height: this._animated.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, height],
                        extrapolate: 'clamp',
                    }),
                },
                {opacity: this._animated},
                {
                    transform: [
                        {scale: this._animated},
                        {
                            rotate: this._animated.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['35deg', '0deg'],
                                extrapolate: 'clamp',
                            })
                        }
                    ],
                }
            ]}>

                <TouchableOpacity
                    style={styles.row}
                    onPress={() => onUpdate({...todo, completed: !todo.completed})}
                    onLongPress={() => onLongPress(todo)}>

                    <CheckBox checked={todo.completed} style={{alignSelf: 'center'}}
                              onPress={() => onUpdate({...todo, completed: !todo.completed})}/>

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

                    <Text style={{
                        fontSize: 10,
                        color: COLORS.tintColor,
                        opacity: .5
                    }}>
                        Created {moment(todo.createdAt).fromNow()}
                    </Text>

                    </Body>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingHorizontal: 20}}
                                  onPress={this._onRemove}>
                    <Ionicons name='ios-trash-outline' color={`${todo.title.length > 0 ? 'black' : 'grey'}`} size={23}/>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

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
        alignItems: 'center',
        width: '100%'
    }
});

const propTypes = {
    todo: PropTypes.shape({
        title: PropTypes.string,
        completed: PropTypes.bool,
        createdAt: PropTypes.number,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

TodoItem.propTypes = propTypes;

export default TodoItem;

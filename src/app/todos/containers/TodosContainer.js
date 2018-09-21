import AddTodo from "../components/AddTodo";
import AddTodoButton from "../components/AddTodoButton";
import AppHeader from "../components/Header";
import React, {PureComponent} from 'react'
import {
    ActivityIndicator, View, KeyboardAvoidingView, Text, Platform, TextInput,
    StyleSheet, StatusBar, ScrollView, FlatList
} from 'react-native';
import TodoItem from "../components/TodoItem";
import {COLORS} from '../../shared/constants';
import {Toast} from 'native-base';
import {connect} from "react-redux";
import {getFilteredTodos} from "../../shared/utils/todos-utils";
import {TodoActions} from '../../redux/actions';
import {TodoDefault} from "../../redux/constants/todo-constants";
import {bindActionCreators} from "redux";
import {TYPES} from "../../shared/constants/index";
import EditTodoModal from "../components/EditTodoModal";

class TodosContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            newTodo: {
                ...TodoDefault
            },
            editTodo: null
        }

    }

    componentDidMount() {
        this.props.getTodo();
    }

    _showToast = ({text, type = 'success', buttonText = 'ok', position = 'bottom', duration = 1500}) => {

        setTimeout(() => {
            Toast.show({
                text,
                buttonText,
                type,
                position,
                duration,
                textStyle: {
                    textAlign: 'center'
                },
                onClose: () => this.props.resetTodoFlags()
            })
        })

    }

    _onAdd = () => {
        const {newTodo} = this.state;

        if (newTodo.title.trim().length > 0) {
            this.props.addTodo(newTodo);

            this.setState({
                newTodo: TodoDefault
            })
        }

    }

    _onCancelDelete = () => {

        this.props.setAddingTodo(false);

        this.setState({
            newTodo: TodoDefault
        })
    }

    _onUpdate = (todo) => {
        this.props.updateTodo(todo);
    }

    _onDelete = (todo) => {
        this.props.deleteTodo(todo.id)
    }

    _onItemLongPress = (todo) => {
        this.setState({
            editTodo: todo
        })

        this._toggleModal();
    }

    _toggleModal = () => {
        this.props.setTodoEditing(!this.props.todoState.editModalVisible)
    }

    _onChangeText = (changedTitle) => {
        this.setState({
            newTodo: {
                ...this.state.newTodo,
                title: changedTitle
            }
        })
    }

    _updateTodoTitle = (newTitle) => {
        const {editTodo} = this.state;

        this.setState({
            editTodo: {
                ...editTodo,
                title: newTitle
            }
        })
    }

    _onChangeSearch = (search) => {
        this.props.setSearchText(search.trim());
    }

    _updateTodo = () => {

        this.props.updateTodo(this.state.editTodo);

        this.setState({
            editTodo: null
        })
    }

    _renderTodos = () => {
        const {todos, searchText} = this.props.todoState;

        if (todos.length > 0) {
            return (
                <FlatList
                    style={{flex: 1}}
                    data={todos}
                    keyExtractor={item => item.id}
                    renderItem={({item: todo}) => (
                        <TodoItem todo={todo}

                                  onUpdate={this._onUpdate}
                                  onLongPress={this._onItemLongPress}
                                  onDelete={this._onDelete}/>
                    )}
                />
            )
        }

        return (
            <Text style={{width: '100%', fontSize: 16, paddingVertical: 10, color: 'skyblue', textAlign: 'center'}}>
                No Todos Available {searchText.length > 0 && (
                <Text> for <Text style={{color: COLORS.tintColor}}>{searchText}</Text></Text>
            )}
            </Text>
        )
    }

    render() {
        const {addingTodo, editModalVisible, loading, hasError, success, errorMessage, successMessage, searchText} = this.props.todoState;
        const {newTodo, editTodo} = this.state;
        const isAndroid = Platform.OS === 'android';

        return (
            <KeyboardAvoidingView behavior='padding' style={{flex: 1, backgroundColor: '#fff'}}>
                <AppHeader searchText={searchText} onChangeSearch={this._onChangeSearch}/>

                <StatusBar backgroundColor={COLORS.primary} barStyle={isAndroid ? 'light-content' : 'dark-content'}/>

                {addingTodo && (
                    <View style={styles.inputRow}>
                        <AddTodo
                            newTodo={newTodo}
                            onChangeText={this._onChangeText}
                            onSubmit={this._onAdd}
                            onCancelDelete={this._onCancelDelete}
                            onBlur={this._onCancelDelete}
                        />
                    </View>
                )}

                <ScrollView>
                    {loading ? (
                        <ActivityIndicator animating={loading} size='large' color='#0000ff'/>) : this._renderTodos()}

                </ScrollView>

                <AddTodoButton onPress={() => this.props.setAddingTodo(true)}/>

                {editTodo && <EditTodoModal editTodo={editTodo}

                                            modalIsVisible={editModalVisible}
                                            onBackdropPress={this._toggleModal}
                                            onChangeTitle={this._updateTodoTitle}
                                            onCloseModal={this._toggleModal}
                                            onSubmitModal={this._updateTodo}/>}

                {hasError && this._showToast({text: errorMessage, type: 'danger'})}
                {success && this._showToast({text: successMessage, type: 'success'})}

            </KeyboardAvoidingView>
        )
    }

}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputRow: {
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        height: 50,
        paddingHorizontal: 10,
        width: '100%'
    },
})


const mapStateToProps = () => (state, ownProps) => {
    const {screen} = ownProps;

    return getFilteredTodos(state)(state, screen);
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...TodoActions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);

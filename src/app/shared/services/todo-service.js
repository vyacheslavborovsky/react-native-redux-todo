import {AsyncStorage} from 'react-native'

export default class TodoModel {

    constructor(key) {
        this.key = key;
        this._todos = [];
    }

    loadItems = async () => {
        try {
            const todos = await AsyncStorage.getItem(this.key);

            if (todos !== null) {
                this._todos = JSON.parse(todos);
            }

            return this.getItems();
        } catch (e) {
            console.log('Load Error: ', e)
        }
    }

    getItems = () => {
        return this._todos;
    }

    addItem = async todo => {
        const body = {
            ...todo,
            id: this._generateItemId(),
            createdAt: Date.now()
        }

        this._todos = [...this._todos, body]

        try {
            await AsyncStorage.setItem(this.key, JSON.stringify(this._todos))

            return body;
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    updateItem = async editedTodo => {

        try {
            this._todos = this._todos.map(todo => {
                if (todo.id === editedTodo.id) {
                    return editedTodo;
                }

                return todo;
            })

            await AsyncStorage.setItem(this.key, JSON.stringify(this._todos))
        } catch (e) {
            console.log('Update Error: ', e)
        }

    }

    destroyItemById = async id => {

        try {
            this._todos = this._todos.filter(todo => todo.id !== id);

            await AsyncStorage.setItem(this.key, JSON.stringify(this._todos))
        } catch (e) {
            console.log('Delete Error: ', e)
        }

    }

    _generateItemId = () => {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    }
}

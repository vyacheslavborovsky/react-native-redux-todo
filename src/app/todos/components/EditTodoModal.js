import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-native-modal';
import {COLORS} from "../../shared/constants";
import {Text, TextInput, TouchableHighlight, StyleSheet, View} from "react-native";


const propTypes = {
    editTodo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        createdAt: PropTypes.number.isRequired
    }),

    modalIsVisible: PropTypes.bool.isRequired,

    modalHeight: PropTypes.number,
    modalWidth: PropTypes.number,

    modalBackgroundColor: PropTypes.string,

    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    animationInTiming: PropTypes.number,
    animationOutTiming: PropTypes.number,
    backdropTransitionInTiming: PropTypes.number,
    backdropTransitionOutTiming: PropTypes.number,
    hideModalContentWhileAnimating: PropTypes.bool,
    avoidKeyboard: PropTypes.bool,

    onBackdropPress: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onSubmitModal: PropTypes.func.isRequired
}

const defaultProps = {
    modalIsVisible: false,
    modalHeight: 120,
    modalWidth: 300,
    modalBackgroundColor: COLORS.tabBar,
    animationIn: 'zoomInDown',
    animationOut: 'zoomOutUp',
    animationInTiming: 400,
    animationOutTiming: 400,
    backdropTransitionInTiming: 400,
    backdropTransitionOutTiming: 400,
    hideModalContentWhileAnimating: false,
    avoidKeyboard: false
}


const EditTodoModal = ({editTodo, modalIsVisible, onBackdropPress, onChangeTitle, onCloseModal, onSubmitModal, ...restProps}) => (
    <Modal
        isVisible={modalIsVisible}

        hideModalContentWhileAnimating={restProps.hideModalContentWhileAnimating}

        animationIn={restProps.animationIn}
        animationOut={restProps.animationOut}

        animationInTiming={restProps.animationInTiming}
        animationOutTiming={restProps.animationOutTiming}

        backdropTransitionInTiming={restProps.backdropTransitionInTiming}
        backdropTransitionOutTiming={restProps.backdropTransitionOutTiming}

        avoidKeyboard={restProps.avoidKeyboard}
        onBackdropPress={onBackdropPress}>

        <View
            style={styles.container}>

            <View style={{
                width: restProps.modalWidth,
                height: restProps.modalHeight,
                backgroundColor: restProps.modalBackgroundColor
            }}>

                <TextInput
                    style={styles.input}
                    placeholder='What needs to be done?'
                    autoFocus
                    maxLength={50}
                    underlineColorAndroid='transparent'
                    underlineColor='transparent'
                    blurOnSubmit
                    onSubmitEditing={() => {
                    }}
                    onChangeText={onChangeTitle}
                    value={editTodo.title}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onBlur={() => {
                    }}
                />

                <View
                    style={{
                        height: 45,
                        alignSelf: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        paddingVertical: 8
                    }}>

                    <TouchableHighlight
                        onPress={onCloseModal}
                        style={[
                            styles.button,
                            {
                                marginRight: 5,
                                backgroundColor: COLORS.secondary
                            }
                        ]}>

                        <Text style={[styles.text, styles.defaultText]}>Close</Text>

                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={onSubmitModal}
                        disabled={editTodo.title.trim().length === 0}
                        style={[
                            styles.button,
                            {
                                marginLeft: 5,
                                backgroundColor: COLORS.primary,
                                opacity: editTodo.title.trim().length === 0 ? .6 : 1,
                            }
                        ]}>

                        <Text style={[styles.text, styles.defaultText]}>Save</Text>

                    </TouchableHighlight>
                </View>
            </View>

        </View>
    </Modal>
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        color: COLORS.primary,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: .5,
        width: '100%'
    },
    text: {
        color: COLORS.noticeText
    },
    smallText: {
        fontSize: 12
    },
    defaultText: {
        fontSize: 14
    },
    button: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tabIconSelected,
        borderRadius: 5
    }
})

EditTodoModal.propTypes = propTypes;
EditTodoModal.defaultProps = defaultProps;

export default EditTodoModal;

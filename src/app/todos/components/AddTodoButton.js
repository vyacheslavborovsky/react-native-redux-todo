import React from 'react'
import {Icon, Fab} from 'native-base'
import PropTypes from 'prop-types'
import {COLORS} from '../../shared/constants'

const AddTodoButton = ({onPress}) => (
    <Fab
        direction='up'
        style={{backgroundColor: COLORS.primary}}
        position='bottomRight'
        onPress={onPress}>
        <Icon name='add' />
    </Fab>
)

const propTypes = {
    onPress: PropTypes.func.isRequired
}

AddTodoButton.propTypes = propTypes;

export default AddTodoButton

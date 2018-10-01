import React from 'react'
import {COLORS} from "../../shared/constants";
import PropTypes from 'prop-types';
import {StyleSheet, TextInput} from 'react-native';
import {Header, Body, Icon} from 'native-base'

const propTypes = {
    searchText: PropTypes.string.isRequired,
    onChangeSearch: PropTypes.func.isRequired
}


const AppHeader = ({onChangeSearch, searchText}) => (
    <Header
        style={styles.header}
        searchBar
        rounded>

        <Body style={styles.inner}>
        <Icon style={[styles.white]} name="ios-search"/>

        <TextInput
            style={[styles.input]}
            placeholder='Search...'
            underlineColorAndroid='transparent'
            underlineColor='transparent'
            placeholderTextColor='white'
            value={searchText}

            blurOnSubmit
            onSubmitEditing={() => {

            }}
            onBlur={() => {

            }}

            onChangeText={onChangeSearch}

            maxLength={20}
            autoCorrect={false}
            autoCapitalize='none'
        />

        {searchText.length > 0 &&
        <Icon style={[styles.white, {alignSelf: 'flex-end', fontSize: 26}]} onPress={() => onChangeSearch('')}
              name='ios-close'/>}
        </Body>
    </Header>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
        height: 65,
        justifyContent: 'center',
        width: '100%',
    },
    inner: {
        alignItems: 'center',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingRight: 54,
        paddingTop: 20,
    },
    input: {
        width: '100%',
        color: COLORS.noticeText,
        paddingLeft: 18
    },
    white: {
        color: '#fff',
        fontSize: 22
    }
})

AppHeader.propTypes = propTypes;

export default AppHeader;

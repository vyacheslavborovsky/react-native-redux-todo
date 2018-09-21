import React from 'react'
import {COLORS} from "../../shared/constants";
import {Header, Body, Title} from 'native-base'

const AppHeader = () => (
    <Header style={{
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 60,
        justifyContent: 'center'
    }}>
        <Body
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
        <Title style={{marginTop: 20}}>
            RN Todo App
        </Title>
        </Body>
    </Header>
)

export default AppHeader;

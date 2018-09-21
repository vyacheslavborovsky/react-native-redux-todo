import AppTabNavigator from './todos/containers/MainTabNavigator'
import Expo from 'expo'
import React, {PureComponent} from 'react'
import {COLORS} from './shared/constants'
import {Spinner, Container, Root} from 'native-base'
import {StatusBar, View, Platform} from 'react-native'

export default class RootComponent extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isReady: false
        }
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Ionicons: require('native-base/Fonts/Ionicons.ttf')
        })

        this.setState({isReady: true})
    }

    _renderStatusBar = () => {
        const isAndroid = Platform.OS === 'android';

        return (
            <StatusBar backgroundColor={COLORS.secondary} barStyle={isAndroid ? 'light-content' : 'dark-content'}/>
        )
    }

    render() {
        const {isReady} = this.state;

        if (!isReady) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                    {this._renderStatusBar()}
                    <Spinner color={COLORS.primary}/>
                </View>
            )
        }


        return (
            <Root>
                <AppTabNavigator/>
            </Root>
        )
    }
}

import React from 'react'
import TodosScreen from "../screens/TodosScreen";
import {MaterialIcons} from '@expo/vector-icons'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {TYPES, COLORS} from '../../shared/constants'

const commonNavigationOptions = ({navigation}) => ({
    header: null,
    title: navigation.state.routeName
})

const routeOptions = {
    screen: TodosScreen,
    navigationOptions: commonNavigationOptions
};

const AppTabNavigator = createMaterialBottomTabNavigator(
    {
        [TYPES.ALL]: routeOptions,
        [TYPES.ACTIVE]: routeOptions,
        [TYPES.COMPLETED]: routeOptions
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;

                let iconName;

                switch (routeName) {
                    case TYPES.ALL:
                        iconName = 'format-list-bulleted';
                        break;
                    case TYPES.ACTIVE:
                        iconName = 'filter-center-focus';
                        break;
                    case TYPES.COMPLETED:
                        iconName = 'playlist-add-check';
                }

                return (
                    <MaterialIcons
                        name={iconName}
                        size={28}
                        style={{marginBottom: -3}}
                        color={tintColor}/>
                );
            }
        }),
        initialRouteName: TYPES.ALL,
        shifting: true,
        activeTintColor: COLORS.tabIconSelected,
        inactiveTintColor: COLORS.tabIconDefault,
        tabBarColor: COLORS.primary,
        barStyle: {backgroundColor: COLORS.primary, opacity: .7}
    }
)

export default AppTabNavigator;

import React, { Component } from 'react'
import { useColorScheme } from 'react-native-appearance'

function Theme(Component) {
    return function WrappedComponent(props) {
        const theme = useColorScheme()
        return <Component {...props} theme={theme} />
    }
}

export default Theme
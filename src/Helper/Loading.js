import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { dfccc } from './styles'

const Loading = ({ height, color = "#0000ff" }) => {
    return (
        <View style={{ ...styles.main, minHeight: height }}>
            <ActivityIndicator size="small" color={color} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    main: {
        width: "100%",
        flex:1,
        ...dfccc
    }
})
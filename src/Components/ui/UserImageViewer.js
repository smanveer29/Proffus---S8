import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DEFAULT_AVATAR } from '../../../env';
import { Colors } from '../../Helper/Colors';
import { dfrcc } from '../../Helper/styles';

const UserImageViewer = ({ id = '', name = '', size = 50 ,store}) => {
    let img = (() => {
        if (id) {
            return DEFAULT_AVATAR
        } else {
            if (name) {
                let initials = ''
                name.split(' ').map(_i => {
                    initials = `${initials}${_i[0]}`
                })
                return initials.toUpperCase()
            }
        }
    })();
    return (
        <View style={{ ...styles.main,backgroundColor: Colors.primary, height: size, width: size, borderRadius: store?10:100}}>
            <Text style={{ ...styles.text, fontSize: size / 2.6, color: '#000', fontFamily: 'SignikaNegative-Medium',fontWeight: 'bold'}}>{img}</Text>
        </View>
    )
}

export default UserImageViewer

const styles = StyleSheet.create({
    main: {
        ...dfrcc,
        
    }
})
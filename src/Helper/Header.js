import { useNavigation } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from "./Colors";
import OptionsMenu from "react-native-options-menu";
import { useLayoutEffect } from "react";
export const Header = ({ title, wish, notify }) => {
    const navigation = useNavigation()
    const about=()=>navigation.replace('About')
    const orders=()=>navigation.replace('OrdersList')
    const myIcon = (<Entypo name="dots-three-vertical" size={23} color={Colors.primary} />)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerTitleStyle: {
                marginLeft: -10
            },
            headerStyle: { shadowColor: '#000' },
            headerRight: () => (
                <View style={{flexDirection:'row',paddingRight:10 }}>
                    {!wish &&
                        <TouchableOpacity
                            onPress={() => navigation.navigate('WishList')}
                            style={{ marginRight: 10 }}>
                            <Icon name="hearto" size={23} color={Colors.primary} />
                        </TouchableOpacity>}
                        <OptionsMenu
                        customButton={myIcon}
                        destructiveIndex={1}
                        options={["About","Your Orders"]}
                        actions={[about,orders]} />
                </View>
                // <View style={{ flexDirection: 'row-reverse' }}>
                //     {/* {!notify &&
                //         <TouchableOpacity
                //             onPress={() => navigation.navigate('Notification')}
                //             style={{ marginRight: 20 }}>
                //             <Icon2 name="bell" size={23} color={Colors.primary} />
                //         </TouchableOpacity>
                //     } */}

                // </View>
            )
        })
    }, [navigation]);
    return (
        <View>

        </View>
    )
}
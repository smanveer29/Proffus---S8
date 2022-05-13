import React from 'react'

import { TouchableOpacity } from 'react-native'
import Logo from '../../Assets/svg/logo.svg'



const getIcon = (title) => {
    switch (title) {
        case "Home": return home
        default: return Logo
    }
}
const Icon = ({ title = 'website_icon', size = 50, lib = false, color, style = {}, onPress }) => {

    // if (lib) {
    //     let LibIcon = getIcon(title)
    //     return (
    //         <LibIcon
    //             className='icon'
    //             size={size}
    //             alt={title}
    //             title={title}
    //             color={color}
    //             onClick={onClick}
    //             style={{ width: size, height: size }}
    //             fontSize={size.toString()}
    //         />
    //     )

    // }
    let LibIcon = getIcon(title)
    return (
        onPress ? <TouchableOpacity style={style} onPress={onPress} >
            <LibIcon height={size} width={size} />
        </TouchableOpacity>
            : <LibIcon style={style} height={size} width={size} />
    )
}

export default Icon

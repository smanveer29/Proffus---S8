import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import DraggablePanel from 'react-native-draggable-panel';
import { Promo } from '../Helper/FakeData';
import { Colors } from '../Helper/Colors';
const showToastWithGravityAndOffset = (flag) => {
    ToastAndroid.showWithGravityAndOffset(
        `${flag}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        25
    );
};
const Coupons = ({ show, change }) => {
    return (
        <DraggablePanel
            animationDuration={600}
            initialHeight={Dimensions.get('window').height / 1.3}
            expandable={true}
            hideable={true}
            borderRadius={20}
            onDismiss={() => change('')}
            visible={show}
        >
            <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
                <Text style={{ ...styles.text ,fontSize:23,marginHorizontal:20,fontWeight:'900'}}>All Coupons</Text>
                <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                    {Promo.map((item, index) =>
                        <View style={styles.promoCard} key={index}>
                            <Text style={{ ...styles.text }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate commodo ex a rutrum. Etiam ullamcorper mi sapien, eu blandit risus hendrerit sit amet. Maecenas sed arcu sit amet mi dapibus rhoncus rutrum vitae ex. Fusce dui est, mattis eu hendrerit eu, elementum sed purus. Aliquam pretium placerat elementum. </Text>
                            <Text style={{...styles.text}}>Offer Valid Till - <Text style={{fontWeight: 'bold'}}>{item.valid}</Text></Text>

                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.text,textTransform: 'uppercase',fontWeight: '900',color:Colors.primary,fontSize:18}}>{item.promo}</Text>
                                <TouchableOpacity onPress={()=>{
                                    change(item.promo)
                                    showToastWithGravityAndOffset('Coupon Applied!') 
                                    }}>
                                    <Text style={{ ...styles.text, color: Colors.primary }}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </ImageBackground>
        </DraggablePanel>
    );
};

export default Coupons;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding:20, 
    },
    promoCard: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.primary, 
        margin:18,
        padding:20,
        borderRadius:20
    },
    text: {
        color: 'black',
        textTransform: 'capitalize',
        marginVertical:8,
        textAlign: 'justify'
    }
});

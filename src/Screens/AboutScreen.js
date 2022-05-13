import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Header } from '../Helper/Header';

const AboutScreen = () => {
    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
            <Header title="About Us" />
            <Text style={{ ...styles.text, fontWeight: '900', fontSize: 28, textTransform: 'uppercase', textDecorationLine: 'underline', alignSelf: 'center' }}>cookhous</Text>
            <ScrollView style={{ margin: 20 }}>
                <Text style={{ ...styles.text, textTransform: 'capitalize', fontSize: 22, fontWeight: '700' }}>about cookhous</Text>
                <Text style={{ ...styles.text, fontSize: 18, textAlign: 'justify' }}>COOKHOUS- The secret ingredient is Love! {'\n'}
                    Hi! Welcome to COOKHOUS.{'\n'}{'\n'}
                    We are excited to serve you our signature dishes that will take your taste buds on a tour to explore spicy, buttery, creamy, smoky, nutty flavours that will surely make your Dil Khush and Pett Full!{'\n'}{'\n'}

                    We Serve What We Love-We Love What We Serve!{'\n'}{'\n'}
                    We proudly represent of Origin State, Chhattisgarh by serving “Everything with Rice” which is complimentary! {'\n'}
                    Don’t trust us? ORDER NOW!{'\n'}{'\n'}
                    Cheers!
                </Text>
            </ScrollView>
        </ImageBackground>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
    }, text: {
        color: 'black',
        marginVertical: 10
    }
});

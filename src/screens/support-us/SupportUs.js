import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, Linking, TouchableOpacity } from   'react-native';

// Component
import Header from '../../components/Header';


export default class SupportUs extends Component {
  render() {
    return (
      <View>
        <Header />
        <View style={{justifyContent:'center', alignItems:'center'}} >
            <Text style={{fontFamily:"Montserrat-Medium", marginTop:10, fontSize:25}}>MERCI À VOUS !</Text>
            <View style={{width: '95%', marginTop:10}}>
                <Text style={styles.containerText} >
                    Aujourd'hui nous pouvons produire notre contenu grâce à vos financements !
                    Que vous souhaitiez nous soutenir régulièrement sur Tipeee (à partir de 1€ par mois), ponctuellement via des dons PayPal ou en profitant de votre abonnement Amazon Premium via Twitch Prime, MERCI.
                </Text>

                <Text style={styles.containerText}>
                    Aujourd'hui nous poursuivons notre but : vous proposer toujours plus de contenu tout en améliorant la qualité de ces derniers. Nous sommes nous mêmes donateurs de l'association de loi 1901.
                    Merci encore à vous !
                </Text>
                <Image source={require('../../res/images/signature.png')} style={{width:250, height: 100, position:'absolute', left:125, top:220}} />
            </View>
        </View>

        <View style={{height: 220, flexDirection: 'column', justifyContent:'space-around', alignItems:'center', marginTop:70}}>
            <TouchableOpacity onPress = { () => Linking.openURL('https://www.twitch.tv/subs/studiorenegade')}
                style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}} >
                <Image source={require('../../res/images/twitch.png')} style={{height:70, width:70}} />
                <Text style={styles.containerText}>S'abonner</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> Linking.openURL('https://www.tipeee.com/stdrenegade')} >
                <Image source={require('../../res/images/Tipeee_logo.png')} style={{height:50, width:135}} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Linking.openURL('https://www.paypal.com/cgi-bin/webscr/?cmd=_s-xclick&hosted_button_id=QZXLDBZV3UEWS')} >
                <Image source={require('../../res/images/paypal.png')} style={{height:50, width:120}} />
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    containerText:{
        textAlign: 'justify',
        fontFamily: 'Montserrat-Light',
        fontSize: 15,
        fontWeight: "400",
        lineHeight: 20
    }
})


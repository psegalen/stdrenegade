import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from "react-native"
import Clipboard from '@react-native-community/clipboard';
import { connect } from "react-redux"


import ScrollViewWithHeader from "../../components/ScrollViewWithHeader"
import { ProgramRoutes} from "../routes"


const StreamersDetails = (props) =>{
    const { params } = props.navigation.state
    const StreamerDetail =  props.renegade.streamers.find(streamer => streamer.id === params.streamerId) || params.streamerDetail
    const socialNetworkDisplay = (account, id )=> {
        return Alert.alert(account, `id : ${id}`, [{text:"copier", onPress:() => Clipboard.setString(id) },{text:"Annuler"}]);
    }

    const createSocialNetworkButton =(key) =>{
        if(StreamerDetail[key] && (/^(user_)/.test(key)) ){
            let filename 
            switch (key.slice(5)) {
                case "twitter":
                    filename =  require("../../res/images/twitter.png")
                    break;
                case "instagram":
                    filename =  require("../../res/images/instagram.png")
                    break;
                case "facebook":
                    filename =  require("../../res/images/facebook.png")
                    break;
                case "steamid":
                    filename =  require("../../res/images/steam.png")
                    break;
                case "nintendo":
                    filename =  require("../../res/images/nintendo.png")
                    break;
                case "xbox":
                    filename =  require("../../res/images/xbox.png")
                    break;
                case "psn":
                    filename =  require("../../res/images/psn.png")
                    break;
                case "battlenet":
                    filename =  require("../../res/images/battlenet.png")
                    break;
                case "uplay":
                    filename =  require("../../res/images/uplay.png")
                    break;
                case "origin":
                    filename =  require("../../res/images/origin.png")
                    break;
                case "gog":
                    filename =  require("../../res/images/gog.png")
                    break;
                case "pokemongo":
                    filename =  require("../../res/images/pokemongo.png")
                    break;
                default : 
                    filename = require("../../res/images/empty.png")

            }
            return(
                <TouchableOpacity key={key} onPress={(()=>socialNetworkDisplay(key.slice(5),StreamerDetail[key]))}>
                    <Image style={styles.networkButton} source={filename}/>
                </TouchableOpacity>
            )
        }
            
    }

// create objects to fill screen
    const  devices = {
        mobile: StreamerDetail.smartphone_actuel,
        watch: StreamerDetail.montre_actuelle,
        app: StreamerDetail.application_du_moment,
    }
    const favoritesWorks = {
        tvShow:StreamerDetail.serie_preferee,
        film:StreamerDetail.film_prefere,
        book:StreamerDetail.livre_prefere,
        videoGame:StreamerDetail.jeuvideo_prefere,
        hero: StreamerDetail.heros_prefere,
        comics:StreamerDetail.bd_preferee,
        manga:StreamerDetail.manga_prefere,
    }

    const streamerLifeStyle = (content) =>{
        if(content){
            let isEmpty = true
            for (const value in content){
                if(content[value]) {
                    isEmpty = false
                }
            }
            if(!isEmpty) {
                let body= []
                for (const value in content){
                    let label
                    if(content[value]){
                        switch (value){
                            case "mobile":
                                label = "Smartphone actuel : "
                                break;
                            case "watch":
                                label = "Montre actuelle : "
                                break;
                            case "app":
                                label = "Application du moment : "
                                break;
                            case "tvShow":
                                label = "Série préférée : "
                                break;
                            case "film":
                                label = "Film préféré : "
                                break;
                            case "book":
                                label = "Livre préféré : "
                                break;
                            case "videoGame":
                                label = "Jeu vidéo préféré : "
                                break;
                            case "hero":
                                label = "Héros préféré : "
                                break;
                            case "comics":
                                label = "BD préférée : "
                                break;
                            case "manga":
                                label = "Manga préféré : "
                                break;
                        }
                        body.push({labelToDisplay:label,contentToDisplay:content[value]} )
                    }
                }
                return body
            }else{
                return []
            }
        }else{
            console.warn("content is missing")
            return[]
        }
    }

    return(
    <ScrollViewWithHeader style={styles.root} navigation={props.navigation}>
        <Image source={{uri:StreamerDetail.logo}} style={styles.streamerPhoto}></Image>
        <View>
            <Text style={styles.title} >{StreamerDetail.name}</Text>
            { StreamerDetail.nextLive ? (
                <Text style={styles.textContainer}> Prochain live : {StreamerDetail.nextLive}</Text>
            ): null}
            <Text style={styles.textContainer}>{StreamerDetail.description}</Text>
        </View>
        <View>
            <Text style={styles.title} >Emissions</Text>
            <View style={styles.programList}>
            {StreamerDetail.programDetails.map(program =>
                <TouchableOpacity 
                    key={program.id}
                    onPress={() =>
                        props.navigation.navigate(ProgramRoutes.programsDetails, {
                            programId : program.id
                        })
                }>
                    <Image 
                        style={styles.programLogo}
                        source={{uri: program.logo}}/>
                </TouchableOpacity>)}
            </View>
        </View>
        <View>
            <Text style={styles.title} >Connectons-nous !</Text>
            <View style={styles.containerNetworkButton}>
                {Object.keys(StreamerDetail).map((network)=>
                    createSocialNetworkButton(network)  
                )}
            </View>
        </View>
        {StreamerDetail.config_stream ? (
            <View>
                <Text style={styles.title}>Config stream</Text>
                <Text style={styles.textContainer}>{StreamerDetail.config_stream}</Text>
            </View>
        ): null}

        <View>   
            {streamerLifeStyle(devices).length>0?(
                <Text style={styles.title}>Préférences</Text>
            ):null}
            {streamerLifeStyle(devices).map((device, index) => 
                <Text key={index} style={styles.center}>{device.labelToDisplay}<Text style={styles.bold}>{device.contentToDisplay}</Text></Text>)}
        </View>
        <View>   
            {streamerLifeStyle(favoritesWorks,).length>0?(
                <Text style={styles.title}>Oeuvres culturelles</Text>
            ):null}
            {streamerLifeStyle(favoritesWorks,).map((work, index) => 
                <Text key={index} style={styles.center}>{work.labelToDisplay}<Text style={styles.bold}>{work.contentToDisplay}</Text></Text>)}
        </View>

    </ScrollViewWithHeader>)
    }

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F2EDE9",
        paddingBottom:10
    },
    title: {
        fontFamily: "Montserrat-Medium",
        textAlign: "center",
        color: "#000",
        fontSize: 20,
        marginTop: 20,
        marginBottom:10,
    },
    streamerPhoto:{
        margin:20,
        borderRadius: 40,
        width: 80,
        height: 80, 
        alignSelf: "center"
    },
    textContainer: {
        fontSize: 16,
        marginTop: 10,
        paddingHorizontal:10,
        fontFamily: "Montserrat-Light",
        color: "#000",
        textAlign: "center"
    },
    programList:{
        flexDirection: "row",
        justifyContent: "center",
    },
    programLogo:{
        borderRadius: 30,
        height: 60,
        width: 60,
        margin:10,
    },
    containerNetworkButton:{
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    networkButton:{
        height: 40,
        width: 40,
        margin: 5,
    },
    bold: {
        fontWeight: "bold",
    },
    center:{
        textAlign: "center",
        fontFamily: "Montserrat-Light",
        fontSize: 16,

    }
})

const mapStateToProps = ({ renegade }) => ({
    renegade,
})
export default connect(mapStateToProps)(StreamersDetails)
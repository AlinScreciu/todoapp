import { StyleSheet, Dimensions, Platform } from "react-native";


const globalStyles = StyleSheet.create({
    disableAutoLogin:
    {
        borderRadius: 25,
        backgroundColor: "#6D28D9",
        marginHorizontal: Platform.OS === "web" ? Dimensions.get('window').width/2 : Dimensions.get('window').width/5,
        marginVertical: 10,
    },
    disableAutoLoginText:
    {
       fontSize: 20,
       color: 'white',
       fontWeight: 'bold',
       alignSelf: 'center',
       margin: 10,
    },
    root:
    {
        backgroundColor: '#EEE',
        flex: 1,
        paddingTop: 30,
    },
    container:
    {
        flex: 1,

        //marginHorizontal: Platform.OS === "web" ? Dimensions.get('window').width/4 : 50,
    },
    homeContainer:
    {
        flex: 1,
        backgroundColor: '#fff',
    },
    homeContent:
    {
        flex: 1,
        padding: 40,
    },
    homeList:
    {
        flex: 1,
        marginTop: 10,
    },
    item:
    {
        flexDirection: 'row',
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 3,
        borderStyle: 'dashed',
        borderRadius: 5,
    },
    itemText:
    {
        marginLeft: 10,
        fontSize: 18,
        color: '#000'
    },
    title:
    {
        alignSelf: 'center',
        color: '#6D28D9',
        fontSize: 50,
        fontWeight: 'bold',
        marginVertical: 30,
    },
    logo:
    {
        width: Platform.OS === "web" ? Dimensions.get('window').width / 8 : Dimensions.get('window').width * 1.6 / 4,
        height: Platform.OS === "web" ? Dimensions.get('window').width / 8 : Dimensions.get('window').width * 1.6 / 4,
        alignSelf: 'center',
        margin: 5,
    },
    inputArea: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: Platform.OS === "web" ? Dimensions.get('window').width / 4 : 50,
        overflow: 'hidden',
    },
    Icon: {
        padding: 10,
    },
    showIcon: {
        padding: 10,
        paddingRight: 20,
    },
    label: {
        marginTop: 5,
        marginBottom: -3,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Platform.OS === "web" ? Dimensions.get('window').width / 4 : 50,
        fontWeight: 'bold',
        fontSize: 20,
    },
    issueNotif:
    {
        marginHorizontal: 50,
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    },
    notif:
    {
        marginHorizontal: 50,
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold'
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        color: '#424242',
        fontSize: 20,
    },
    checkbox:
    {
        borderColor: 'red',
        borderWidth: 3,
        width: 30,
        height: 30,

    },
    ticked:
    {
        backgroundColor: 'red',
        width: 30,
        height: 30,
    },
    button:
    {
        marginHorizontal: Platform.OS === "web" ? Dimensions.get('window').width / 2.8 : 60,
        marginVertical: 20,
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "#6D28D9",
        alignItems: 'center',
        justifyContent: 'center',
    },
    signup:
    {
        alignSelf: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
        flexDirection: 'row',
    },
    forgot:
    {
        alignSelf: 'center',
        alignItems: 'center',
        marginHorizontal: 40,

    },
    fadedLink:
    {
        color: '#8853db',
    },
    buttonText:
    {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    header:
    {
        backgroundColor: '#6D28D9',
        flexDirection: 'row',
        paddingTop: 40,
        justifyContent: 'center',
    },
    accIcon:
    {
        marginLeft: '67%',
    },
    headerTitle:
    {
        paddingLeft: '3%',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

})

export default globalStyles;
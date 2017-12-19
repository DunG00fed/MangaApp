import { StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.blue300,
        alignItems: 'center',
        paddingTop: 100
    },
    logo: {
        color: COLOR.white,
        fontSize: 100,
        paddingBottom: 50
    },
    signUpFooter: {
        flex : 1,
        backgroundColor: COLOR.blue500,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    button: {
        backgroundColor: COLOR.blue500,
        width: 100,
        justifyContent: 'center'
    },
    buttonView: {
        alignItems: 'center',
        paddingTop: 20
    },
    hyperlink: {
        color: COLOR.blue100
    },
    whitetext: {
        color: COLOR.white
    }
});
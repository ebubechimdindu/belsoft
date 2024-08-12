import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CashPointLogo from '../assets/images/CashPoint-logo-2.png';
import FaceId from '../assets/images/face-id.png';
import { PersonIcon } from '../assets/theme/icons';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../assets/theme/colors';
import { Check } from 'lucide-react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, horizontalScale, moderateScale } from '../util/metric';

// Checkbox component with custom styling and state management
function MyCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
        <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={() => setChecked(!checked)}>
            {checked && <Check strokeWidth={3} size={12} color={COLORS.backgroundDark} />}
        </Pressable>
    );
}

const SignIn = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* CashPoint logo at the top */}
                <Image source={CashPointLogo} style={{ marginTop: verticalScale(9) }} />

                {/* Container for the user icon and welcome text */}
                <View style={styles.personContainer}>
                    <View style={styles.person}>
                        <PersonIcon />
                    </View>
                    <Text style={styles.headerText}>Sign In</Text>
                    <Text style={styles.subHeaderText}>Welcome back to CashPoint!</Text>
                </View>

                {/* Input fields for email and password */}
                <View style={{ marginBottom: 10 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email Address'
                        cursorColor='#171717'
                        placeholderTextColor="#171717"
                        maxLength={255}
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder='Password'
                            cursorColor='#171717'
                            placeholderTextColor="#171717"
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="done"
                            secureTextEntry
                            underlineColorAndroid="transparent"
                        />
                        <Ionicons name='eye-off' color="#1D2739" size={21} />
                    </View>

                    {/* Remember me checkbox and forgot password link */}
                    <View style={styles.rememberMeContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <MyCheckbox />
                            <Text style={styles.rememberMeText}>Remember me?</Text>
                        </View>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </View>
                </View>

                {/* Sign In button linking to the main tab screen */}
                <View style={styles.button}>
                    <Link style={{
                        color: '#FFF',
                        fontSize: 16,
                        fontFamily: 'Manrope-Medium',
                        width:'100%',
                        textAlign:'center'
                    }} href={'/(tab)'}>Sign In</Link>
                </View>

                {/* Face ID icon below the Sign In button */}
                <View style={styles.faceIdStyle}>
                    <Image source={FaceId} />
                </View>

                {/* Link to sign up if the user doesn't have an account */}
                <View style={{ flexDirection: 'row', columnGap: 2 }}>
                    <Text style={styles.noAccountText}>Don't have an account?</Text>
                    <Link href={'/'} style={styles.signUpLink}>Sign up</Link>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    personContainer: {
        marginTop: verticalScale(59.27),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(20)
    },
    headerText: {
        fontFamily: 'Manrope-SemiBold',
        fontSize: 24,
        marginVertical: verticalScale(10)
    },
    subHeaderText: {
        fontFamily: 'Manrope-Regular',
        fontSize: 14,
    },
    person: {
        paddingVertical: verticalScale(15),
        paddingHorizontal: horizontalScale(15),
        backgroundColor: '#FFF5D9',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: horizontalScale(329),
        paddingVertical: verticalScale(15),
        paddingHorizontal: horizontalScale(15),
        borderWidth: 1,
        borderColor: '#171717',
        borderRadius: 8,
        marginBottom: verticalScale(20),
    },
    passwordInput: {
        fontFamily: 'Manrope-Regular',
        fontSize: 12,
        color: '#171717',
        flex: 1,
    },
    textInput: {
        fontFamily: 'Manrope-Light',
        width: horizontalScale(329),
        paddingVertical: verticalScale(15),
        paddingHorizontal: horizontalScale(15),
        borderWidth: 1,
        borderColor: '#171717',
        borderRadius: 8,
        marginBottom: verticalScale(20),
        fontSize: 12,
        color: '#171717'
    },
    checkboxBase: {
        width: horizontalScale(18.07),
        height: verticalScale(18.07),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: COLORS.secondary,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10)
    },
    rememberMeText: {
        fontFamily: 'Manrope-Regular',
        fontSize: 12,
    },
    forgotPasswordText: {
        fontFamily: 'Manrope-Regular',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#171717',
        paddingVertical: verticalScale(18.5),
        paddingHorizontal: horizontalScale(18.5),
        borderRadius: 8,
        alignItems: 'center',
        marginTop: verticalScale(25),
        marginBottom: verticalScale(79),
        width: horizontalScale(329),
        alignSelf: 'center'
    },
    faceIdStyle: {
        paddingVertical: verticalScale(9.5),
        paddingHorizontal: horizontalScale(9.5),
        width: horizontalScale(64),
        height: verticalScale(64),
        backgroundColor: '#FFF8E6',
        borderRadius: 9,
        marginBottom: verticalScale(79),
        alignItems: 'center',
        justifyContent: 'center'
    },
    noAccountText: {
        fontFamily: 'Manrope-Regular',
        fontSize: 14,
    },
    signUpLink: {
        fontFamily: 'Manrope-SemiBold',
        textDecorationLine: 'underline',
        marginBottom: 40,
    }
});

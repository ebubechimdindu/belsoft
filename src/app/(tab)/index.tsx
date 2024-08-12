import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '@/src/assets/images/avatar.png'
import {
  BellAlertIcon, PhCopyIcon, EyeIcon,
  EyeOffIcon, PlusIcon, BigArrowIcon,
  Phone, Television, Electricity, Cross
}
  from '@/src/assets/theme/icons'
import GSM from '@/src/assets/images/gsm.png'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/src/assets/theme/colors'
import { TransactionHistoryData } from '@/src/lib/placeholder-data'
import { verticalScale, horizontalScale, moderateScale } from '@/src/util/metric'

const QuickAccessItems = [
  {
    id: 1,
    icon: <Phone />,
    title: 'Airtime',
  },
  {
    id: 2,
    icon: <Television />,
    title: 'TV/Cable',
  },
  {
    id: 3,
    icon: <Electricity />,
    title: 'Electricity',
  },
  {
    id: 4,
    icon: <Cross />,
    title: 'Offerings',
  }
]

const TransactionHistoryItems = (item: TransactionHistory) => {
  return (
    <Pressable style={styles.TransactionHistoryItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: horizontalScale(5) }}>
        <Image style={{ width: 40, height: 40 }} resizeMode='contain' source={item.icon_image} />
        <View>
          <Text style={{fontFamily:'Manrope-SemiBold' ,fontSize: moderateScale(14)}}>{item.transaction_partner}</Text>
          <Text style={{fontFamily:'Manrope-Regular',fontSize: moderateScale(12), opacity: 0.7,color: COLORS.textSecondary }}>{item.date}</Text>
        </View>
      </View>

      {item.transactionType === 'Credit' ? (
        <Text style={{ fontSize: moderateScale(14),fontFamily:'Manrope-SemiBold' , color: COLORS.transactionCredit }}>+N{item.amount}</Text>
      ) : (
        <Text style={{ fontSize: moderateScale(14), fontFamily:'Manrope-SemiBold' }}>-N{item.amount}</Text>
      )}
    </Pressable>
  );
};

const HomeScreen = () => {
  const [showBalance, setShowBalance] = useState(true);
  function balance() {
    setShowBalance(!showBalance);
  }

  const renderHeader = () => (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image source={Avatar} style={styles.avatar} />
          <View>
            <Text style={{ fontFamily:'Manrope-Regular',fontSize:moderateScale(12) }}>Hey,</Text>
            <Text style={{ fontSize: moderateScale(14), fontFamily:'Manrope-SemiBold'}}>Veronica</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menu}>
            <Ionicons name="help-outline" size={17} color={COLORS.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu}>
            <BellAlertIcon />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable style={styles.accountNumberContainer}>
        <Text style={{ fontSize: moderateScale(8), fontFamily:'Manrope-Regular' }}>Account Number</Text>
        <View style={styles.accountNumber}>
          <Text style={{fontSize: moderateScale(12),fontFamily:'Manrope-Regular'}}>457566594573</Text>
          <PhCopyIcon />
        </View>
      </Pressable>

      <View style={styles.balanceContainer}>
        <Text style={{ fontSize: moderateScale(16),fontFamily:'Manrope-Regular',opacity: 0.7 }}>Account Balance</Text>
        <View style={styles.balance}>
          {showBalance ? (
            <Text style={{ fontSize: moderateScale(36), fontFamily:'Manrope-Bold' }}>*******</Text>
          ) : (
            <Text style={{ fontSize: moderateScale(36), fontFamily:'Manrope-SemiBold' }}>
              N10,567,495.<Text style={{ fontSize: moderateScale(28) }}>34</Text>
            </Text>
          )}

          <Pressable onPress={balance} style={showBalance && { marginBottom: verticalScale(10) }}>
            {showBalance ? EyeIcon : EyeOffIcon}
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, { borderWidth: 2 }]}>
            <Text style={{ fontSize: moderateScale(16), fontFamily:'Manrope-Medium' }}>Fund</Text>
            <PlusIcon />
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: COLORS.secondary }]}>
            <Text style={{ fontSize: moderateScale(16), fontFamily:'Manrope-Medium' }}>Transfer</Text>
            <BigArrowIcon />
          </Pressable>
        </View>
      </View>

      <View style={styles.atmContainer}>
        <View>
          <Text style={{ fontSize: moderateScale(11), fontFamily:'Manrope-Bold', color: COLORS.secondary }}>Coming Soon: Cash Nearby, Skip the ATM!</Text>
          <Text style={{ fontSize: moderateScale(11), fontFamily:'Manrope-Light', color: COLORS.primary, width: horizontalScale(285) }}>
            Find Point-of-Sale (PoS) locations for instant cash access with our built-in map. Download CashPoint and ditch the ATM lines!
          </Text>
        </View>
        <Image source={GSM} />
      </View>

      <View style={styles.quickAccessContainer}>
        <Text style={{ fontSize: moderateScale(16), fontFamily:'Manrope-Medium' }}>Quick Access</Text>
        <View style={styles.quickAccessItems}>
          {QuickAccessItems.map((item) => (
            <View key={item.id} style={{ alignItems: 'center', overflow: 'hidden' }}>
              <View style={styles.quickAccessItem}>{item.icon}</View>
              <Text style={{ fontSize: moderateScale(12), fontFamily:'Manrope-Regular' }}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.transactionHistoryContainer}>
        <View style={styles.transactionHistoryHeader}>
          <Text style={{ fontSize: moderateScale(16), fontFamily:'Manrope-Medium' }}>Transaction History</Text>
          <TouchableOpacity style={{ padding: verticalScale(1) }}>
            <Text style={{ fontSize: moderateScale(12), fontFamily:'Manrope-Regular' }}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TransactionHistoryData}
          keyExtractor={(item) => item.transaction_id}
          renderItem={({ item }) => <TransactionHistoryItems {...item} />}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingLeft: horizontalScale(17),
          paddingRight: horizontalScale(17),
          paddingTop: verticalScale(24),
          paddingBottom: verticalScale(26),
        }}
        data={[]}
        keyExtractor={() => 'key'}
        renderItem={null}
        ListHeaderComponent={renderHeader}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}

      />
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: verticalScale(30),
    marginTop: verticalScale(24),
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  avatar: {
    width: horizontalScale(40),
    borderRadius: 100,
    overflow: 'hidden',
  },
  accountNumberContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  accountNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: horizontalScale(2),
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: horizontalScale(9),
  },
  menu: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    marginTop: verticalScale(17),
    alignItems: 'center',
    justifyContent: 'center',
  },
  balance: {
    flexDirection: 'row',
    columnGap: horizontalScale(5),
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(15),
    columnGap: horizontalScale(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: horizontalScale(10),
    paddingVertical: verticalScale(12.5),
    borderRadius: moderateScale(12),
    width: horizontalScale(147),
  },
  atmContainer: {
    width: '100%',
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(24),
    backgroundColor: COLORS.backgroundDark,
    borderRadius: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(31),
    opacity: 0.5,
  },
  quickAccessContainer: {
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(15),
    backgroundColor: COLORS.backgroundLight,
    marginTop: verticalScale(29),
    borderRadius: moderateScale(15),
  },
  quickAccessItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: verticalScale(10),
  },
  quickAccessItem: {
    backgroundColor: COLORS.secondary,
    paddingVertical: verticalScale(10.5),
    paddingHorizontal: horizontalScale(10.5),
    borderRadius: moderateScale(68),
  },
  transactionHistoryContainer: {
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(15),
    backgroundColor: COLORS.backgroundLight,
    marginTop: verticalScale(29),
    borderRadius: moderateScale(15),
  },
  transactionHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(26),
  },
  TransactionHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(26),
  },
});
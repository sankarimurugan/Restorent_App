import React from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import CommonHeader from '../components/Header/CommonHeader';
import TableReservationList from '../components/TableReservation/TableReservationList';
import {C} from '../assets/styles/ColorsFonts';

const TableReservationScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: C.WHITE}}>
      <CommonHeader title="Table Reservation" />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <TableReservationList />
          <TableReservationList />
          <TableReservationList />
          <TableReservationList />
          <TableReservationList />
          <TableReservationList />
          <TableReservationList />
          <TableReservationList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TableReservationScreen;

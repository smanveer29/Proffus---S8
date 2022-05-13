import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'
import { Colors } from '../../Helper/Colors';
import { dfr, dfrccc, dfrcsb, p } from '../../Helper/styles';
import axios from '../../utils/axios'
import { formatUnixDate, formatUnixDateSmall } from '../../Helper/moment';
const date = new Date()
const TimeSlots = ({ select }) => {
   const navigation = useNavigation()
   const [tslots, setTslots] = useState([]);
   const [bookedSlots, setBookedSlots] = useState([])
   const [selectedTime, setSelectedTime] = useState(null)
   useEffect(() => {
      timeSlots()
      axios.get('/rest/time/1/2022-06-01')
         .then(res => {
            if (res.data.success) {
               let temp = []
               res.data.data.map(item => {
                  item['start_time'] = moment(item.start_time, "HH:mm:ss").format('hh:mm a')
                  item['end_time'] = moment(item.end_time, "HH:mm:ss").format('hh:mm a')
                  temp.push({
                     start_time: item.start_time,
                     end_time: item.end_time,
                     service_date: item.service_date
                  })
               })
               setBookedSlots(temp)
            }
         })

   }, [navigation]);

   useEffect(() => {
      selectedTime && select({ ...selectedTime, date: moment(date).format('YYYY-MM-DD') })
   }, [selectedTime])


   const timeSlots = () => {
      var x = {
         nextSlot: 60,
         startTime: '10:00',
         endTime: '20:00'
      };
      var slotTime = moment(x.startTime, "HH:mm");
      var endTime = moment(x.endTime, "HH:mm");
      let times = [];
      while (slotTime < endTime) {
         let temp = {
            start: "",
            end: ""
         }
         temp.start = slotTime.format("hh:mm a")
         slotTime = slotTime.add(x.nextSlot, 'minutes');
         temp.end = slotTime.format("hh:mm a")
         times.push(temp);
      }
      setTslots(times)
   }
   // const opacity=(()=>{
   //    for(let i=0; i<tslots.length; i++){
   //       for(let j=0; j<bookedSlots.length;j++){
   //          if(moment(tslots[i].start).isAfter(moment(bookedSlots[j].start_time)) && moment(tslots[i].end).isBefore(moment(bookedSlots[j].end_time))){
   //             console.log('yes')
   //          }
   //          else{
   //             console.log('no')
   //          }
   //       }
   //    }
   // })()

   return (
      <View style={{ ...dfrcsb, flexWrap: 'wrap', marginHorizontal: 5, marginVertical: 10 }}>
         {tslots.length > 0 && tslots.map((item, i) =>
            <TouchableOpacity key={i} style={{ ...styles.slotsCard, backgroundColor: selectedTime ? selectedTime.start === item.start && selectedTime.end === item.end && Colors.primary : '#fff' }} onPress={() => {
               !selectedTime ? setSelectedTime(item) : setSelectedTime(null)
            }}>
               <Text style={{ ...p, color: selectedTime ? selectedTime.start === item.start && selectedTime.end === item.end && '#000' : Colors.primary }}>{item.start}-{item.end}</Text>
            </TouchableOpacity>)}
      </View>
   )
}

export default TimeSlots

const styles = StyleSheet.create({
   slotsCard: {
      ...dfrccc,
      width: '49%', height: 50, borderWidth: 1, borderColor: Colors.primary,
      marginVertical: 3,
      borderRadius: 10
   }
})
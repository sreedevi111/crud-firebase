import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import momentDurationFormatSetup from 'moment-duration-format';
import CustomButton from './src/Components/CustomButton'


momentDurationFormatSetup(moment);
typeof moment.duration.fn.format === 'function';
typeof moment.duration.format === 'function';


const App = () => {
  const [data, setData] = useState([]);


  const random = async count => {
    let tempData = [];

    for (let k = 0; k < count; k++) {
      let initial = moment().subtract(6, 'months').unix(); //The start date should be within the past six months
      let final = moment().unix(); // Current Date

      let startDate = Math.floor(
        Math.random() * (final - initial + 1) + initial,
      ); // Getting random time between start date between past 6 months and now
      let endDate =
        Math.floor(
          Math.random() * (startDate + 36000 - (startDate + 600) + 1),
        ) +
        (startDate + 600); // Getting end date according to starting starting with min 10 min and max 10 hrs duration

      //Getting break duration
      if (endDate - startDate < 2700) {
        var breakDuration = Math.floor(
          Math.random() * (endDate - startDate + 1),
        );
      } else {
        var breakDuration = Math.floor(Math.random() * (2700 + 1));
      }

      let TotalDuration = endDate - startDate - breakDuration; // unix
      // let totalDuration15 = TotalDuration - (TotalDuration % 900) + 900; // unix in round to nearest 15

      //My new pattern

      let endFormat = moment.unix(endDate).format('LLL');
      let startFormat = moment.unix(startDate).format('LLL');

      let DurationFormat = moment
        .duration(TotalDuration, 'seconds')
        .format('hh:mm:ss');

      let BreakDurationFormat = moment
        .duration(breakDuration, 'seconds')
        .format('mm');

      tempData.push({
        startUnix: startDate,
        endUnix: endDate,
        startDate: startFormat,
        endDate: endFormat,
        breakMin: BreakDurationFormat,
        totalTimeUnix: TotalDuration,
        totalTimehrs: DurationFormat,
      });
    }

    setData(tempData);
  };


  let lastsevendays = moment().subtract(7, 'days').unix();
  console.log('Last seven days unix', lastsevendays);

  let today = moment().subtract(24, 'hours').unix();

  function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  const totalHoursWeek = () => {
    const hours = [];
    data.forEach(x => {
      console.log('Am i called?', x);
      if (x.startUnix > lastsevendays) {
        console.log("Started Date, last seven days:::", x.startUnix, lastsevendays)
        hours.push(x.totalTimeUnix);
        let sumhours = hours.reduce((a, b) => a + b, 0);
        console.log('My total hours in week', secondsToTime(sumhours));
        console.log('My weekly hours array', hours);
      }
    });
  };

  const totalHoursToday = () => {
    const hours = [];
    data.forEach(x => {
      if (x.startUnix > today) {
        console.log("Started Date, last seven days:::", x.startUnix, lastsevendays)
        hours.push(x.totalTimeUnix);
        let sumhours = hours.reduce((a, b) => a + b, 0);
        console.log('My total hours in day', secondsToTime(sumhours));
        console.log('My 24 hours array', hours);
      }
    });
  }

  const callme = async () => {
    await random(500).catch(e => console.log("errorrr",e));
  };

  return (
    <View
      style={{
        width: wp(100),
        height: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Button title="Do it" color="#241180" onPress={() => callme()} />

      <Button
        title="OneWeek"
        color="#241"
        onPress={() => {
          totalHoursWeek();
        }}
      />
      <Button
        title="24hrs"
        color="#241000"
        onPress={() => {
          totalHoursToday();
        }}
      /> */}
{/* <CustomButton bcolor='#c3e0de' title='Do It' function ='callme()'/>
<CustomButton bcolor='#7f6fa6'  title="OneWeek" function ='totalHoursWeek()'/>
<CustomButton bcolor='#a0ab0f'  title="24hrs" function ='totalHoursToday'/> */}
      
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

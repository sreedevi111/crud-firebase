import React, { useState }  from 'react'
import { View, Button, Text } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import firestore from '@react-native-firebase/firestore';
import toast from 'react-native-simple-toast'
const App = () => {
    const [paymentamount, set_paymentamount] = useState(100)

    const payNow = async () => {
        var orderIDSnap = await firestore().collection('payment').add({ pending: true, })
        console.log('orderIDSnap',orderIDSnap.id)

        var apiKey = 'rzp_test_LOLkRnFxk4GUln' //replace your live key here
        if(__DEV__){
          apiKey = 'rzp_test_LOLkRnFxk4GUln'
        }

        var options = {
         description: 'Salimo Office Chair 13123211',
         image: 'https://i.imgur.com/3g7nmJC.png',
         currency: 'INR',
         key: 'rzp_test_LOLkRnFxk4GUln', // Your api key
         amount: '5000', //50 INR
         name: 'Salimo Office Chair 13123211',
         prefill: {
           email: 'sreedevi@gmail.com',
           contact: '8006000063',
           name: 'Sree'
         },
         theme: {color: '#F37254'}
       }

     RazorpayCheckout.open(options).then((data) => {
       console.log('data after payment',data)
       // handle success
       alert(`Success: ${data.razorpay_payment_id}`);
       toast.show('Payment done')
       firestore().collection('payment').doc(orderIDSnap.id).update({ pending: false, paymentID: data.razorpay_payment_id, extradata: data })

     }).catch((error) => {
       // handle failure
       console.log("My error:::::", error)
       toast.show(`Error: ${error.code} | ${error.description}`);
     });

    }

    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>


          <Button onPress={payNow} title="Pay" />

      </View>
    )

}

export default App


import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export  default  function App() {

   const [result, setResult] = useState('');
   
   const [value1, setValue1] = useState('');
   
   const [value2, setvalue2] = useState('');

   const [cotacao, setCotacao] = useState('');
   const [cotacao1, setCotacao1] = useState('');

  

   function converter(num:string){

      if(num.includes(',')){
        
        return num.replace(',','.')
      }
      return num

     


   }

   function converterInverte(num:string){

    if(num.includes('.')){
      
      return num.replace('.',',')
    }
    return num

   


 }

   function sum(){
        let a = (converter(value1))
        let b = (converter(value2))
      
        let resultSum = Number(a) * Number(b);
        setResult('R$: '+ converterInverte(resultSum.toFixed(1))+'0')
        
      
      
  
   }
   

   useEffect(()=>{
    if(cotacao == ''){
      fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
      .then((response)=> response.json())
      .then((json)=>{
         (setvalue2(String(Number(json.USDBRL.ask))))
          setCotacao1(String(Number(json.USDBRL.ask)))
        })
      .then(()=>{setCotacao(value2)})
      .catch(()=>{'0'})
   
  
     }
   
    

   },)




   if(cotacao == ''){

    return (
      <View style={styles.container}>
       
       <Text style={styles.title}>Conversor de moeda</Text>
       

       <Text>Quantidade em dólar</Text>
       <TextInput style={styles.input} keyboardType='number-pad' onChangeText={setValue1}></TextInput>
       <Text>Cotação do dólar</Text>
       <TextInput style={styles.input} keyboardType='number-pad' onChangeText={setvalue2}></TextInput>
 
       <TouchableOpacity style={styles.button} onPress={sum}>
           <Text style={styles.textButton}>Calcular</Text>
       </TouchableOpacity>
 
       <Text style={styles.result}>{result}</Text>
       <Text>{cotacao == ''? "Sem acesso a internet": value2 }</Text>
       <Text>" economia.awesomeapi.com.br/last/USD-BRL"</Text>
       <StatusBar style="auto" />
     </View>
   )

   }

      return (
     <View style={styles.container}>
      
      <Text style={styles.title}>Conversor de moeda</Text>
     
      <Text></Text>
      <Text>Quantidade em dólar</Text>
      <TextInput style={styles.input} keyboardType='number-pad' onChangeText={setValue1}></TextInput>
      <Text>Cotação do dólar</Text>
      <TextInput style={styles.input} keyboardType='number-pad' onChangeText={setvalue2}  defaultValue={Number(cotacao).toFixed(2)}></TextInput>

      <TouchableOpacity style={styles.button} onPress={sum}>
          <Text style={styles.textButton}>Calcular</Text>
      </TouchableOpacity>

      <Text style={styles.result}>{result}</Text>
      <Text>{cotacao == ''? "Sem acesso a internet": "Cotação Atual: "+"R$: " +Number(cotacao1).toFixed(2) }</Text>
      <Text> economia.awesomeapi.com.br</Text>
      <StatusBar style="auto" />
    </View>
  )
   
   
 


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input:{
    width:250,
    height:40,
    borderRadius:10,
    backgroundColor:'#ddd',
    marginTop:20,
    marginBottom:20,
    textAlign:'center'
  },
  title:{
    fontSize:22,
    marginBottom:22,
    padding:10,
  

  },
  button:{
    backgroundColor:'#ccc',
    padding:20,
    borderRadius:8,

  },
  textButton:{
    color:'#444'

  },

  result:{
   
    marginTop:30,
    fontSize:22
  }
});

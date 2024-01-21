import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import useStorage from '../../hooks/useStorage';

import { PasswordItem } from './components/passwordItem'

export function Passwords(){
  const [listPasswords, setListPasswords] = useState([])

  const focused = useIsFocused();
  const {getItem, removeItem} = useStorage();

  useEffect(() =>{
    async function loadPasswords() {
      const passwords = await getItem("@pass")
      console.log(passwords);
      setListPasswords( passwords );
    }
    
    loadPasswords();
  },[focused])

  async function handleDeletePassword(item){
    alert('A senha: ' + item + ' foi deletada');
    const password = await removeItem("@pass", item)
    setListPasswords( password );
  }



  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
      <Text style={styles.title}>Minhas senhas</Text>
      </View>
      <View style={styles.content}>
        <FlatList style={{flex: 1, paddingTop: 15}}
        data={listPasswords}
        keyExtractor={(item) => String(item)}
        renderItem={({item}) =><PasswordItem data={item} removePassword={()=> handleDeletePassword(item)}/> }
        />
      </View>
      
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: '#392DE9',
    paddingTop: 50,
    paddingBottom:15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title:{
    fontSize:18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  content:{
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,


  },
  
})
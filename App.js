import React,{useState} from "react";
import { View, Text,map, StyleSheet,KeyboardAvoidingView,TextInput,TouchableOpacity, Keyboard, Alert } from "react-native";
import Task from "./components/Task";

export default function App() {
  const[task,setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = ()=>{
    if(task == ''){
      alert("Boş Girilemez");
      return false;
    }
    Keyboard.dismiss();
    setTaskItems([...taskItems,task])
    setTask(null);
  }
  const completeTask = (index) =>{
    Alert.alert(
      "Emin misin?",
      "İş tamamlanacak.",
      [
        {
          text:"Kapat",
          onPress:() => Alert.alert("kapatıldı"),
          style: "cancel"
        },
        {
           text: "İşi Tamamla", onPress: () => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
            Alert.alert("İş tamamlandı");
           }
        }
      ]
    );
  }
  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Bu Gün Ne Yapacam</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index)=>{
              return(
                <TouchableOpacity key={index} onPress={() =>completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Bir İş Ekle'} placeholderTextColor="#000" value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={()=> handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>  
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#E8EAED'
  },
  taskWrapper:{
    marginTop: 80,
    marginHorizontal:20
  },
  sectionTitle:{
    color:"black",
    fontSize:24,
    fontWeight: "bold"
  },
  items:{
    marginTop:30,
  },
  writeTaskWrapper:{
    position: "absolute",
    bottom:60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:"#FFFF",
    borderRadius:60,
    borderColor:"#C0C0C0",
    borderWidth:1,
    width:250,
    color:"black",
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:"#FFF",
    borderRadius:60,
    justifyContent:"center",
    alignItems:"center",
    borderColor:"#C0C0C0",
    borderWidth:1,
  
  },
  addText:{
    color:"#000",
  },
});


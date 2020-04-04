import * as firebase from 'firebase';
import '@firebase/firestore';
import { Alert ,AsyncStorage} from 'react-native';
import { createPortal } from 'react-dom';


const config = {
  apiKey: "AIzaSyBr8LGOcF3-in3teSIEHL3lqE5v6exSxcM",
  authDomain: "seproject-8401e.firebaseapp.com",
  databaseURL: "https://seproject-8401e.firebaseio.com",
  projectId: "seproject-8401e",
  storageBucket: "seproject-8401e.appspot.com",
  messagingSenderId: "227320017183",
  appId: "1:227320017183:web:200a09a37ebc74a3b3c02a"
};

class Database{

  constructor() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
          console.log("firebase apps initializeApp");
    } else {
        console.log("firebase apps already running...");
    }
  }

  getAccount=async()=>{
    firebase.firestore().collection('Account').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
  }


  async readOnce(id,read_Account_success,read_Account_fail)
  {
    let getDoc = firebase.firestore().collection("score").doc("score").get().then(doc=>{
      if(doc.exists)
      {
        read_Account_success(doc.data());
      }else {
        read_Account_fail();
      }
    }).catch(read_Account_fail());
  }



  async readdata(id,read_Account_success,read_Account_fail)
  {

    let getDoc = firebase.firestore().collection("Account").doc(id).get().then(doc=>{
      if(doc.exists)
      {
        read_Account_success(doc.data());
      }else {
        read_Account_fail();
      }
    }).catch(read_Account_fail());
  }



  async readAll(read_Account_success,read_Account_fail)
  {
    let getDoc = firebase.firestore().collection("Account").get().then(
      snapshot => {
        if (snapshot.empty) {
          read_Account_fail();
          return;
        }

        snapshot.forEach(doc => {
          read_Account_success(doc.data());
        })

      }).catch(read_Account_fail());
  }

  async readListening(read_Account_success,read_Account_fail)
  {
    let getDoc = firebase.firestore().collection("score").onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          read_Account_fail();
          return;
        }

        snapshot.forEach(doc => {
          read_Account_success(doc.data());
        })

      }).catch(read_Account_fail());
  }

  async deleteAccount(id,delete_Account_success,delete_Account_fail)
  {
    try {
        firebase.firestore().collection('Account').doc(id).delete();
        delete_Account_success();
    } catch (e) {
        delete_Account_fail();
    }
  }

  async updateAccount(account,update_Account_success,update_Account_fail)
  {
    try {
        firebase.firestore().collection('score').doc('score').update(account);
        update_Account_success();
    } catch (e) {
        update_Account_fail();
    }
  }

  

  async createAccount(Account,add_Account_success,add_Account_fail)
  {
    firebase.firestore().collection("Account").add(Account).then(ref=>{add_Account_success(ref.id)},add_Account_fail);
  }

  async createAccount2(Account,add_Account_success,add_Account_fail)
  {
    //set ชื่อ doc
    try {
      await firebase.firestore().collection("Account").doc(Account.email).set(Account)
      add_Account_success();
    } catch (e) {
      add_Account_fail();
    } finally {

    }

  }
  async updateName(id,Name,add_Account_success,add_Account_fail)
  {
    //set ชื่อ doc
    try {
      await firebase.firestore().collection("Account").doc(id).update({name:Name})
      add_Account_success();
    } catch (e) {
      add_Account_fail();
    } finally {

    }

  }

  async addImage(id,url,add_Account_success,add_Account_fail)
  {
    //set ชื่อ doc
    try {
      console.log("ADDDDDDDDDDDDDDDDDDDD")
      
      await firebase.firestore().collection("Account").doc(id).update({uri:url})
      add_Account_success();
    } catch (e) {
      add_Account_fail();
    } finally {

    }

  }

  async addImageGroup(id,url,add_Account_success,add_Account_fail)
  {
    //set ชื่อ doc
    
    try {
      console.log("ADDDDDDDDDDDDDDDDDDDD")
      let IMG={
        url:url
      }
      
      await firebase.firestore().collection("Group").doc(id).update({uri:url})
      add_Account_success();
    } catch (e) {
      add_Account_fail();
    } finally {

    }

  }


///////////
  async addMessage(message,add_Message_success,add_Message_fail)
  {
    firebase.firestore().collection("Message").add(message).then(ref=>{add_Message_success(ref.id)},add_Message_fail);
  }

  async readMessageListening(read_Message_success,read_Message_fail)
  {
    let getDoc = firebase.firestore().collection("Message").orderBy("time").onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          read_Message_fail();
          return;
        }

        snapshot.forEach(doc => {
          read_Message_success(doc.data());
        })

      }).catch(read_Message_fail());
  }

  ///////////////////////////

  async createAut(account,createAut_success,createAut_fail)
  {
    await firebase.auth().createUserWithEmailAndPassword(account.email,account.password)
    .then(()=>{
      createAut_success();

    })
    .catch(function(error){
      createAut_fail(error);
    });

  }

  login = async(account, success_callback, failed_callback) => {
    firebase.auth().signInWithEmailAndPassword(account.email,account.password)
    .then(()=>{
      success_callback();
    })
    .catch(function (error) {
      failed_callback(error.message);

    });
  }

  AutoLogin=async (email,password,success_callback, failed_callback) => {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
      success_callback();
    })
    .catch(function (error) {
      failed_callback(error.message);

    });
  }

 
  async createGroup(AdminGroup,data,group,add_Success,add_Fail){
    let array=[]
    console.log(AdminGroup)
    console.log("GHHGFFFFFFFFFFFFFFFFF")
    let Name ={
      email:AdminGroup.AdminGroup,
      id:group,
      uri:''
    }
    await firebase.firestore().collection("Group").get().then(async snapshot=>{
      if(snapshot.emtry)
      {
        console.log("ReadFail")
        add_Fail();
        return;
      }
     

      let state =0;
      await firebase.firestore().collection("Account").doc(AdminGroup.AdminGroup).get().then(data=>{
        if(data.emtry)
      {
        console.log("ReadFail")
        add_Fail();
        return;
      }
      if(data.data().uri===""){
        state=111;
      }
      })
      snapshot.forEach(async doc=>{
        console.log("Read")
        array.push(doc.id)
        console.log(doc.id)
        // array.push(Object.values(doc.data()))
        // array.push(doc.data())
        // read_Message_success(doc.data())
        if (doc.id == group && state != 111){
          state=1
        }
        
        
        })
        if (state ==0){
          firebase.firestore().collection("Group").doc(group).set(AdminGroup).then(async()=>{
            await firebase.firestore().collection("Group").doc(group).collection("user").doc(AdminGroup.AdminGroup).set(data)
            await firebase.firestore().collection("Account").doc(AdminGroup.AdminGroup).collection("Group").doc(group).set(Name)
            await add_Success()
          },add_Fail());
        }
        if (state==111){
          
          Alert.alert("Upload your profile before create a new group")
          add_Fail()
        
      }
      if(state==1){
        Alert.alert("Already have this group")
        add_Fail()
      }

    })}
    // await firebase.firestore().collection("Group").doc(group).set(AdminGroup).then(async ()=>{
    //   await firebase.firestore().collection("Group").doc(group).collection("user").doc(AdminGroup.AdminGroup).set(AdminGroup)
    // },add_Fail());
    

  // async createGroupUser(user,group,add_Success,add_Fail){
  //   await firebase.firestore().collection("Group").doc(group).collection("user").doc(user).set(user).then(()=>{
  //     add_Success()
  //   },add_Fail);
  // }
  async readMyGroup(user,read_suc,read_fail){
    await firebase.firestore().collection("Account").doc(user).collection("Group").get().then(snapshot=>{
      if(snapshot.empty){
        console.log("ReadFail")
        read_fail();
        return;
      }
      let array=[]
      snapshot.forEach(async doc=>{
        array.push(doc.data())
        console.log(doc.id)
      })
      read_suc(array)

    })
    .catch(read_fail())
  }

  async readImgGroup(name,id,read_Success,read_Fail){
    console.log("SDASDasdsaasdasdasdasdasdasdadasda")
    await firebase.firestore().collection("Group").get().then(snapshot=>{
      if(snapshot.empty){
        console.log("readFail")
        read_Fail()
        return;
      }
      
      snapshot.forEach(async doc=>{
    
        console.log(doc.data().uri)
        if (doc.id==name){
        await firebase.firestore().collection("Account").doc(id).collection("Group").doc(name).update({admin:doc.data().AdminGroup})
        await firebase.firestore().collection("Account").doc(id).collection("Group").doc(name).update({uri:doc.data().uri}).then(()=>{
          console.log("ADD URI")
        })
        }
      })
     

    })
  }
  
 
  async addGroupMessage(group,Message,add_Message_success,add_Message_fail){
    await firebase.firestore().collection("Group").doc(group).collection("Task").add(Message).then(async ref=>{
      await firebase.firestore().collection("Group").doc(group).collection("Task").doc(ref.id).update({id:ref.id})
      add_Message_success()
      },add_Message_fail)
  }
  async CountTask(group,read_Success,read_fail){
    let size;
    
    await firebase.firestore().collection("Group").doc(group).collection("Task").get().then(snap => {
      size = snap.size 
      console.log("HEREEEEE")
      console.log(size)
      read_Success(size)
   },read_fail());
  }
  async CountToComplete(group,read_Success,read_fail){
    let size;
    
    await firebase.firestore().collection("Group").doc(group).collection("Task").where('status','==','1').get().then(snap => {
      size = snap.size 
      console.log("HEREEEEE")
      console.log(size)
      read_Success(size)
   },read_fail());
  }

  async UpdateMessageGroup(Group,Message,add_Message_success,add_Message_fail){
    await firebase.firestore().collection("Group").doc(Group).collection("Task").doc(Message.id).update(Message).then(ref=>{add_Message_success()},add_Message_fail)
}
  async CountComplete(group,read_Success,read_fail){
    let size;
    
    await firebase.firestore().collection("Group").doc(group).collection("Task").where('status','==','0').get().then(snap => {
      size = snap.size 
      console.log("HEREEEEE")
      console.log(size)
      read_Success(size)
   },read_fail());
  }

  async readMessageGroup(group,read_Message_success,read_Message_fail){
    let array=[]
    let query= await firebase.firestore().collection("Group").doc(group).collection("Task").where('status','==','1').orderBy('time');
    query.get().then(snapshot=>{
      if(snapshot.emtry)
      {

        read_Message_fail();
        return;
      }
      snapshot.forEach(doc=>{
        // console.log(doc.data())
        // array.push(Object.values(doc.data()))
        array.push(doc.data())
        // read_Message_success(doc.data())
        
        })
        read_Message_success(array)
    })
    .catch(read_Message_fail());

  

 }
 async readGroupDetail(group,read_suc,read_fail){
   await firebase.firestore().collection("Group").doc(group).get().then(async doc=>{
    console.log(doc.data())
 
    read_suc(doc.data())
   })

 }

  
  async joinGroup(name,id,add_Success,add_Fail){
    console.log(name)
    let array=[]
    let Name={
      email:name.email,
      id:id,
      uri:'',
      admin:''
    }
    await firebase.firestore().collection("Group").get().then(async snapshot=>{
      if(snapshot.emtry)
      {
        console.log("ReadFail")
        add_Fail();
        return;
      }
      let state =0;
      await firebase.firestore().collection("Account").doc(name.email).get().then(data=>{
        if(data.emtry)
      {
        console.log("ReadFail")
        add_Fail();
        return;
      }
      if(data.data().uri===""){
        state=111;
      }
      })
      snapshot.forEach(async doc=>{
        console.log("Read")
        array.push(doc.id)
        console.log(doc.id)
        // array.push(Object.values(doc.data()))
        // array.push(doc.data())
        // read_Message_success(doc.data())

        if(doc.id == id && state != 111){
          state=1;
          await firebase.firestore().collection("Group").doc(id).collection("user").doc(name.email).set(name).then(async ()=>{
            console.log("HERE")
            console.log(id)
            
            await firebase.firestore().collection("Account").doc(name.email).collection("Group").doc(id).set(Name)
            await firebase.firestore().collection("Account").doc(name.email).collection("Group").doc(id).update({admin:doc.data().AdminGroup})
            await firebase.firestore().collection("Account").doc(name.email).collection("Group").doc(id).update({uri:doc.data().uri}).then(()=>{
              add_Success()
            },add_Fail())
            
            },add_Fail());

        }
        
        
        
        })
        if (state==0){
          
            Alert.alert("don't have this Group")
            add_Success() 
          
        }
        if (state==111){
          
          Alert.alert("ใส่รูปก่อนจะเข้ากลุ่มนะครับ")
          add_Success() 
        
      }

      
   
      
    })
    .catch(add_Fail());
    // await firebase.firestore().collection("Group").doc(id).collection("user").doc(name.email).set(name).then(()=>{
    //   add_Success()
    // },add_Fail());
  }

  async addGroupUser(name,id,add_Success,add_Fail){
    await firebase.firestore().collection("Group").doc(id).collection("user").doc(name.email).set(name).then(()=>{
      add_Success()
    },add_Fail());
  }

  async addGroupAccount(name,id,add_Success,add_Fail){
    console.log(name)
    await firebase.firestore().collection("Account").doc(name.email).collection("Group").doc(id).set(name).then(()=>{
      add_Success()
    },add_Fail());
  }
  async readGroup(id,email,add_Success,add_Fail){
    // await firebase.firestore().collection("Group").
  }

  async uploadImage(id,uri, success_callback, fail_callback,uploading_callback)
  {
    const response =await fetch(uri);
    const blob =await response.blob();

    var uploadTask=firebase.storage().ref('avatar').child(id).put(blob);

        uploadTask.on('state_changed', function(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      uploading_callback(progress)

    }, function(error) {
      fail_callback(error.message);
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      success_callback(downloadURL);
        //console.log('File available at', downloadURL);
      });
    });
  }
  async uploadImageGroup(id,uri, success_callback, fail_callback,uploading_callback)
  {
    const response =await fetch(uri);
    const blob =await response.blob();

    var uploadTask=firebase.storage().ref('Group').child(id).put(blob);

        uploadTask.on('state_changed', function(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      uploading_callback(progress)

    }, function(error) {
      fail_callback(error.message);
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      success_callback(downloadURL);
        //console.log('File available at', downloadURL);
      });
    });
  }
  async readIMGUserGroup(id,read_Success,read_Fail){
    let array=[]
    await firebase.firestore().collection("Group").doc(id).collection("user").get().then(snapshot=>{
      if(snapshot.empty){
        read_Fail()
        return;
      }
      snapshot.forEach(async doc=>{
        // console.log(doc.data())
        // array.push(Object.values(doc.data()))
        await firebase.firestore().collection("Account").doc(doc.id).get().then(data=>{
          array.push(data.data())
        })
     
        // read_Message_success(doc.data())
        
        })
        read_Success(array)
    })
    .catch(read_Fail());
  }

  async updateStatus(ID,Group,addSuccess,addFail){
    try{
    await firebase.firestore().collection("Group").doc(Group).collection("Task").doc(ID).update({status:'0'})
      addSuccess();
    }
    catch(e){
      addFail()
      
    }
  } 
  async LeaveGroup(group,email,del_S,del_F){
    await firebase.firestore().collection("Group").doc(group).collection("user").doc(email).delete()
    await firebase.firestore().collection("Account").doc(email).collection("Group").doc(group).delete().then(()=>{
      del_S()
    },del_F())
    

  }

  async updateID(ID,User,addSuccess,addFail){
    try{
      console.log(ID)
    await firebase.firestore().collection("Group").doc(User).collection("Task").doc(ID).update({id:ID})
      addSuccess();
    }
    catch(e){
      addFail(e)
      
    }
  }

}

////////////////

const database = new Database();
export default database;

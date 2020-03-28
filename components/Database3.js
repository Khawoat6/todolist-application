import * as firebase from 'firebase';
import '@firebase/firestore';
import { Use } from 'react-native-svg';

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
  async CountTask(email,Date,read_Success,read_fail){
    let size;
    
    await firebase.firestore().collection("Todo").doc(email).collection("Today").where('Date','==',Date).get().then(snap => {
      size = snap.size 
      console.log("HEREEEEE")
      console.log(size)
      read_Success(size)
   },read_fail());
  }
  async CountToComplete(email,Date,read_Success,read_fail){
    let size;
    
    await firebase.firestore().collection("Todo").doc(email).collection("Today").where('status','==','1').where('Date','==',Date).get().then(snap => {
      size = snap.size 
      console.log("HEREEEEE")
      console.log(size)
      read_Success(size)
   },read_fail());
  }
  async CountComplete(email,Date,read_Success,read_fail){
    let size;
    
    await firebase.firestore().collection("Todo").doc(email).collection("Today").where('status','==','0').where('Date','==',Date).get().then(snap => {
      size = snap.size 
      console.log("HEREEEEE")
      console.log(size)
      read_Success(size)
   },read_fail());
  }
  async addMessageToday(User,Message,add_Message_success,add_Message_fail){
      await firebase.firestore().collection("Todo").doc(User).collection("Today").add(Message).then(ref=>{add_Message_success(ref.id)},add_Message_fail)
  }

  async UpdateMessageToday(User,Message,add_Message_success,add_Message_fail){
    await firebase.firestore().collection("Todo").doc(User).collection("Today").doc(Message.id).update(Message).then(ref=>{add_Message_success()},add_Message_fail)
}
async readStatus(User, success_callback, fail_callback){
  firebase.firestore().collection("Todo").doc(User).collection("Today").get().then(snapshot=>{
    var objMenu = [];
    var success = 0;
    if(snapshot.emtry)
    {
      fail_callback();
      return;
    }
    snapshot.forEach(doc => {
      objMenu.push(doc.data());
      if (doc.get("status") == 0) success += 1
    });
    success_callback(objMenu, objMenu.length, success);
  });
}

 async readPiority(User,priority_callback,read_Message_fail){
  firebase.firestore().collection("Todo").doc(User).collection("Today").get().then(snapshot=>{
    var objPriority=[];
    var priority0=0;
    var priority1=0;
    var priority2=0;
    var priority3=0;
    if(snapshot.emtry)
    {

      read_Message_fail();
      return;
    }
    snapshot.forEach(doc=>{
      objPriority.push(doc.data());
      if (doc.get("Priority") == 0) priority0 += 1
      if (doc.get("Priority") == 1) priority1 += 1
      if (doc.get("Priority") == 2) priority2 += 1
      if (doc.get("Priority") == 3) priority3 += 1
    });
      
    priority_callback(objPriority,objPriority.length,priority0,priority1,priority2,priority3);
  });
}

async readNote(User,read_Success,read_fail){
  let array=[]
  await firebase.firestore().collection("Todo").doc(User).collection("Note").orderBy('ServerTime',"desc").get().then(snap=>{
    if(snap.empty){
      read_fail()
      return;
    }
    snap.forEach(doc=>{
      array.push(doc.data())
    })
    read_Success(array)
  })
  .catch(read_fail());

}
  async addNote(User,Message,add_Message_success,add_Message_fail){
    console.log(User)
    await firebase.firestore().collection("Todo").doc(User).collection("Note").add(Message).then(async ref=>{
      await firebase.firestore().collection("Todo").doc(User).collection("Note").doc(ref.id).update({id:ref.id})
      add_Message_success()
      },add_Message_fail)
}

async UpdateNote(User,Message,add_Message_success,add_Message_fail){
  console.log(User)
  await firebase.firestore().collection("Todo").doc(User).collection("Note").doc(Message.id).update(Message).then(()=>{
    
    add_Message_success()
    },add_Message_fail)
}

async DelNote(User,id,del_Message_success,del_Message_fail){
  console.log(User)
  console.log(id)
  try {
    await firebase.firestore().collection('Todo').doc(User).collection("Note").doc(id).delete();
    del_Message_success();
} catch (e) {
    del_Message_fail();
}
}
  async updateID(ID,User,addSuccess,addFail){
    try{
    await firebase.firestore().collection("Todo").doc(User).collection("Today").doc(ID).update({id:ID})
      addSuccess();
    }
    catch(e){
      addFail()
      
    }
  }
  async updateStatus(ID,User,color,addSuccess,addFail){
    try{
    await firebase.firestore().collection("Todo").doc(User).collection("Today").doc(ID).update({status:'0'})
    await firebase.firestore().collection("Todo").doc(User).collection("Today").doc(ID).update({Color:color})
      addSuccess();
    }
    catch(e){
      addFail()
      
    }
  }
  async deleteTask(User,id,delete_Account_success,delete_Account_fail)
  {
    try {
        await firebase.firestore().collection('Todo').doc(User).collection("Today").doc(id).delete();
        delete_Account_success();
    } catch (e) {
        delete_Account_fail();
    }
  }
  async readMessage(User,Date,read_Message_success,read_Message_fail){
    let array=[]
    let query= await firebase.firestore().collection("Todo").doc(User).collection("Today").where('Date','==',Date).where('status','==','1').orderBy('Priority',"desc");
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

 async readSomeday(User,Date,Tomorrow,Upcoming,read_Message_success,read_Message_fail){
   console.log(Date+Tomorrow+Upcoming)
  let array=[]
  let query= await firebase.firestore().collection("Todo").doc(User).collection("Today").where('status','==','1').orderBy('time');
  query.get().then(snapshot=>{
    if(snapshot.emtry)
    {

      read_Message_fail();
      return;
    }
     snapshot.forEach(doc=>{
      var tmp =doc.data().Date
      
      console.log(typeof(Tomorrow))
      console.log("ForEACH"+Date+Tomorrow)
       console.log(doc.data().Date)
       if(tmp==Date ){
        console.log("DATEE")
        // array.push(doc.data())
       }

       else if(tmp==Upcoming) {
        console.log("UPCOME")
        // array.push(doc.data())
       }
       else if(tmp==Tomorrow ){
        console.log("TOMORROW")
        // array.push(doc.data())
       }
       else{
        array.push(doc.data())
       }
      
      
      // array.push(Object.values(doc.data()))

    
      // read_Message_success(doc.data())
      
      })
      read_Message_success(array)
  })
  .catch(read_Message_fail());



}
async CountSomeday(User,Date,Tomorrow,Upcoming,read_Message_success,read_Message_fail){
  console.log(Date+Tomorrow+Upcoming)
 let array=[]
 let query= await firebase.firestore().collection("Todo").doc(User).collection("Today").where('status','==','1').orderBy('time');
 query.get().then(snapshot=>{
   if(snapshot.emtry)
   {

     read_Message_fail();
     return;
   }
    snapshot.forEach(doc=>{
     var tmp =doc.data().Date
     
     console.log(typeof(Tomorrow))
     console.log("ForEACH"+Date+Tomorrow)
      console.log(doc.data().Date)
      if(tmp==Date ){
       console.log("DATEE")
       // array.push(doc.data())
      }

      else if(tmp==Upcoming) {
       console.log("UPCOME")
       // array.push(doc.data())
      }
      else if(tmp==Tomorrow ){
       console.log("TOMORROW")
       // array.push(doc.data())
      }
      else{
       array.push(doc.data())
      }
     
     
     // array.push(Object.values(doc.data()))

   
     // read_Message_success(doc.data())
     
     })
     read_Message_success(array.length)
 })
 .catch(read_Message_fail());



}


 async readCompleted(User,Date,read_Message_success,read_Message_fail){
  let array=[]
  let query= await firebase.firestore().collection("Todo").doc(User).collection("Today").where('status','==','0').orderBy('time');
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

async createGroup(user,group,add_Success,add_Fail){
  firebase.firestore().collection("Group").doc(group).collection("user").doc(user).then(()=>{
    add_Success()
  },add_Fail);
}


//   async addMessage(message,add_Message_success,add_Message_fail)
//    {
//     firebase.firestore().collection("Todo").doc(message).then(ref=>{add_Message_success(ref.id)},add_Message_fail);
//    }

//   async readOnce(id,read_Account_success,read_Account_fail)
//   {
//     let getDoc = firebase.firestore().collection("score").doc("score").get().then(doc=>{
//       if(doc.exists)
//       {
//         read_Account_success(doc.data());
//       }else {
//         read_Account_fail();
//       }
//     }).catch(read_Account_fail());
//   }



//   async readdata(id,read_Account_success,read_Account_fail)
//   {

//     let getDoc = firebase.firestore().collection("Account").doc(id).get().then(doc=>{
//       if(doc.exists)
//       {
//         read_Account_success(doc.data());
//       }else {
//         read_Account_fail();
//       }
//     }).catch(read_Account_fail());
//   }



//   async readAll(read_Account_success,read_Account_fail)
//   {
//     let getDoc = firebase.firestore().collection("Account").get().then(
//       snapshot => {
//         if (snapshot.empty) {
//           read_Account_fail();
//           return;
//         }

//         snapshot.forEach(doc => {
//           read_Account_success(doc.data());
//         })

//       }).catch(read_Account_fail());
//   }

//   async readListening(read_Account_success,read_Account_fail)
//   {
//     let getDoc = firebase.firestore().collection("score").onSnapshot(
//       snapshot => {
//         if (snapshot.empty) {
//           read_Account_fail();
//           return;
//         }

//         snapshot.forEach(doc => {
//           read_Account_success(doc.data());
//         })

//       }).catch(read_Account_fail());
//   }

//   async deleteAccount(id,delete_Account_success,delete_Account_fail)
//   {
//     try {
//         firebase.firestore().collection('Account').doc(id).delete();
//         delete_Account_success();
//     } catch (e) {
//         delete_Account_fail();
//     }
//   }

//   async updateAccount(account,update_Account_success,update_Account_fail)
//   {
//     try {
//         firebase.firestore().collection('score').doc('score').update(account);
//         update_Account_success();
//     } catch (e) {
//         update_Account_fail();
//     }
//   }



//   async createAccount(Account,add_Account_success,add_Account_fail)
//   {
//     firebase.firestore().collection("Account").add(Account).then(ref=>{add_Account_success(ref.id)},add_Account_fail);
//   }

//   async createAccount2(Account,add_Account_success,add_Account_fail)
//   {
//     //set ชื่อ doc
//     try {
//       await firebase.firestore().collection("Account").doc(Account.email).set(Account)
//       add_Account_success();
//     } catch (e) {
//       add_Account_fail();
//     } finally {

//     }

//   }
//   async addImage(id,url,add_Account_success,add_Account_fail)
//   {
//     //set ชื่อ doc
//     try {
//       console.log("ADDDDDDDDDDDDDDDDDDDD")
      
//       await firebase.firestore().collection("Account").doc(id).update({uri:url})
//       add_Account_success();
//     } catch (e) {
//       add_Account_fail();
//     } finally {

//     }

//   }


// ///////////
//   async addMessage(message,add_Message_success,add_Message_fail)
//   {
//     firebase.firestore().collection("Message").add(message).then(ref=>{add_Message_success(ref.id)},add_Message_fail);
//   }

//   async readMessageListening(read_Message_success,read_Message_fail)
//   {
//     let getDoc = firebase.firestore().collection("Message").orderBy("time").onSnapshot(
//       snapshot => {
//         if (snapshot.empty) {
//           read_Message_fail();
//           return;
//         }

//         snapshot.forEach(doc => {
//           read_Message_success(doc.data());
//         })

//       }).catch(read_Message_fail());
//   }

  ///////////////////////////

 



}

////////////////

const database = new Database();
export default database;

      
 
    
    
    
     

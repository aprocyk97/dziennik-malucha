
import firebase from 'firebase'
import {db} from '../firebase';


export const fetchKindergardenUsers = async(currentKindergarden: string) => {
    
    const ref = db.collection('kindergardens').doc(currentKindergarden);

    return ref.get().then((doc) =>{
        if(doc.exists){
            return doc.data();
            
        } else {
            console.log('Cannot get data from server!')
        }
    }).catch(error => {
        console.log('Kindergarden Database error: ', error);
    })
    
};

export type Users = {
    power: string;
    uid: string;
}
        //TODO: FETCH USER NAME, SURNAME BASED ON UID AND MERGE IT WITH POWER
export const fetchUserList = async (kindergarden: string): Promise<Users[]> => {
    
    const ref = db.collection('kindergardens').doc(kindergarden);
    let userList : Users[] = [];
    const doc = await ref.get().then(doc => {
        if(doc.exists){
            return doc.data();
        }
    })
    userList = doc!.users;
    return userList;
}

export type KindergardenUser = {
    email: string;
    name: string;
    surname: string;
    kindergardens: any[];
    uid: string;
    power: string;
}
    //
export const fetchUserData = async (userList: Users[]): Promise<KindergardenUser[]> => {

    const ref = db.collection('users');
    let tempUserData = Array();
    let check = false;
    await ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            if(doc.exists){
                const data = doc.data();
                const uid = doc.id;
                tempUserData.push({uid, ...data})
            }
        })
    })
    const temp = tempUserData.filter(dataItem => {
        check = false;
        let userPower = '';
        userList.map(listItem =>{
            if(listItem.uid === dataItem.uid){
                check = true;
                userPower = listItem.power;
            }
        })
        
        if(check){
            let data= dataItem;
            data.power = userPower;
            return data;
        }
        
    })
    // return tempUserData;
    return temp;
}

export const removeKindergardenUser = async(uid: string, kindg: string): Promise<any> => {
    const ref = db.collection('kindergardens').doc(kindg);
    const userList: Users[] = await fetchUserList(kindg);
    const userObject =  userList.filter(item => {
        if(item.uid === uid){
            return item;
        }
    })
    try{
        ref.update({
            users: firebase.firestore.FieldValue.arrayRemove(userObject[0])
        });

    }catch(error){
        console.log('Error when deleting user', error);
    }
}

export type PageUser = {
    email: string;
    name: string;
    surname: string;
    kindergardens: any[];
    uid: string;
}

export const getUsers = async(): Promise<PageUser[]> => {
    const ref = db.collection('users');
    let tempUserData = Array();
    await ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            if(doc.exists){
                const data = doc.data();
                const uid = doc.id;
                tempUserData.push({uid, ...data})
            }
        })
    }).catch(error => {
        console.log('Error when fetching Users', error);
    })
    return tempUserData;
}

export const addKindergardenUser = async(email: string, userPower:string, kindg: string): Promise<any> => {
    const kindergardenRef = db.collection('kindergardens').doc(kindg);
    const usersL = await getUsers();
    let exist = false;
    
    const t = usersL.map(item => {
        if(item.email === email){
            exist = true;
            return item;
        }
    })
    

    if(exist){
        await kindergardenRef.update({
            users: firebase.firestore.FieldValue.arrayUnion({power: userPower , uid: t[0]?.uid})
        })
    }else{
        console.log('Current user does not exist in database');
    }
    


}
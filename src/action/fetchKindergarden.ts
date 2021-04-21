
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

export type UserData = {
    email: string;
    name: string;
    surname: string;
    power: string;
}
type tempUser = {
    email: string;
    name: string;
    surname: string;
    kindergardens: any[];
    uid: string;
    power: string;
}
    //
export const fetchUserData = async (userList: Users[]): Promise<any> => {

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
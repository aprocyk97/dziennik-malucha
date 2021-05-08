
import firebase from 'firebase'
import {db} from '../firebase';
import kindergardenReducers from '../reducers/kindergardenReducers';


export interface Users  {
    power: string;
    uid: string;
    groups: IKindergardenGroup[];
}

export type KindergardenUser = {
    email: string;
    name: string;
    surname: string;
    kindergardens: any[];
    uid: string;
    power: string;
}

export type PageUser = {
    email: string;
    name: string;
    surname: string;
    kindergardens: any[];
    uid: string;
}

export interface ISingleMeal {
    meal: string;
    amount: string;
    allergens: string[];
}

export interface IDayMeals {
    breakfast: ISingleMeal[];
    dinner: ISingleMeal[];
    teatime: ISingleMeal[];
    id: string;
}
export interface IDayMealsData {
    breakfast: ISingleMeal[];
    dinner: ISingleMeal[];
    teatime: ISingleMeal[];
}
export interface IKindergardenGroup {
    name: string;
    id: string;
}



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
    return temp;
}

    // TODO: ALSO SHOULD DELETE KINDERGARDEN RELATION IN PAGE USERS TAB
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

    // TODO: ALSO SHOULD ADD KINDERGARDEN RELATION IN PAGE USERS TAB
export const addKindergardenUser = async(email: string, userPower:string, kindg: string, kindgName: string): Promise<any> => {
    const kindergardenRef = db.collection('kindergardens').doc(kindg);
    const usersL = await getUsers();
    let exist = false;

    const t = usersL.filter(item => {
        if(item.email === email){
            exist = true;
            return item;
        }
    })

    if(exist){
        await kindergardenRef.update({
            users: firebase.firestore.FieldValue.arrayUnion({power: userPower , uid: t[0]?.uid})
        }).catch(error => {
            console.log('User add error:',error);
        })
        await db.collection('users').doc(t[0].uid).update({
            kindergardens: firebase.firestore.FieldValue.arrayUnion({id: kindg, name: kindgName})
        })
    }else{
        console.log('Current user does not exist in database');
    }
    
}

export const getMeals = async(kindergarden: string): Promise<IDayMeals[]> => {
    const ref = db.collection('kindergardens').doc(kindergarden).collection('data').doc('meals');
    let arr = Array();

    await ref.get().then((doc) => {
        if(doc.exists){

            Object.entries(doc.data()!).map(([id, value]) => {
                arr.push({id, ...value })
            })
        }
    }).catch(error => {
        console.log('Error occured when fetching meals', error);
    })

    return arr;
}

export const sendMeals = async(kindergarden: string, meals: IDayMealsData, id: string): Promise<any> => {
    const ref = db.collection('kindergardens').doc(kindergarden).collection('data').doc('meals');
    let dataObj = {};
    dataObj[id] = meals;
    console.log(dataObj);
    await ref.set(dataObj, {merge: true})
        .catch(error => {
            console.log('Error when sending meals to database: ', error);
        });
}

export const deleteUserKindergarden = async(uid: string, kindergarden: string, kindergardenName: string) : Promise<any> => {
    const ref = db.collection('users').doc(uid);
    await ref.update({
        kindergardens: firebase.firestore.FieldValue.arrayRemove({id: kindergarden, name: kindergardenName})
    }).catch(error => {
        console.log('Error when deleting users kindergardenReducers', error);
    })
}

export const addUserKindergarden = async() : Promise<any> => {

}

export const isAdmin = async(uid: string, kindergarden: string): Promise<any> => {
    const ref = db.collection('kindergardens').doc(kindergarden);

    let result: boolean = false;

    const obj = await ref.get().then(doc => {
        if(doc.exists){
            return doc.data();
        }else{
            console.log('Object doesnt exist');
            result = false;
        }
    }).catch(error => {
        console.log('Error when fetching data', error);
        result = false;
    })

    if( obj !== undefined){
        obj.users.map(item => {
            (item.uid === uid) ?
                item.power === 'admin' ? result = true : result = false
                :
                result = false
            
        })
    }
    return result;
    
}
export const issAdmin = async(uid:string, kindergarden: string): Promise<any> => {
    console.log(await fetchUserByUid(uid, kindergarden));
    const user = await fetchUserByUid(uid, kindergarden);
    return user.power === 'admin';

    
}


// TODO: CLEAN FETCHES !!!


export const fetchUserGroups = async(uid: string, kindergarden: string): Promise<IKindergardenGroup[]> => {
    let users = fetchUserList(kindergarden);

    const user = (await users).filter(item => item.uid === uid);
    return user[0]!.groups;

}
export const fetchUserByUid = async(uid: string, kindergarden: string): Promise<Users> => {
    const users = fetchUserList(kindergarden);

    const user = (await users).filter(item => item.uid === uid);
    return user[0];
}
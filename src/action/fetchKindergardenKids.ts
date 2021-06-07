import firebase from 'firebase'
import {db} from '../firebase';

export interface SingleKid {
    uid: string;
    name: string;
    birthDate: string;
    medicineList: string;
    alergies: string;
    additional: string;
}

export const getChildren = async(kindergarden: string): Promise<SingleKid[]> => {
    const ref = db.collection('kindergardens').doc(kindergarden);
    let childrenList: SingleKid[] = [];

    const doc = await ref.get().then(doc => {
        if(doc.exists){
            return doc.data();
        }
    })
    childrenList = doc!.children;
    return childrenList;
}

export const getUsersChildren = async(kindergarden: string, uid: string) => {
    const list = await getChildren(kindergarden);

    return list.filter(item => item.uid === uid);
}

export const updateUserChild = async(kindergarden: string, updateChild: SingleKid, deleteChild: SingleKid) => {
    const ref = db.collection('kindergardens').doc(kindergarden);
    if(deleteChild !== undefined){
        await ref.update({
            children: firebase.firestore.FieldValue.arrayRemove(deleteChild)
        }).catch(e=> console.log('Error when deleting children', e));
    }
    await ref.update({
        children: firebase.firestore.FieldValue.arrayUnion(updateChild)
    }).catch(e=>console.log('Error when adding children', e));

    



}

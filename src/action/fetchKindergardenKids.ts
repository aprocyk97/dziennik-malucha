import firebase from 'firebase'
import { db } from '../firebase';
import { getGroupUsers } from './fetchKindergardenGroups';

export interface SingleKid {
    uid: string;
    name: string;
    birthDate: string;
    medicineList: string;
    alergies: string;
    additional: string;
}

export const getChildren = async (kindergarden: string): Promise<SingleKid[]> => {
    const ref = db.collection('kindergardens').doc(kindergarden);
    let childrenList: SingleKid[] = [];

    const doc = await ref.get().then(doc => {
        if (doc.exists) {
            return doc.data();
        }
    })
    childrenList = doc!.children;
    return childrenList;
}

export const getUsersChildren = async (kindergarden: string, uid: string) => {
    const list = await getChildren(kindergarden);

    return list.filter(item => item.uid === uid);
}

export const updateUserChild = async (kindergarden: string, updateChild: SingleKid, deleteChild: SingleKid) => {
    const ref = db.collection('kindergardens').doc(kindergarden);
    if (deleteChild !== undefined) {
        await ref.update({
            children: firebase.firestore.FieldValue.arrayRemove(deleteChild)
        }).catch(e => console.log('Error when deleting children', e));
    }
    await ref.update({
        children: firebase.firestore.FieldValue.arrayUnion(updateChild)
    }).catch(e => console.log('Error when adding children', e));
}

export const getGroupsChildren = async (kindergarden: string, group: string): Promise<any[] | string> => {

    const groupUsers = await getGroupUsers(kindergarden, group);
    const kindergardenChildren = await getChildren(kindergarden);

    // If list of group's users doesn't exist it will send error message in string

    if (typeof groupUsers === 'string') {
        return groupUsers;
    } else {
        let childrenList: SingleKid[] = [];
        groupUsers.filter(user => {
            let children = kindergardenChildren.filter(child => (child.uid === user.uid));
            if(children.length > 0){
                childrenList.push(children[0]);
            }
        })
        return childrenList;
    }
}

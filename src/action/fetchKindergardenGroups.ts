import { db } from "../firebase";
import { IGroupUser } from "./fetchKindergarden";



export const getGroupUsers = async(kindergarden: string, group: string): Promise<IGroupUser[] | string> => {

    const ref = db.collection('kindergardens').doc(kindergarden).collection('groups').doc(group);

    const groupUsers = ref.get().then( doc => {
        if(doc.exists){
            return doc.data()!.users;
        }else{
            return [];
        }
    }).catch(error => {
        return error;
    })

    return groupUsers;
}


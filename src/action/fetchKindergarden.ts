
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

import { firebaseApp } from "./firebase.config";
import Rx from 'rxjs';


export const getDetails= ()=> {
  const itemsRef = firebaseApp.database().ref();
  return Rx.Observable.fromPromise (itemsRef.child('contacts').once('value').then(function(snapshot) {
    // The Promise was "fulfilled" (it succeeded).
    return snapshot.val();
  }, function(error) {
    // The Promise was rejected.
    console.error(error);
  }));
  
  
}

export const putDetails= (person)=> {
  return Rx.Observable.fromPromise (firebaseApp.database().ref('contacts/'+person.id ).set({
    id: person.id,
    name: person.name,
    gender: person.gender,
    phoneNumber: person.phoneNumber,
    bloodGroup: person.bloodGroup,
    dob: person.dob,
    weight: person.weight,
    district: person.district,
    address: person.address,
    lastDonationDate: person.lastDonationDate
  }).then(function(snapshot) {
    // The Promise was "fulfilled" (it succeeded).
    console.log(snapshot);
  }, function(error) {
    // The Promise was rejected.
    console.error(error);
  }));
  
  
}

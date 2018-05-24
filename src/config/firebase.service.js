import { firebaseApp } from "./firebase.config";
import * as firebase from 'firebase';
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
  return Rx.Observable.fromPromise (firebaseApp.database().ref('contacts/'+(person.id-1) ).set({
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

export const editDetails= (person)=> {
  return Rx.Observable.fromPromise (firebaseApp.database().ref('contacts/'+(person.id-1) ).set({
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

export const removeValue= (id)=> {
  return Rx.Observable.fromPromise (firebaseApp.database().ref('contacts/'+(id-1)).remove().then(function(snapshot) {
    // The Promise was "fulfilled" (it succeeded).
    console.log('deleted',snapshot);
  }, function(error) {
    // The Promise was rejected.
    console.error(error);
  }));
  
  
}

export const login = (email, password)=> {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password);
}
export const signOut = ()=> {
  console.log('innn');
  return firebaseApp.auth().signOut();
}

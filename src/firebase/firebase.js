import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  doc,
  getDoc,
  setDoc,
  query,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFW9cs1vety41d0pZXAP5LpW0DbHYH3DM",
  authDomain: "hi-er-dev.firebaseapp.com",
  projectId: "hi-er-dev",
  storageBucket: "hi-er-dev.appspot.com",
  messagingSenderId: "904810437038",
  appId: "1:904810437038:web:6e7b83e5cc6e1ce159103f",
  measurementId: "G-WNPGDVFZPB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

initializeApp(firebaseConfig);
let loginUser = "";

const company = collection(db, "company");

const opportunities = collection(db, "opportunities");
const skillsList = collection(db, "skills-list");
const users = collection(db, "users");

export const logOut = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("isAuthenticated");
    })
    .catch((error) => {
      console.log(error);
    });
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("AuthStateChanged", user);
    localStorage.setItem("isAuthenticated", uid);
    // ...
  } else {
    // User is signed out
    // ...
    localStorage.removeItem("isAuthenticated");
  }
});

export const login = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  const company = doc(db, "company", user.user.uid);
  const docSnap = await getDoc(company);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return {
      user: user.user,
      company: docSnap.data(),
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {
      user: user.user,
    };
  }
  // company.doc("XalGpn3gPB7RmtVs2ZeN").get()
  // .then(async snapshot => {
  //     const data = snapshot.data();
  //     console.log("This is the data: ",data);
  // });
  return user.user;
};
export const updateCompany = async (companyName, url) => {
  try {
    let uuid = localStorage.getItem("isAuthenticated");
    const company = doc(db, "company", uuid);
    const docSnap = await addDoc(company, {
      companyName: companyName,
      url: url,
      logo: "",
    });
    console.log(docSnap);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
export const insertOpportunity = async (
  jobTitle,
  address,
  maxSalary,
  skills,
  closeDate,
  description,
  url
) => {
  try {
    let uuid = localStorage.getItem("isAuthenticated");

    const company = doc(db, "company", uuid);
    const docSnap = await getDoc(company);

    if (docSnap.exists()) {
      const docSnap1 = await addDoc(opportunities, {
        jobTitle: jobTitle,
        address: address,
        maxSalary: maxSalary,
        skills: skills,
        closeDate: closeDate,
        longDescription: description,
        shortDescription: description,
        url: url,
        appliedUser: [],
        rejected: [],
        logo: "",
        companyName: docSnap.data().companyName,
        companyID: uuid,
      });
      console.log(docSnap1);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      window.alert("Password reset email has been sent to your email!");
    })
    .catch((e) => {
      console.log(e);
      window.alert("there was an error processing your request");
    });
};
export const getOpportunitiesByCompany = async () => {
  let uuid = localStorage.getItem("isAuthenticated");
  const opportunities1 = collection(db, "opportunities");
  const q = query(
    collection(db, "opportunities"),
    where("companyID", "==", uuid)
  );

  let data = [];
  const response = await getDocs(q);
  response.forEach((doc) => {
    let finalDoc = doc.data();
    finalDoc.docID = doc.id;
    data.push(finalDoc);
  });
  console.log(data);
  return data;
};

export const getOpportunityByID = async (id) => {
  const company = doc(db, "opportunities", id);
  const docSnap = await getDoc(company);

  let data = docSnap.data();
  let finalData = docSnap.data();
  finalData.appliedUser = [];
  for(let element of data.appliedUser)
  {
    let response= await getUserDataByID(element);
    finalData.appliedUser.push(response);
  }
  console.log(finalData);
  return finalData;
};
export const getUserDataByID = async (id) => {
  const user = doc(db, "users", id);
  const userSnap = await getDoc(user);
  console.log(userSnap.data());
  return userSnap.data();
};

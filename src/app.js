import './../styles/styles.css';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, list, ref as storageRef, uploadBytes } from "firebase/storage";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore"
import { getDatabase, onChildAdded, onValue, push, ref, remove, set } from "firebase/database";
import { getAuth, EmailAuthProvider, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyBJwX2FSrFkzxWXTiUHzu3TcGHi-ijfPGs",
    authDomain: "sda-firebase-9021a.firebaseapp.com",
    projectId: "sda-firebase-9021a",
    storageBucket: "sda-firebase-9021a.appspot.com",
    messagingSenderId: "994801333963",
    appId: "1:994801333963:web:5f83dfd22504d1c5660d4e",
    databaseURL: "https://sda-firebase-9021a-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
//const db = getDatabase();

// Урок 1: Доступ к фотографии на storage:
// const imageRef = ref(storage, "20221109_173648.jpg"); // взятие ссылки на фото в storage (ref - должен оказаться в import);
// const img = document.getElementById("myImage");
// img.src = `https://firebasestorage.googleapis.com/v0/b/${imageRef.bucket}/o/${imageRef.fullPath}?alt=media`; // ссылка imageRef имеет свойства bucket (бак, ведро) и fullPath;

// Урок 2: С помощью Аппки записать фото на storage:
// const myBtn = document.getElementById("mySendBtn");
// myBtn.addEventListener("click", () => {
//     const file = document.getElementById("myFileInput").files[0]; // доступ к первому файлу загруженному в input;
//     const myFileRef = ref(storage, file.name); // формирование ссылки на фото: файл - это объект класса file, имеющий свойство name; можем дать любое имя;
//     uploadBytes(myFileRef, file).then((result) => { // отправка фотки на storage firebase;
//         console.log("sukces");
//     });
// });

// Урок 3:
// po kliknieciu na przycisku, "wybierz plik", wybieramy plik.
// po kliknieciu na przycisku "Send file" w elemencie H1 ma sie pojawic info "Przesylam..."
// po zakonczeniu przesylania w elemencie H1 ma sie pojawic info "Przeslano..."
// dodajemy nowy input w ktorym uzytokownik moze wpisac nowa nazwe pliku
// plik z tą  nazwa bedzie przesany
// jezeli uzytkownik nie wybral pliku i kliknal przesli, to w elemencie H1 wyswiwtlamy "Error:wybierz plik"

// const myBtn = document.getElementById("mySendBtn");
// myBtn.addEventListener("click", () => {
//     const myResult = document.getElementById("myResult");
//     const file = document.getElementById("myFileInput").files[0];

//     if (file) {
//         myResult.innerText = "Przesyłam...";
//         const myFileNameInput = document.getElementById("myFileNameInput");
//         const myFileRef = ref(storage, myFileNameInput.value);

//         uploadBytes(myFileRef, file).then((result) => {
//             myResult.innerText = "Przesłano!";
//         });
//     }
//     else {
//         myResult.innerText = "Error: Wybierz plik!";
//     }
// }); // dziala;

// Урок 4: (pobieranie pliku)

// const imageRef = ref(storage, "straszny-czarny.jpg");
// getDownloadURL(imageRef).then((url) => {
//     const myImage = document.getElementById("myImage");
//     myImage.src = url;
// }); // dzila это выведение фотки в HTML

// Урок 5:
// Po przesylaniu obrazka, ze storage wyswietl ten obrazek w HTML
// Wykorzystaj metode getDounloadURL

// const myBtn = document.getElementById("mySendBtn");
// myBtn.addEventListener("click", () => {
//     const myResult = document.getElementById("myResult");
//     const file = document.getElementById("myFileInput").files[0];

//     if (file) {
//         myResult.innerText = "Przesyłam...";
//         const myFileNameInput = document.getElementById("myFileNameInput");
//         const myFileRef = ref(storage, myFileNameInput.value);

//         uploadBytes(myFileRef, file).then((result) => {
//             myResult.innerText = "Przesłano!";

//             getDownloadURL(result.ref).then((url) => {
//                 const myImage = document.getElementById("myImage");
//                 myImage.src = url;
//             });
//         });
//     }
//     else {
//         myResult.innerText = "Error: Wybierz plik!";
//     }
// }); // działa;





// const storageRef = ref(storage);
// listAll(storageRef).then((res) => {
//     res.items.forEach(item => {
//         console.log(item.fullPath);
//     })
// });

// const imageRef = ref(storage, "20221108_154106.jpg");
// deleteObject(imageRef).then(() => {
//     console.log("Usunięto");
// });

// const storageRef = ref(storage);
// listAll(storageRef).then((res) => {
//     res.items.forEach(item => {
//         const img = document.createElement("img");
//         const div = document.createElement("div");
//         const deleteBtn = document.createElement("button");
//         deleteBtn.innerText = "Delete";
//         deleteBtn.dataset.imageName = item.fullPath;

//         deleteBtn.addEventListener("click", (event) => {
//             const imageRef = ref(storage, event.target.dataset.imageName);
//             deleteObject(imageRef).then(() => {
//             console.log("Usunięto");
//             });
//         })

//         div.classList.add("card");
//         img.classList.add("image");

//         div.appendChild(img);
//         div.appendChild(deleteBtn);
//         document.body.appendChild(div);


//         getDownloadURL(item).then((url) => {
//             img.src = url;
//         })
//     })
// })
// const myList = document.getElementById("myFilesList");

// const db = getFirestore(app);
// const usersCollection = collection(db, "users");
// addDoc(usersCollection, {
//     name: "Szymon",
//     surname: "Roszyk"
// });

// const myDoc = doc(db, "users", "NowyUserId");
// updateDoc(myDoc, {
//     age: 18
// });

// getDoc(myDoc).then((resData) => {
//     console.log(resData.data());
// });

//ZADANIE:
// Pobierz document, nastepnie jego pola (imie, nazwisko i wiek) przypisz do
// 3 elementow HTML typu input. Nastepnie dodaj przycisk, ktory po kliknieciu pobierze aktualnie
// wpisane dane w te inputy i zaktualizuje document o nowe wartosc.


//zadanko2:
// wiswietl liste (imie, nazwisko, wiek) wszystkich dokumentow w users

// zadanie: dodaj przycist EDIT do kazdego list itema
//po klickieciu na EDIT inputy maja zostac  uzupelnione o dane z documentu
//po kiickniciu na SAVE document ma zostac zaktualizowany

// const myName = document.getElementById("myName");
// const mySurname = document.getElementById("mySurname");
// const myAge = document.getElementById("myAge");
// const myBtn = document.getElementById("myBtn");
// const myUsersList = document.getElementById("myUsersList");


// const usersCollection = collection(db, "users");
// getDocs(usersCollection).then((docs) => {
//     docs.forEach((userDoc) => {
//         const user = userDoc.data();
//         const listItem = document.createElement("li");
//         const editBtn = document.createElement("button");
//         editBtn.innerText = "Edit";

//         editBtn.addEventListener("click", () => {
//             myName.value = user.name;
//             mySurname.value = user.surname;
//             myAge.value = user.age;
//             myBtn.dataset.userId = userDoc.id;
//         });

//         listItem.innerText = `${user.name} ${user.surname}`;
//         listItem.appendChild(editBtn);
//         myUsersList.appendChild(listItem);
//     })

// });

// myBtn.addEventListener("click", (event) => {
//     const myDoc = doc(db, "users", event.target.dataset.userId);
//     updateDoc(myDoc, {
//         name: myName.value,
//         surname: mySurname.value,
//         age: myAge.value
//     });
// }); //dziala

// zadanie: utworz dokument HTML zawierajacy input i przycisk. Po nacisnieciu przycisku
// unworz query bazujac na imieniu wprowadzonym do pola input. Wykorzystaj query aby
// pobrac liste uzytrownikow spelniajacych dane kryterium i wysweitl ich w liscie.

// const myName = document.getElementById("myName");
// const myBtn = document.getElementById("myBtn");
// const myUsersList = document.getElementById("myUsersList");

// myBtn.addEventListener("click", () => {
//     const usersCollection = collection(db, "users");
//     const myQuery = query(usersCollection, where("name", "==", myName.value));
//     getDocs(myQuery).then((docs) => {
//         myUsersList.innerHTML = "";
//         docs.forEach((userDoc) => {
//             const user = userDoc.data();
//             const listItem = document.createElement("li");
//             listItem.innerText = `${user.name} ${user.surname}`;
//             myUsersList.appendChild(listItem);
//         });
//     });
// }); // dziala

// 28.11.2022 aktualizacja danych:

// const childrenList = document.getElementById("childrenList");
// const childNameInput = document.getElementById("ChildName");
// const addChildBtn = document.getElementById("myAddBtn");
// const janKowalskiDoc = doc(db, "users", "JanKowalsiId");

// onSnapshot(janKowalskiDoc, (docRes) => {
//     childrenList.innerHTML = "";
//     const janek = docRes.data();
//     janek.Dzieci.forEach(dziecko => {
//             const itemDziecko = document.createElement("li");
//             itemDziecko.innerText = dziecko;
//             childrenList.appendChild(itemDziecko);
//         });
// })

// function refresh() {
//     getDoc(janKowalskiDoc).then((docRes) => {
//         const janek = docRes.data();
//         janek.Dzieci.forEach(dziecko => {
//             const itemDziecko = document.createElement("li");
//             itemDziecko.innerText = dziecko;
//             childrenList.appendChild(itemDziecko);
//         });
//     })
// }

// updateDoc(janKowalskiDoc, {
//     Dzieci: arrayUnion("Stanisław")
// });

// Dodac input "nowe dziecko", wyswietlic liste dzieci,
// obok listy ma byc przycisk "usuń", ktory usuwa dziecko z listy

// addChildBtn.addEventListener("click", () => {
//     updateDoc(janKowalskiDoc, {
//         Dzieci: arrayUnion(childNameInput.value)
//     }).then(() => {
//         refresh();
//     });
// });

// getDoc(janKowalskiDoc).then((docRes) => {
//     const janek = docRes.data();
//     janek.Dzieci.forEach(dziecko => {
//         const itemDziecko = document.createElement("li");
//         itemDziecko.innerText = dziecko;
//         childrenList.appendChild(itemDziecko);
//     });
// })

// const janRef = ref(db, 'users/JanId');
// set(janRef, {
//     name: "Jan",
//     surname: "Kowalski"
// })


// dodawanie uzytkownika:
// const userName = document.getElementById("userName")
// const userSurname = document.getElementById("userSurname")
// const addUserBtn = document.getElementById("myAddBtn")

// addUserBtn.addEventListener("click", () => {
//     const userRef = ref(db, `users/${userName.value}${userSurname.value}`)
//     set(userRef, {
//         name: userName.value,
//         surname: userSurname.value
//     })
// })

// dodawanie użytkownika z wygenerowanym automatycznie ID:
// const userName = document.getElementById("userName");
// const userSurname = document.getElementById("userSurname");
// const addUserBtn = document.getElementById("myAddBtn");
// const usersList = document.getElementById("usersList");
// const usersRef = ref(db, "users");

// addUserBtn.addEventListener("click", () => {
//     const userRef = push(usersRef);
//     set(userRef, {
//         name: userName.value,
//         surname: userSurname.value
//     });
// });

// onValue(usersRef, (snapshot) => {
//     usersList.innerHTML = "";
//     snapshot.forEach(userSnapshot => {

//         const user = userSnapshot.val();
//         const listItem = document.createElement("li");

//         listItem.innerText = `${user.name} ${user.surname}`;
//         const removeBtn = document.createElement("button");
//         removeBtn.innerText = "Remove";
//         removeBtn.addEventListener("click", () => {
//             remove(userSnapshot.ref); // usuwanie uzytkownika
//         });
//         listItem.appendChild(removeBtn);

//         usersList.appendChild(listItem);
//     });
// }); // działa;

// 29.11.2022 ZADANIE: "google docs dla ubogich" - robimy textarea, kiedy uzytkownik cos pisze
// my doklejamy sie do event oncheige i wysylamy to do bazy danych, oraz aktualizujemy
// to co wyswietlamy:
// krok1: dodajemy textarea, w momencie, kiedy uzytkownik wyjdzie z textarea, wysylamy
// te informacji do bazy danych (tworzac wezel typu doc w bazie),

// const fakeDoc = document.getElementById("fakeDoc");
// fakeDoc.addEventListener("change", () => {
//     const docRef = ref(db, "doc");
//     set(docRef, {
//         text: fakeDoc.value
//     });
// }); // zmienia na biezonco tekst w input oraz w dokumencie firebase;

// zadanie: dodac nasluchiwanie na zmiany w documencie Firebase,
// demonstrowac zawarcie documenta na ekranie (w inputie);

// const fakeDoc = document.getElementById("fakeDoc");
// const docRef = ref(db, "doc");
// fakeDoc.addEventListener("change", () => {
//     set(docRef, {
//         text: fakeDoc.value
//     });
// });

// onValue(docRef, (snapshot) => {
//     const docObj = snapshot.val();
//     if (fakeDoc.value !== docObj.text) {
//         fakeDoc.value = docObj.text;
//     };
// }); //działa

// ZADANIE 3: stworzenie kommunikatora: можем ввести юзера, выбрать его цвет,
// сохранить его в базе, выбрать его из разворачивающегося списка,
// имеем поле для чата, в котором вписываем сообщения,
// ниже поля сообщений будет поле <div>, которое высветляет сообщения,
// сообщения высветлятся на фоне соответствующем цвету пользователя:

// const usernameInput = document.getElementById("username");
// const usercolorInput = document.getElementById("usercolor");
// const addUserBtn = document.getElementById("adduser");
// const userSelect = document.getElementById("userselect");
// const selectedUserHeader = document.getElementById("selecteduser");
// const messageInput = document.getElementById("message");
// const sendMessageBtn = document.getElementById("sendmessage");
// const messagesDiv = document.getElementById("messages");
// let selectedUser = {};
// const messagesRef = ref(db, "messages");

// onChildAdded(messagesRef, (messageSnapshot) => {
//     const message = messageSnapshot.val();
//     const messageDiv = document.createElement("div");
//     const textSpan = document.createElement("span");
//     const authorSpan = document.createElement("span");
//     const dateSpan = document.createElement("span");

//     textSpan.innerText = message.text;
//     authorSpan.innerText = message.createdBy;
//     dateSpan.innerText = message.createdAt;

//     messageDiv.appendChild(textSpan);
//     messageDiv.appendChild(authorSpan);
//     messageDiv.appendChild(dateSpan);
//     messageDiv.style.backgroundColor = message.color;
//     messageDiv.classList.add("message");

//     messagesDiv.appendChild(messageDiv);
// })

// sendMessageBtn.addEventListener("click", () => {
//     const message = {
//         text: messageInput.value,
//         createdAt: new Date().toDateString(),
//         createdBy: selectedUser.username,
//         color: selectedUser.color
//     };

    
//     const messageRef = push(messagesRef);
//     set(messageRef, message);
// })

// addUserBtn.addEventListener("click", () => {
//     const userRef = ref(db, `users/${usernameInput.value}`);
//     set(userRef, {
//         color: usercolorInput.value
//     });
// });

// userSelect.addEventListener("change", () => {
//     selectedUser = {
//         username: userSelect.value,
//         color: userSelect.selectedOptions[0].dataset.color
//     }
//     selectedUserHeader.innerText = userSelect.value;
//     selectedUserHeader.style.color = userSelect.selectedOptions[0].dataset.color;
// })

// const usersRef = ref(db, "users");
// onValue(usersRef, (snapshot) => {
//     userSelect.innerHTML = "";
//     const emptyOption = document.createElement("option");
//     userSelect.appendChild(emptyOption);
    
//     snapshot.forEach(userSnapshot => {
//         const user = userSnapshot.val();
//         const option = document.createElement("option");
//         option.innerText = userSnapshot.key;
//         option.dataset.color = user.color;
//         userSelect.appendChild(option);

//     })
// }) // działa;

// 30.11.2022. Регистрация пользователя в Firebase;

// const loginHeader = document.getElementById("loginHeader");
// const buttonSignOut = document.getElementById("signOutButton");
// const profilePhotoInput = document.getElementById("profilePhotoInput");
// const sendPhotoBtn = document.getElementById("sendPhoto");
// const photoProfileImg = document.getElementById("profilePhoto");
// const addressInput = document.getElementById("address");
// const motherNameInput = document.getElementById("motherName");
// const salary = document.getElementById("salary");
// const phoneNumber = document.getElementById("phoneNumber");
// const updateBtn = document.getElementById("updateBtn");

// buttonSignOut.addEventListener("click", () => {
//     signOut(auth);
// })

// updateBtn.addEventListener("click", () => {
//     const docRef = doc(db, `users/${auth.currentUser.uid}`);
//     setDoc(docRef, {
//         address: addressInput.value,
//         motherName: motherNameInput.value,
//         salary: salary.value,
//         phoneNumber: phoneNumber.value
//     });
// })

// sendPhotoBtn.addEventListener("click", () => {
//     const file = profilePhotoInput.files[0];
//     const fileRef = storageRef(storage, `${auth.currentUser.uid}/${file.name}`);
//     uploadBytes(fileRef, file).then(result => {
//         getDownloadURL(fileRef).then((url) => {
//             updateProfile(auth.currentUser, {
//                 photoURL: url
//             });
//         });
//     });
// });

// sendPhotoBtn.addEventListener("click", async () => {
//     const file = profilePhotoInput.files[0];
//     const fileRef = storageRef(storage, `${auth.currentUser.uid}/${file.name}`);
//     const _ = await uploadBytes(fileRef, file);
//     const url = await getDownloadURL(fileRef);
//     updateProfile(auth.currentUser, {
//         photoURL: url
//     });
// });

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log(photoProfileImg.classList);
//         loginHeader.innerText = `Witaj ${user.displayName}!`
//         photoProfileImg.src = user.photoURL;
//         buttonSignOut.classList.remove("hidden");
//         profilePhotoInput.classList.remove("hidden");
//         sendPhotoBtn.classList.remove("hidden");
//         photoProfileImg.classList.remove("hidden");

//     }
//     else {
//         loginHeader.innerText = "Zaloguj się! Dziadu!";
//         buttonSignOut.classList.add("hidden");
//         profilePhotoInput.classList.add("hidden");
//         sendPhotoBtn.classList.add("hidden");
//         photoProfileImg.classList.add("hidden");

//         const ui = new firebaseui.auth.AuthUI(auth);
//         ui.start('#firebaseui-auth-container', {
//             callbacks: {
//                 signInSuccessWithAuthResult: (authResult, redirectUrl) => {
//                     console.log(authResult);
//                     console.log(redirectUrl);
//                 }
//             },
//             signInOptions: [
//                 EmailAuthProvider.PROVIDER_ID,
//                 GoogleAuthProvider.PROVIDER_ID
//             ],
//             signInSuccessUrl: "http://localhost:8080/"
//         });
//     }
// });

const container = document.getElementById("container");
const auth = getAuth(app);
const noteTitleInput = document.getElementById("noteTitle");
const noteTextInput = document.getElementById("noteText");
const noteThumbnailInput = document.getElementById("noteThumbnail");
const saveBtn = document.getElementById("saveBtn");
const previewThumbnail = document.getElementById("previewThumbnail");
const notesList = document.getElementById("notesList");

noteThumbnailInput.addEventListener("change", () => {
    const file = noteThumbnailInput.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            previewThumbnail.src = fileReader.result;
        }
        fileReader.readAsDataURL(file);
    }
    else {
        previewThumbnail.src = "";
    }
})

saveBtn.addEventListener("click", async () => {
    const file = noteThumbnailInput.files[0];
    const collRef = collection(db, `users/${auth.currentUser.uid}/notes`);
    const fileRef = storageRef(storage, `${auth.currentUser.uid}/${file.name}`);
    let _ = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    _ = await addDoc(collRef, {
        title: noteTitleInput.value,
        text: noteTextInput.value,
        thumbnail: url
    });

    noteTitleInput.value = "";
    noteTextInput.value = "";
    noteThumbnailInput.value = "";
    previewThumbnail.src = "";
});

function displayNotes() {
    const collRef = collection(db, `users/${auth.currentUser.uid}/notes`);
    getDocs(collRef).then((docs) => {
        docs.forEach(doc => {
            const note = doc.data();
            const noteContainer = document.createElement("div");
            noteContainer.classList.add("note-container");

            const thumbnail = document.createElement("img");
            thumbnail.src = note.thumbnail;

            const textContainer = document.createElement("div");
            textContainer.classList.add("text-container");
            const title = document.createElement("div");
            title.innerText = note.title;

            const text = document.createElement("div");
            text.innerText = note.text;

            textContainer.appendChild(title);
            textContainer.appendChild(text);

            noteContainer.appendChild(textContainer);
            noteContainer.appendChild(thumbnail);
            notesList.appendChild(noteContainer);
        })
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        container.classList.remove("hidden");
        displayNotes();
    }
    else {
        const ui = new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                EmailAuthProvider.PROVIDER_ID,
            ],
            signInSuccessUrl: "http://localhost:8080/"
        });
    }
})
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

import firebaseConfig from "../config/firebase";

firebase.initializeApp(firebaseConfig);

export const uploadImage = async (imgSrc) => {
  const imageRef = await firebase
    .storage()
    .ref()
    .child(`images/${Date.now()}.png`);

  const snapshot = await imageRef.putString(imgSrc, "data_url");

  const url = await firebase
    .storage()
    .ref(snapshot.ref.fullPath)
    .getDownloadURL();

  return url;
};

export const uploadvCard = async (contactName, data) => {
  // remove any spaces or special characters from the contact name
  contactName = contactName.replace(/[^a-zA-Z0-9]/g, "");

  const blob = new Blob([data], { type: "text/vcard" });

  const contactRef = await firebase
    .storage()
    .ref()
    .child(`vcards/${contactName}.vcf`);

  const snapshot = await contactRef.put(blob);

  const url = await firebase
    .storage()
    .ref(snapshot.ref.fullPath)
    .getDownloadURL();

  return url;
};

export const uploadUrl = async (url, onSuccess, onError) => {
  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
          image: {
            source: {
              imageUri: url,
            },
          },
        },
      ],
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        "AIzaSyBqK60Z3VYv8i3icxRgou_w8wzJ3QLbwp4",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      }
    );
    let responseJson = await response.json();
    //console.log(responseJson);
    if (responseJson.responses && responseJson.responses[0]) {
      if (responseJson.responses[0].error) {
        onError(responseJson.responses[0].error.message);
      } else {
        if (responseJson.responses.length > 0) {
          onSuccess(responseJson.responses[0].fullTextAnnotation.text);
        } else {
          onError("No text found on this image, sorry :-(");
        }
      }
    }
  } catch (error) {
    onError(error.message);
  }
};

export default firebase;

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

import firebaseConfig from "../config/firebase";

firebase.initializeApp(firebaseConfig);

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

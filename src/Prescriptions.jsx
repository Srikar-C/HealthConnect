import "./prescription.css";
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  list,
} from "firebase/storage";
import { doc, updateDoc, arrayUnion,arrayRemove,getDoc  } from "firebase/firestore";
import { useStateValue } from "./stateProvider";
import { saveAs } from 'file-saver'
import {db} from "./firebase.js";
export default function User() {
  const [imgUrl, setImgUrl] = useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [{ user }, dispatch] = useStateValue();
  const [files, setFiles] = useState([]);
  const [comment,setComment]=useState();
  useEffect(() => {
    getDoc(doc(db, "users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        console.log("Document data:",);
        console.log(docSnap.data());
        const k=docSnap.data().pres;
        
          setFiles(k);
      }
      
    })
   
  }, );
  function handleDownload(event) {
    event.preventDefault();
    saveAs( event.target.value,'image_url'); 
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;
    const storageRef = ref(storage, `${user.email}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          const Ref = doc(db, "users", user.email);
            const newup={
              url:downloadURL,
              date:new Date().toLocaleString(), 
              comm:comment
            }
           updateDoc(Ref, {
            pres: arrayUnion(newup)|| null,
          
          });
        });
      }
    );
  };

  return (
    <div className="presc-main">
      <h3><b>Manage your Perscriptions,you can upload your prescription records or can download them</b></h3>
      <form  className="presc-form" onSubmit={handleSubmit}>
          <input type="file" />
          <div className="presc-comment">
            <label>Add a comment</label>
            <textarea value={comment}  onChange={e=>setComment(e.target.value)}  />
            <button type="submit">Upload</button>
          </div>
      </form>
      {!imgUrl && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
      <div className="presc-map">
      {files?.map((val) => {
        return (
          
          <div className="user-card">
              <div className="container">
                <img src={val.url} className="user-img" alt="photo" />
                <button className="btn" value={val.url} onClick={handleDownload}>Download</button>
              </div>
              <h4> updated on: {val.date}</h4>
              <h4>comment : {val.comm}</h4> 
          </div>
        );
      })}
      </div>
    </div>
  );
}
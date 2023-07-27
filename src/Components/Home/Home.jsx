import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
export default function Home() {
  let token = localStorage.getItem("userToken");
  let userDecoded = jwtDecode(token);
  let userID = userDecoded._id;
  let [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", desc: "", userID, token });

  async function getUserNotes() {
    let { data } = await axios.get(
      "https://route-movies-api.vercel.app/getUserNotes",
      {
        headers: {
          userID,
          Token: token,
        },
      }
    );
    if (data.message == "success") {
      setNotes(data.Notes);
    }else{
      setNotes([]);
    }
  }
  async function getNote(e) {
    let userNote = { ...note };
    userNote[e.target.name] = e.target.value;
    setNote(userNote);
    console.log(userNote);
  }
  async function addNote(e) {
    e.preventDefault();
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/addNote",
      note
    );
    if (data.message == "success") {
      document.getElementById("form-data").reset();
      getUserNotes();
    }
  }

  useEffect(() => {
    getUserNotes();
  }, []);

  function deleteNote(NoteID) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(76, 42, 114)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("https://route-movies-api.vercel.app/deleteNote", {
            data: {
              NoteID,
              token,
            },
          })
          .then((response) => {
            console.log(response);
            if (response.data.message == "deleted") {
              getUserNotes();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
              });
            }
          });
      }
    });
  }

  function getNoteId(noteIndex){
    document.querySelector('#form-data input').value=notes[noteIndex].title;
    document.querySelector('#form-data textarea').value=notes[noteIndex].desc;
    document.getElementById('two').style.display='block';
    document.getElementById('one').style.display='none'
    setNote({ ...note, 'title': notes[noteIndex].title, "desc": notes[noteIndex].desc, NoteID: notes[noteIndex]._id })
  
  }
  async function updateNote(e){
    e.preventDefault();
    let {data}=await axios.put("https://route-movies-api.vercel.app/updateNote",note)
if(data.message=='updated'){
  getUserNotes()
  document.getElementById('one').style.display='block';
  document.getElementById('two').style.display='none';
  document.getElementById("form-data").reset();
}
  }
  return (
    <>
      <div className={`${styles.add_note}  mt-4 ms-3 p-2  `}>
        <form id="form-data" >
          <input
            onChange={getNote}
            type="text"
            className="form-control mb-1 p-3"
            name="title"
            placeholder="write title"
          />

          <textarea
            onChange={getNote}
            className={`p-3`}
            name="desc"
            cols="30"
            rows="10"
            placeholder="write your note"
          >
            {" "}
          </textarea>
          <button id='one' onClick={addNote} className="mt-2 ">
            add note <i class="fa-solid fa-plus"></i>
          </button>
          <button id='two' onClick={updateNote} className={`${styles.update} mt-2`}> Update Note</button>
        </form>
      </div>

      <div className="container  mt-5">
        <div className="row ">
          {notes.map((note, index) => (
            <div key={index} className="col-md-4">
              <div className={`${styles.note} text-start p-3  mt-5`}>
                <h4>{note.title}</h4>
                <p>{note.desc}</p>
                <span className="text-end p-3">
                  <i
                    onClick={() => {
                      deleteNote(note._id);
                    }}
                    className=" mb-3 fa-solid fa-trash d-block"
                  ></i>{" "}
                  <i onClick={()=>{getNoteId(index)}} className="fa-solid fa-pen-to-square"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

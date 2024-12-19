"use client";
import { useEffect, useState } from "react";
import { INotes } from "../Interfaces/INotes";
import dynamic from "next/dynamic";
import { get, post } from "../utility/apiClient";
import Modal from "../components/Modal/Modal";

const NoteCardLoading = dynamic(
  () => import("../components/NoteCard/NoteCardLoading")
);
const NoteCard = dynamic(() => import("../components/NoteCard/NoteCard"));

const NoteApp = () => {
  const [notes, setNotes] = useState<INotes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<INotes>({});

  const getData = async () => {
    // setLoading(true)
    await get("/notes")
      .then((res: any) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await post("/notes", inputValues);
      getData();
    } finally {
      setInputValues({});
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="container pb-8 flex justify-between">
        <h1 className="text-5xl max-sm:text-3xl text-center font-bold text-teal-500">
          Your Notes
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded focus:outline-none focus:shadow-outline px-4 ease-linear transition-all duration-150"
        >
          Add Note
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {loading ? (
          <>
            {Array.from({ length: Math.max(3, notes.length || 5) }).map(
              (_, i) => (
                <NoteCardLoading key={i} />
              )
            )}
          </>
        ) : (
          notes.map((note: INotes) => <NoteCard key={note.id} note={note} />)
        )}
      </div>

      {modalOpen && (
        <Modal
          handleSubmit={handleSubmit}
          setModalOpen={setModalOpen}
          setInputValues={setInputValues}
          inputValues={inputValues}
        />
      )}
    </>
  );
};

export default NoteApp;

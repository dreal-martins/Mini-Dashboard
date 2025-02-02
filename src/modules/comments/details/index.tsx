import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useComments, useModal } from "../../../hooks";
import Loader from "../../../components/loader";
import EditCommentModal from "../../../components/modal/comment/edit";
import { IComment } from "../../../interfaces";

const CommentDetails: React.FC = () => {
  const navigate = useNavigate();
  const {
    commentDetails,
    isCommentLoading,
    updatingComment,
    updatedComment,
    handleUpdateComment,
  } = useComments();
  const { isOpen, closeModal, modalConfig, openModal } = useModal();
  const [formData, setFormData] = useState<IComment>(commentDetails);

  const { id, name, email, body, postId } = commentDetails;

  if (isCommentLoading || updatingComment) {
    return <Loader />;
  }

  return (
    <div className="h-full bg-gray-50 text-gray-800 overflow-y-scroll">
      <header className="bg-gray-200 text-black py-6">
        <div className="w-full flex flex-col md:flex-row md:items-center gap-4 md:justify-between px-4">
          <div>
            <h1 className="text-3xl font-bold">Comment Details</h1>
            <p className="text-lg">Comment ID: {postId}</p>
          </div>
          <div className="flex gap-2">
            <Button
              label="Edit"
              variant="primary"
              onClick={() =>
                openModal({
                  title: "Edit Comment",
                })
              }
            />
            <Button
              label="Back"
              variant="secondary"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Comment Metadata
          </h2>
          <p>Comment ID: {updatedComment ? updatedComment.id : postId}</p>
          <p>ID: {id}</p>
          <p>
            Author Email:{" "}
            <a
              href={`mailto:${updatedComment ? updatedComment.email : email}`}
              className="text-blue-600 underline"
            >
              {updatedComment ? updatedComment.email : email}
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Comment Content
          </h2>
          <h3 className="text-xl font-medium mb-2">
            {updatedComment ? updatedComment.name : name}
          </h3>
          <p className="whitespace-pre-line">
            {updatedComment ? updatedComment.body : body}
          </p>
        </section>
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="max-w-4xl px-4 text-center">
          <p>&copy; 2024 Comment Details Page</p>
        </div>
      </footer>

      {modalConfig && (
        <EditCommentModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalConfig={modalConfig}
          commentInfo={commentDetails}
          formData={formData}
          setFormData={setFormData}
          onConfirm={() => {
            handleUpdateComment(formData);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default CommentDetails;

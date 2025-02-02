import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/header";
import { useComments, useModal, useUsers } from "../../hooks";
import CreateCommentModal from "../../components/modal/comment/create";
import CreateUserModal from "../../components/modal/users/create";
import Button from "../../components/button";
import { CiCirclePlus } from "react-icons/ci";
import Loader from "../../components/loader";

export default function MobileLayout() {
  const { pathname } = useLocation();

  const {
    formData: commentFormData,
    setFormData: setCommentFormData,
    handleAddComment,
    addingComment,
  } = useComments();

  const {
    formData: userFormData,
    setFormData: setUserFormData,
    addUser,
    isFormComplete,
    addingUser,
  } = useUsers();

  const {
    closeModal: createCommentCloseModal,
    isOpen: createCommentIsOpen,
    modalConfig: createCommentConfig,
    openModal: createCommentOpenModal,
  } = useModal();
  const {
    closeModal: createUserCloseModal,
    isOpen: createUserIsOpen,
    modalConfig: createUserConfig,
    openModal: createUserOpenModal,
  } = useModal();

  const handleNewEntry = () => {
    if (pathname === "/") {
      createCommentOpenModal({
        title: "Add New Comment",
      });
    } else if (pathname === "/users") {
      createUserOpenModal({
        title: "Add New User",
      });
    }
  };

  if (addingComment || addingUser) {
    return <Loader />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <Header />
      <div className="flex items-center justify-end h-[40px] px-4">
        <Button
          label={
            pathname === "/"
              ? "Add New Comment"
              : pathname === "/users"
              ? "Add New User"
              : "Add New Entry"
          }
          size="small"
          onClick={handleNewEntry}
          icon={<CiCirclePlus size={18} />}
          iconPosition="left"
        />
      </div>

      <div className="px-4 h-[calc(100%-150px)] bg-[#F8FAFE] overflow-y-scroll pb-10">
        <Outlet />
      </div>
      {createCommentConfig && (
        <CreateCommentModal
          isOpen={createCommentIsOpen}
          closeModal={createCommentCloseModal}
          modalConfig={createCommentConfig}
          formData={commentFormData}
          setFormData={setCommentFormData}
          onConfirm={handleAddComment}
        />
      )}
      {createUserConfig && (
        <CreateUserModal
          isOpen={createUserIsOpen}
          closeModal={createUserCloseModal}
          modalConfig={createUserConfig}
          formData={userFormData}
          setFormData={setUserFormData}
          onConfirm={addUser}
          isFormComplete={isFormComplete}
        />
      )}
    </div>
  );
}

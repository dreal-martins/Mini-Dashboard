import { CiCirclePlus } from "react-icons/ci";
import { Outlet, useLocation } from "react-router-dom";
import Button from "../../components/button";
import Header from "../../components/header";
import Loader from "../../components/loader";
import CreateCommentModal from "../../components/modal/comment/create";
import CreateUserModal from "../../components/modal/users/create";
import DesktopSidebar from "../../components/sidebar/desktop";
import { useComments, useModal, useUsers } from "../../hooks";

export default function Desktop() {
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
    addingUser,
    isFormComplete,
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
    <div className="h-full w-full">
      <Header />
      <div className="flex flex-col gap-4 p-4 h-[calc(100dvh-80px)]">
        <div className="flex items-center justify-end h-[40px]">
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

        <div className="flex w-full p-4 h-[calc(100%-40px)]">
          <DesktopSidebar />
          <div className="bg-[#F5F5F5] w-[85%] p-2">
            <Outlet />
          </div>
        </div>
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

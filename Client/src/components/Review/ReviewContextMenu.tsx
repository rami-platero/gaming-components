import { forwardRef } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "./reviewContextMenu.module.scss";
import { Review } from "../../types/reviews";
import { useSetAtom } from "jotai/react";
import { Modal, uiAtom } from "../Modals";

type Params = {
  review: Review;
  handleEditing: () => void;
};

const ReviewContextMenu = forwardRef<HTMLDivElement, Params>(
  ({ review, handleEditing }, ref) => {
    const openModal = useSetAtom(uiAtom);

    const handleOpenDeleteReviewModal = () => {
      openModal((prev) => ({ ...prev, modal: Modal.DELETE_REVIEW, review }));
    };

    return (
      <div ref={ref} className={styles.contextMenu}>
        <>
          <button
            className={styles.contextMenu__actionBtn}
            onClick={handleOpenDeleteReviewModal}
          >
            <BsFillTrashFill />
            Remove
          </button>
          <button
            className={styles.contextMenu__actionBtn}
            onClick={handleEditing}
          >
            <BsFillTrashFill />
            Edit
          </button>
        </>
      </div>
    );
  }
);

export default ReviewContextMenu;

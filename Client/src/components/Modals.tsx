import { useAtom, atom } from "jotai";
import { createPortal } from "react-dom";
import { Review } from "../types/reviews";
import DeleteReviewModal from "./Modals/DeleteReviewModal";
import AddReviewModal from "./Modals/AddReviewModal";
import ChangePassword from "./Modals/ChangePassword";

export const uiAtom = atom({
  modal: null as Modal | null,
  review: null as Review | null,
  id: null as number | null,
});

export const INITIAL_ATOM = {
  modal: null as Modal | null,
  review: null as Review | null,
  id: null as number | null,
};

export enum Modal {
  DELETE_REVIEW = "DELETE_REVIEW",
  ADD_REVIEW = "ADD_REVIEW",
  CHANGE_PASSWORD =  "CHANGE_PASSWORD"
}

const Modals = () => {
  const mountElement = document.getElementById("overlays");
  const [ui] = useAtom(uiAtom);

  return mountElement
    ? createPortal(
        <>
          {(ui.modal === Modal.DELETE_REVIEW && ui.review) ? (
            <DeleteReviewModal review={ui.review} />
          ): null}
          {(ui.modal === Modal.ADD_REVIEW && ui.id) ? (
            <AddReviewModal id={ui.id} />
          ): null}
          {ui.modal === Modal.CHANGE_PASSWORD ? <ChangePassword/> : null}
        </>,
        mountElement
      )
    : null;
};

export default Modals;

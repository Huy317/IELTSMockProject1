import { toast } from "react-toastify";

export function confirmToast(message: string, onConfirm: () => void, onCancel?: () => void) {
  console.log("confirmToast called with message:", message);
  toast(
    ({ closeToast }) => (
      <div className="d-flex flex-column">
        <p className="mb-2">{message}</p>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (onCancel) onCancel();
              closeToast();
            }}
          >
            NO
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              onConfirm();
              closeToast();
            }}
          >
            YES
          </button>
        </div>
      </div>
    ),
    { autoClose: false, position: "top-center" } // keep it open until user clicks
  );
  console.log("Toast should have been displayed");
}

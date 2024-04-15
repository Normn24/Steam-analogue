export default function ModalClose({ onClick }) {
  return (
    <>
      <button className="ModalClose" onClick={onClick}>
        <img src="src\assets\closeCross.png" alt="" />
      </button>
    </>
  );
}

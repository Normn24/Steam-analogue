import Button from "../Button/Button";

export default function ModalFooter(props) {
  const { firstText, secondaryText, firstClick, secondaryClick, children } =
    props;

  return <div className="modalFooter">
    {children}
    {firstText && <Button  classNames={"firstButton"} onClick={firstClick}> {firstText}</Button>}
    {secondaryText && <Button classNames={"secondButton"} onClick={secondaryClick}>  {secondaryText}  </Button>}
      
    </div>;
}

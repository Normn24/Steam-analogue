export default function Button(props) {
  const { type, classNames, onClick, children } = props;
  return <button className={classNames} onClick={onClick}> {children} </button>;
}

import cx from "classnames";
import PropTypes from 'prop-types';
import './Button.scss'


const Button = (props) => {
  const {type, classNames, darkButton, lightButton, children, click} = props
  return (
    <button onClick={click} className={cx("button", classNames, {_dark:darkButton}, {_light:lightButton})} type={type}>{children}</button>
  )
}
Button.defaultProps = {
  type: "button",
  click: () => {}
}

Button.propTypes = {
  type: PropTypes.string,
  classNames: PropTypes.string, 
  boxView: PropTypes.bool,
  underlineView: PropTypes.bool,
  children: PropTypes.any,
  click: PropTypes.func
}

export default Button

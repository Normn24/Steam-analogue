import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Modal from './Modal.jsx'
// import Button from "../Button/Button.jsx";



describe(" modal tests",() => {
    test('test props', () => {
      const {getByTestId} =  render(<Modal isModal={true}/>)
        expect(getByTestId('closeModal')).toBeInTheDocument()
    })
    // test('modal', () => {
    //     const clickFunction = jest.fn()
    //     const { getByRole } =  render(<Modal handlerClick={clickFunction}/>)
    //     fireEvent.click(getByRole('modal'))
    //     expect(clickFunction).toHaveBeenCalledTimes(1)
    // })
    test('test made snapshot', () => {
        const modal = render(<Modal>children</Modal>)
        expect(modal).toMatchSnapshot()
    })
})
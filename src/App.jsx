import React, { useState, useEffect } from "react";
import Modal from "../src/components/Modal/Modal";
import ModalWrapper from "../src/components/Modal/ModalWrapper";
import ModalHeader from "../src/components/Modal/ModalHeader";
import ModalFooter from "../src/components/Modal/ModalFooter";
import ModalBody from "../src/components/Modal/ModalBody";
import SignInForm from "./components/SignInForm/SignInForm";

function App() {
  
  const [isModalOpen, SetIsModalOpen] = useState(true);
  
const Modalstate = ()=>{
    SetIsModalOpen(!isModalOpen)
  }
  
  return (
    <>
  
    <Modal isOpen={isModalOpen}>
        <ModalWrapper>
          <ModalHeader>
             <h1>Sign In</h1>
          </ModalHeader>

          <ModalBody>
          <SignInForm Modalstate={Modalstate}></SignInForm>
          </ModalBody>
          <ModalFooter
            
           
            
          />
        </ModalWrapper>
      </Modal>
    </>
  );
}

export default App;

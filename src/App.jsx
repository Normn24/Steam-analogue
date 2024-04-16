import React, { useState, useEffect } from "react";
import Modal from "../src/components/Modal/Modal";
import ModalWrapper from "../src/components/Modal/ModalWrapper";
import ModalHeader from "../src/components/Modal/ModalHeader";
import ModalFooter from "../src/components/Modal/ModalFooter";
import ModalBody from "../src/components/Modal/ModalBody";
import SignInForm from "./components/SignInForm/SignInForm";
import LogInForm from "./components/LogInForm/LogInForm";
function App() {
  
  const [isModalOpen, SetIsModalOpen] = useState(true);
  const [isSignd, setIsSignd] = useState(false)
const Modalstate = ()=>{
    SetIsModalOpen(!isModalOpen)
  }
  
  return (
    <>
    {!isSignd ?   <Modal isOpen={isModalOpen}>
        <ModalWrapper>
          <ModalHeader>
             <h1>Sign In</h1>
          </ModalHeader>

          <ModalBody>
          <SignInForm Modalstate={Modalstate} setIsSignd = {setIsSignd} isSignd = {isSignd}></SignInForm>
          </ModalBody>
          <ModalFooter firstText="Log in now" firstClick={()=>{
            setIsSignd(!isSignd)
          }}/>
        </ModalWrapper>
      </Modal> 
      : <Modal isOpen={isModalOpen}>
        <ModalWrapper>
          <ModalHeader>
             <h1>Log in</h1>
          </ModalHeader>

          <ModalBody>
          <LogInForm Modalstate={Modalstate}></LogInForm>
          </ModalBody>
          <ModalFooter
          />
        </ModalWrapper>
      </Modal>
     
     
     
     
     }
   

      
    </>
  );
}

export default App;

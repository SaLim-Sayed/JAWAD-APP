import React from "react";
import {
    Modal
} from "react-native";

import UpdateStable from "./CompleteStable";
 

 const CompleteModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
 
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
       <UpdateStable onClose={onClose}/>
    </Modal>
  );
};

export default CompleteModal;
 
import React, { useState } from "react";
import Label from "./labels/Label";
import InputContainer from "./inputs/InputContainer";
import InputField from "./inputs/InputField";
import Button from "../UI-UX/buttons/Button";
import Modal from "../UI-UX/modal/Modal";
import ModalData from "./modal-data/ModalData";
import { calculateOrder } from "../../lib/orderCalculator";
import { sanitizeData } from "../../lib/sanitizeData";

import { GiPathDistance } from "react-icons/gi";

import styles from "./CardOrder.module.css";

type FormData = {
  [key: string]: string;
};

type ModalData = {
  [key: string]: string;
};

interface Error {
  isError: boolean;
  message: string;
}

export default function CardOrder() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Error>({
    isError: false,
    message: "",
  });
  const [formData, setFormData] = useState<FormData>({
    cardValue: "",
    distance: "",
    amount: "",
    date: "",
  });

  const [modalData, setModalData] = useState<ModalData>({
    surcharge: "",
    deliveryFee: "",
    extraSurcharge: "",
    totalPrice: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const sanitizeResult = sanitizeData({ ...formData });

    try {
      const data = calculateOrder({ ...sanitizeResult });
      setModalData(data);

      setShowModal(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage({ isError: true, message: error.message });
        setShowModal(true);
      }
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setFormData({
        cardValue: "",
        distance: "",
        amount: "",
        date: "",
      });
      setErrorMessage({ isError: false, message: "" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Close the modal if Escape key is pressed
    if (e.key === "Escape") {
      setShowModal(false);
      if (showModal) {
        setFormData({
          cardValue: "",
          distance: "",
          amount: "",
          date: "",
        });
        setErrorMessage({ isError: false, message: "" });
      }
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          onClose={toggleModal}
          onKeyPress={handleKeyPress}
          error={{ ...errorMessage }}
        >
          <ModalData data={modalData} />
        </Modal>
      )}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor="card-value">Card value</Label>
          <InputField
            type="text"
            id="card-value"
            name="cardValue"
            ariaLabel="Card value"
            ariaRequired={true}
            placeholder="20.50"
            onChangeHandler={handleInputChange}
            value={formData.cardValue}
            inputMode="numeric"
            icon={"€"}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="delivery-distance">Delivery distance</Label>
          <InputField
            type="text"
            id="delivery-distance"
            name="distance"
            ariaLabel="Delivery distance"
            ariaRequired={true}
            placeholder="1500m"
            onChangeHandler={handleInputChange}
            value={formData.distance}
            inputMode="numeric"
            pattern="[0-9]*"
            icon={<GiPathDistance />}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="amount-of-items">Amount of items</Label>
          <InputField
            type="text"
            id="amount-of-items"
            name="amount"
            ariaLabel="Amount of items"
            ariaRequired={true}
            placeholder="1"
            onChangeHandler={handleInputChange}
            value={formData.amount}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="Time">Time</Label>
          <InputField
            type="date"
            id="date"
            name="date"
            ariaLabel="Calendar"
            ariaRequired={true}
            onChangeHandler={handleInputChange}
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
          />
        </InputContainer>
        <Button
          type="submit"
          ariaLabel="Submit delivery fee calucations"
          tabIndex={0}
        >
          Calculate Delivery Fee
        </Button>
      </form>
    </>
  );
}

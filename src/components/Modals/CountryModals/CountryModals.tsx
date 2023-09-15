import Countries from "../../Countries/Countries";
import {
  ModalCloseButton,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from "../styles";

const CountryModals = () => {
  return (
    <ModalContainer>
      <ModalCloseButton>X</ModalCloseButton>
      <ModalHeader>
        <ModalTitle>Countries</ModalTitle>
        <ModalSubtitle>Choose your country</ModalSubtitle>
      </ModalHeader>
      <ModalContent>
        <Countries />
      </ModalContent>
    </ModalContainer>
  );
};

export default CountryModals;

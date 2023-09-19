import type { LabelType } from "../../types/calendar";
import { LabelContainer, LabelWrapper } from "./styles";

const Labels = ({ items }: { items: LabelType[] }) => {
  return (
    <LabelWrapper>
      {items.map((label, index) => (
        <LabelContainer key={index} style={{ background: label.color }}>
          <p>{label.title}</p>
        </LabelContainer>
      ))}
    </LabelWrapper>
  );
};

export default Labels;

import ModalBox from "./ModalBox";
import styles from "./ModalData.module.css";

// type MyArray = Array<{ [key: string]: string }>;

// interface Props {
//   data: MyArray;
// }

type ModalData = {
  [key: string]: string;
};

interface Props {
  data: ModalData;
}

const splitAndCapitalize = (str: string) => {
  return str
    .split(/(?=[A-Z])/)
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word.toLowerCase();
      }
    })
    .join(" ");
};

export default function ModalData({ data }: Props) {
  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <ModalBox key={key}>
          <h2
            className={styles.modalTitle}
            data-test-id={key === "deliveryPrice" ? "fee" : ""}
          >
            {splitAndCapitalize(key)}
          </h2>
          <p className={styles.modalSubtitle}>{value}</p>
        </ModalBox>
      ))}
    </>
  );
}

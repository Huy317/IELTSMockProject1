import { testCorrect } from "./question_type/ChooseCorrectQuestion";
import { testMul } from "./question_type/MultipleChoiceQuestion";
import { testNote } from "./question_type/NoteCompletionQuestion";

function QuestionReading() {
  return (
    <div
      style={{
        maxHeight: "600px",
        overflowY: "auto",
        paddingRight: "10px",
        border: "1px solid #eee",
        borderRadius: "8px",
      }}
    >
      <p className="bg-light p-3 mb-3 border-start border-primary border-4 fw-bold text-dark">
        Questions 1-3 Complete the sentences below. Choose NO MORE THAN TWO
        WORDS ANDIOR A NUMBER from the passage for each answer. Write your
        answers in boxes 1-3 on your answer sheet
      </p>

      {testNote([
        {
          prompt: "Urban farming in Paris",
          items: [
            {
              label: "1. Vertical tubes are used to grow strawberries, 1.",
              after: "and herbs.",
            },
            {
              label:
                "2. There will eventually be a daily harvest of as much as 2.",
              after: "in weight of fruit and vegetables.",
            },
            {
              label:
                "3. It may be possible that the farm’s produce will account for as much as 10% of the city’s 3. ",
              after: "overall.",
            },
          ],
        },
      ])}

      <p className="bg-light p-3 mb-3 border-start border-primary border-4 fw-bold text-dark">
        Questions 4-7 Multiple choice question.
      </p>

      {testMul([
        { question: "4. Select your favorite color, you can choose more than one", options: ["Red", "Blue", "Green"] },
        { question: "5. Select your favorite color, you can choose more than one", options: ["Red", "Blue", "Green"] },
        { question: "6. Select your favorite color, you can choose more than one", options: ["Red", "Blue", "Green"] },
        { question: "7. Select your favorite color, you can choose more than one", options: ["Red", "Blue", "Green"] },
      ])}

      <p className="bg-light p-3 mb-3 border-start border-primary border-4 fw-bold text-dark">
        Questions 8-13 Do the following statements agree with the information
        given in Reading Passage 1? In boxes 8-13 on your answer sheet, write
        TRUE: if the statement agrees with the information FALSE: if the
        statement contradicts the information NOT GIVEN: if there is no
        information on this
      </p>
      {testCorrect([
        {
          question: "8. Urban farming can take place above or below ground.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
        },
        {
          question: "9. Some of the equipment used in aeroponic farming can be made by hand",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
        },
        {
          question: "10. Urban farming relies more on electricity than some other types of farming.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
        },
        {
          question: "11. Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
        },
        {
          question: "12. Most produce can be grown on an aeroponic urban farm at any time of the year",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
        },
        {
          question: "13. Beans take longer to grow on an urban farm than other vegetables.",
          options: ["TRUE", "FALSE", "NOT GIVEN"],
        },
      ])}
    </div>
  );
}

export default QuestionReading;

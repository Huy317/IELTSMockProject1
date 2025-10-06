import React from 'react';
import MultipleChoiceModal from './question_modal/MultipleChoiceModal';
import FillInTheBlankModal from './question_modal/FillInTheBlankModal';
import SingleChoiceModal from './question_modal/SingleChoiceModal';
import MatchingModal from './question_modal/MatchingModal';
import DiagramLabelingModal from './question_modal/DiagramLabelingModal';
import ShortAnswerModal from './question_modal/ShortAnswerModal';
import MultipleChoiceUpdateModal from './question_update_modal/MultipleChoiceUpdate';
import FillInTheBlankUpdateModal from './question_update_modal/FillInTheBlankUpdate';
import MatchingUpdate from './question_update_modal/MatchingUpdate';
import SingleChoiceUpdateModal from './question_update_modal/SingleChoiceUpdate';
import DiagramLabelingUpdate from './question_update_modal/DiagramLabelingUpdate';
import ShortAnswerUpdateModal from './question_update_modal/ShortAnswerUpdate';
import type { Question } from '../../types/Question';

interface ModalManagerProps {
  // Create Modal Props
  isModalOpen: boolean;
  currentIndex: number | null; // Can be sectionIndex or paragraphIndex
  selectedQuestionTypes: string[];
  handleCloseModal: () => void;
  handleModalSubmit: (data: Question) => void;
  otherData: {
    parentId: number;
    testId: number;
    order: number;
  };

  // Update Modal Props
  isUpdateModalOpen: boolean;
  currentEditQuestion: Question | null;
  handleCloseUpdateModal: () => void;
  handleUpdateModalSubmit: (updatedQuestion: Question) => void;
}

const ModalManager: React.FC<ModalManagerProps> = ({
  // Create Modal Props
  isModalOpen,
  currentIndex,
  selectedQuestionTypes,
  handleCloseModal,
  handleModalSubmit,
  otherData,

  // Update Modal Props
  isUpdateModalOpen,
  currentEditQuestion,
  handleCloseUpdateModal,
  handleUpdateModalSubmit,
}) => {
  return (
    <>
      {/* Create Question Modals */}
      {isModalOpen && currentIndex !== null && (
        <>
          {selectedQuestionTypes[currentIndex] === "MultipleChoice" && (
            <MultipleChoiceModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={otherData}
            />
          )}

          {selectedQuestionTypes[currentIndex] === "FillInTheBlank" && (
            <FillInTheBlankModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={otherData}
            />
          )}

          {selectedQuestionTypes[currentIndex] === "SingleChoice" && (
            <SingleChoiceModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={otherData}
            />
          )}

          {selectedQuestionTypes[currentIndex] === "Matching" && (
            <MatchingModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={otherData}
            />
          )}

          {selectedQuestionTypes[currentIndex] === "DiagramLabeling" && (
            <DiagramLabelingModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={otherData}
            />
          )}

          {selectedQuestionTypes[currentIndex] === "ShortAnswer" && (
            <ShortAnswerModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={otherData}
            />
          )}
        </>
      )}

      {/* Update Question Modals */}
      {isUpdateModalOpen && currentEditQuestion && currentEditQuestion.questionType === 'MultipleChoice' && (
        <MultipleChoiceUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateModalSubmit}
          question={currentEditQuestion}
        />
      )}

      {isUpdateModalOpen && currentEditQuestion && currentEditQuestion.questionType === 'FormCompletion' && (
        <FillInTheBlankUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateModalSubmit}
          question={currentEditQuestion}
        />
      )}

      {isUpdateModalOpen && currentEditQuestion && currentEditQuestion.questionType === 'Matching' && (
        <MatchingUpdate
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateModalSubmit}
          question={currentEditQuestion}
        />
      )}

      {isUpdateModalOpen && currentEditQuestion && currentEditQuestion.questionType === 'SingleChoice' && (
        <SingleChoiceUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateModalSubmit}
          question={currentEditQuestion}
        />
      )}

      {isUpdateModalOpen && currentEditQuestion && currentEditQuestion.questionType === 'DiagramLabeling' && (
        <DiagramLabelingUpdate
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateModalSubmit}
          question={currentEditQuestion}
        />
      )}

      {isUpdateModalOpen && currentEditQuestion && currentEditQuestion.questionType === 'ShortAnswer' && (
        <ShortAnswerUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateModalSubmit}
          question={currentEditQuestion}
        />
      )}
    </>
  );
};

export default ModalManager;

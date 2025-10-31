import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // ✅ Fetch all questions
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions)
      .catch((err) => console.error("Failed to load questions", err));
  }, []);

  // ✅ Add new question
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // ✅ Delete question
  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  // ✅ Update question’s correct answer
  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <main>
      <nav>
        <button onClick={() => setPage("Form")}>New Question</button>
        <button onClick={() => setPage("List")}>View Questions</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        {page === "List" ? (
          <QuestionList
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        ) : (
          <QuestionForm onAddQuestion={handleAddQuestion} />
        )}
      </section>
    </main>
  );
}

export default App;

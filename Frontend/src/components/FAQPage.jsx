import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../style/FAQPage.css";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]); // All FAQs from the server
  const [isEditing, setIsEditing] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaqs(); // Initial fetch of FAQs
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(
        "https://fruit-ai-backened-13.onrender.com/faqs"
      );
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleEditClick = (id, question, answer) => {
    setIsEditing(id);
    setEditQuestion(question);
    setEditAnswer(answer);
  };

  const handleEdit = async (id) => {
    try {
      const updatedFaq = {
        question: editQuestion,
        answer: editAnswer,
      };
      await axios.put(
        `https://fruit-ai-backened-13.onrender.com/faqs/${id}`,
        updatedFaq
      );
      setFaqs(
        faqs.map((faq) => (faq.id === id ? { ...faq, ...updatedFaq } : faq))
      );
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://fruit-ai-backened-13.onrender.com/faqs/${id}`
        );
        setFaqs(faqs.filter((faq) => faq.id !== id));
        alert("FAQ deleted successfully");
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        alert("Failed to delete FAQ. Please try again.");
      }
    }
  };

  // Filtering FAQs based on the search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQ Section</h2>

      {/* Search Bar */}
      <div className="faq-search">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredFaqs.map((faq) => (
        <div className="faq-item" key={faq.id}>
          {faq.image_url && (
            <img src={faq.image_url} alt={faq.question} className="faq-image" />
          )}
          <div className="faq-content">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>

          {isEditing === faq.id ? (
            <div className="faq-edit-form">
              <input
                type="text"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
              />
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
              />
              <button onClick={() => handleEdit(faq.id)}>Save</button>
            </div>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon"
                onClick={() =>
                  handleEditClick(faq.id, faq.question, faq.answer)
                }
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => handleDelete(faq.id)}
              />
            </>
          )}
        </div>
      ))}

      <div>
        <Link to="/create-faq">
          <button className="create-faq-button">Create New FAQ</button>
        </Link>
      </div>
    </div>
  );
};

export default FAQSection;

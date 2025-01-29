import { useState } from 'react';
import axios from 'axios';

interface Card {
  id: number;
  to: string;
  from: string;
  message: string;
  messageType: string;
}

interface EmailFormData {
  to: string;
  from: string;
  email: string;
}

interface GalleryProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

const Gallery = ({ cards, onCardClick }: GalleryProps) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [emailFormData, setEmailFormData] = useState<EmailFormData>({
    to: '',
    from: '',
    email: ''
  });

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setEmailFormData({
      to: card.to,
      from: card.from,
      email: ''
    });
    setShowModal(true);
    onCardClick(card);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) return;

    try {
      await axios.post('http://localhost:8787/api/cards/send-email', {
        ...emailFormData,
        message: selectedCard.message,
        messageType: selectedCard.messageType
      });
      setShowModal(false);
      alert('Valentine card sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send the card. Please try again.');
    }
  };

  return (
    <>
      <div className="cards-gallery">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => handleCardClick(card)}
          >
            <div className="card-content">
              <h3>To: {card.to}</h3>
              <p className="message">{card.message}</p>
              <h4>From: {card.from}</h4>
              <span className="card-type">{card.messageType}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedCard && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Send this Card</h2>
            <div className="card-preview">
              <p><strong>Message:</strong> {selectedCard.message}</p>
            </div>
            <form onSubmit={handleSendEmail}>
              <div className="form-group">
                <label htmlFor="email">Recipient's Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={emailFormData.email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="to">To:</label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={emailFormData.to}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="from">From:</label>
                <input
                  type="text"
                  id="from"
                  name="from"
                  value={emailFormData.from}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Send Card</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
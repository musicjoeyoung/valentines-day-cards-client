import axios from 'axios';
import { useState } from 'react';

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
    </>
  );
};

export default Gallery;
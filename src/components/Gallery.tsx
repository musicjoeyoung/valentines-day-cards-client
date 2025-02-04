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
  const [_selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [_emailFormData, setEmailFormData] = useState<EmailFormData>({
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
    onCardClick(card);
  };

  const handleToggleExpand = (cardId: number) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
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

              <p className="message" >
                {expandedCardId === card.id ? card.message : card.message.substring(0, 100) + '...'}
              </p>
              {card.message.length > 100 && (
                <p className="see-more" onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleToggleExpand(card.id) }}>
                  {expandedCardId === card.id ? 'See Less' : 'See More'}
                </p>
              )}
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
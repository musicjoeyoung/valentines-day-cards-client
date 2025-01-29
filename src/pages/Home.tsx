import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Gallery from '../components/Gallery';
import EmailModal from '../components/EmailModal';

interface Card {
    id: number;
    to: string;
    from: string;
    message: string;
    messageType: string;
}

const Home = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getCards();
    }, []);

    const getCards = async () => {
        try {
            const response = await axios.get('http://localhost:8787/api/cards');
            setCards(response.data.cards);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        console.log('Closing modal, resetting selectedCard.');
        setShowModal(false);
        setSelectedCard(null);
    };

    console.log('Rendering Home, showModal:', showModal);
    return (
        <div className="container">
            <h1>Valentine's Day Cards</h1>
            <p>Create a custom card or use one of the predefined options and send it!</p>

            <Form onCardCreated={getCards} />
            <Gallery cards={cards} onCardClick={handleCardClick} />

            {showModal && selectedCard && (
                <EmailModal
                    card={selectedCard}
                    onClose={handleCloseModal}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
        </div>
    );
};

export default Home;
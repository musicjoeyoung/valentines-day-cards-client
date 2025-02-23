import { useEffect, useState } from 'react';

import EmailModal from '../components/EmailModal';
import Form from '../components/Form';
import Gallery from '../components/Gallery';
import axios from 'axios';

interface Card {
    id: number;
    to: string;
    from: string;
    message: string;
    messageType: string;
    created_at: string;
}

const URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getCards();
    }, []);

    const getCards = async () => {
        try {
            const response = await axios.get(`${URL}/api/cards`);
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
        //console.log('Closing modal, resetting selectedCard.');
        setShowModal(false);
        setSelectedCard(null);
    };

    //console.log('Rendering Home, showModal:', showModal);
    return (
        <div className="container">
            <h1>Valentine's Day Cards Gallery</h1>
            <p>Create a custom card or use one of the predefined options!</p>
            <p className='container__email-info'>Want to <span className='container__email-info--span'>email</span>  a card? Click on one below the form!</p>
            <p className='container__email-info-note'>(you can change the names before you send the card!)</p>

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
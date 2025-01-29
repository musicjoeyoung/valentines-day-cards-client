import { useState } from 'react';
import axios from 'axios';

interface Card {
    id: number;
    to: string;
    from: string;
    message: string;
    messageType: string;
}

interface EmailModalProps {
    card: Card;
    onClose: () => void;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailModal = ({ card, onClose, showModal, setShowModal }: EmailModalProps) => {
    const [emailFormData, setEmailFormData] = useState({
        to: card.to,
        from: card.from,
        email: ''
    });
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sending email with data:', emailFormData);

        try {
            await axios.post('http://localhost:8787/api/cards/send-email', {
                ...emailFormData,
                message: card.message,
                messageType: card.messageType
            });
            setSuccessMessage('Valentine card sent successfully!');
            setShowModal(false);
            onClose();
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Send this Card</h2>
                <div className="card-preview">
                    <p><strong>Message:</strong> {card.message}</p>
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
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </div>
    );
};

export default EmailModal;

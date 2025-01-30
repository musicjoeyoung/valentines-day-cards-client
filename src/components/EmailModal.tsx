import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import './EmailCard.css'; // Importing CSS for styling the card

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

const EmailCard: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="email-card">
            <h2>Happy Valentine's Day!</h2>
            <p>{content}</p>
        </div>
    );
};

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
            const emailContent = `
<div style="border: 1px solid #ff69b4; border-radius: 15px; padding: 20px; background-color: #ffe4e1; box-shadow: rgba(233, 30, 99, 0.2) 0px 7px 29px 0px; margin: 20px; text-align: center;">
    <h1 style="color: #ff1493; font-family: 'Comic Sans MS', cursive; font-size: 24px;">You've received a Valentine's Day Card! 💝</h1>
    <p style="font-size: 18px; color: #333;"><strong>To:</strong> ${card.to}</p>
    <p style="font-size: 18px; color: #333;"><strong>From:</strong> ${card.from}</p>
    <h2 style="color: #ff1493; font-family: 'Comic Sans MS', cursive; font-size: 22px;">Happy Valentine's Day!</h2>
    <p style="color: #333; font-size: 16px;">${card.message}</p>
</div>`;
            await axios.post('http://localhost:8787/api/cards/send-email', {
                ...emailFormData,
                message: emailContent,
                messageType: 'html'
            });
            setShowModal(false);
            alert('Valentine card sent successfully!');

            setSuccessMessage('Valentine card sent successfully!');
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
                    <EmailCard content={card.message} />
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

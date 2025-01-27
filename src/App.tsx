import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

interface Card {
  id: number
  to: string
  from: string
  message: string
  messageType: string
}

interface CardFormData {
  to: string
  from: string
  message: string
  messageType: 'custom' | 'improved' | 'sweet' | 'funny' | 'limerick'
}

interface EmailFormData {
  to: string
  from: string
  email: string
}

console.log(
  '%c🌐 Want a stunning website? 🚀 %cReach out to%c Joe Young %cjoseph.m.young2@gmail.com',
  'color: #51355a; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(81, 53, 90, 0.5);',
  'color: #3498db; font-size: 18px; font-weight: bold; text-decoration: underline;',
  'color: #e74c3c; font-size: 18px; font-weight: bold;',
  'color: #e67e22; font-size: 18px; font-weight: bold;'
);

const App = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [formData, setFormData] = useState<CardFormData>({
    to: '',
    from: '',
    message: '',
    messageType: 'custom'
  })
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [emailFormData, setEmailFormData] = useState<EmailFormData>({
    to: '',
    from: '',
    email: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getCards()
  }, [])

  const getCards = async () => {
    try {
      const response = await axios.get('http://localhost:8787/api/cards')
      setCards(response.data.cards)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    try {
      await axios.post('http://localhost:8787/api/cards', formData)
      getCards()
      setFormData({
        to: '',
        from: '',
        message: '',
        messageType: 'custom'
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'message' && formData.messageType === 'custom' && value.length > 300) {
      setError('Message cannot exceed 300 characters')
    } else {
      setError('')
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCardClick = (card: Card) => {
    setSelectedCard(card)
    setEmailFormData({
      to: card.to,
      from: card.from,
      email: ''
    })
    setShowModal(true)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCard) return

    try {
      await axios.post('http://localhost:8787/api/cards/send-email', {
        ...emailFormData,
        message: selectedCard.message,
        messageType: selectedCard.messageType
      })
      setShowModal(false)
      alert('Valentine card sent successfully!')
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send the card. Please try again.')
    }
  }

  return (
    <div className="container">
      <h1>Valentine's Day Cards</h1>

      <p>Create a custom card or use one of the predefined options and send it!</p>

      <form onSubmit={handleSubmit} className="card-form">
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="from">From:</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="messageType">Card Type:</label>
          <select
            id="messageType"
            name="messageType"
            value={formData.messageType}
            onChange={handleChange}
            required
          >
            <option value="custom">Custom Message</option>
            <option value="improved">Improved (AI enhances your message)</option>
            <option value="sweet">Sweet (AI generated)</option>
            <option value="funny">Funny (AI generated)</option>
            <option value="limerick">Limerick (AI generated)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required={formData.messageType === 'custom' || formData.messageType === 'improved'}
            placeholder={formData.messageType === 'custom' || formData.messageType === 'improved'
              ? "Write your message here..."
              : "Message will be AI generated"}
            disabled={!['custom', 'improved'].includes(formData.messageType)}
          />
          {formData.messageType === 'custom' && (
            <div className="message-info">
              <span className={`character-count ${formData.message.length > 300 ? 'error' : ''}`}>
                {formData.message.length}/300 characters
              </span>
              {error && <span className="error-message">{error}</span>}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isCreating || (formData.messageType === 'custom' && formData.message.length > 300)}
        >
          {isCreating ? 'Creating Card...' : 'Create Card'}
        </button>
        {isCreating && (
          <p className="creating-message">Please wait while we create your card!</p>
        )}
      </form>

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
    </div>
  )
}

export default App

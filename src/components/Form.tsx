import axios from 'axios';
import { useState } from 'react';

interface FormData {
  to: string;
  from: string;
  message: string;
  messageType: 'custom' | 'improved' | 'sweet' | 'funny' | 'limerick' | 'flavorflav' | 'rupaul' | 'deGrasseTyson' | 'goose';
}

interface FormProps {
  onCardCreated: () => void;
}

const Form = ({ onCardCreated }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    to: '',
    from: '',
    message: '',
    messageType: 'custom'
  });
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await axios.post('http://localhost:8787/api/cards', formData);
      onCardCreated();
      setFormData({
        to: '',
        from: '',
        message: '',
        messageType: 'custom'
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'message' && formData.messageType === 'custom' && value.length > 300) {
      setError('Message cannot exceed 300 characters');
    } else {
      setError('');
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
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
          <option value="flavorflav">Flavor Flav (AI generated)</option>
          <option value="rupaul">RuPaul (AI generated)</option>
          <option value="deGrasseTyson">Neil deGrasse Tyson (AI generated)</option>
          <option value="goose">Goose (AI generated)</option>
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
  );
};

export default Form;
import { useState } from 'react';
import './GeneralSettings.css';

// interface GeneralSettingsData {
//   availability: string;
//   attempts: string;
//   description: string;
//   tags: string;
// }

// interface GeneralSettingsProps {
//   formData: GeneralSettingsData;
//   onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
//   isOpen?: boolean;
// }

function GeneralSettings() {
  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState<boolean>(true);
  
  // Static data instead of props
  const [formData, setFormData] = useState({
    availability: "public",
    attempts: "unlimited",
    description: "",
    tags: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="general-settings-advanced-settings">
      <div
        className="general-settings-header"
        onClick={() => setIsGeneralSettingsOpen(!isGeneralSettingsOpen)}
      >
        <h3>⚙️ General Settings</h3>
        <span
          className={`general-settings-arrow ${
            isGeneralSettingsOpen
              ? "general-settings-arrow-up"
              : "general-settings-arrow-down"
          }`}
        >
          <i className="fas fa-chevron-down"></i>
        </span>
      </div>

      {isGeneralSettingsOpen && (
        <div className="general-settings-content">
          <div className="general-settings-form-row">
            <div className="general-settings-form-group">
              <label>Test Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <option value="public">Public (Anyone can access)</option>
                <option value="private">Private (Invited users only)</option>
                {/* <option value="premium">Premium (Paid users only)</option>
                <option value="draft">Draft (Not published)</option> */}
              </select>
            </div>
            <div className="general-settings-form-group">
              <label>Number of Attempts</label>
              <select
                name="attempts"
                value={formData.attempts}
                onChange={handleInputChange}
              >
                <option value="unlimited">Unlimited</option>
                <option value="1">1 Attempt</option>
                <option value="2">2 Attempts</option>
                <option value="3">3 Attempts</option>
                <option value="5">5 Attempts</option>
              </select>
            </div>
          </div>

          <div className="general-settings-form-group">
            <label>Test Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of this listening test, its objectives, and what students can expect..."
            />
          </div>

          <div className="general-settings-form-group">
            <label>Tags (for search)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., ielts, listening, academic, band7, practice"
            />
          </div>

        </div>
      )}
    </div>
  );
}

export default GeneralSettings;
// export type { GeneralSettingsData };

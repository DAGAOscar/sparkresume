import { SocialLink } from '@/type';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
  links: SocialLink[];
  setLinks: (links: SocialLink[]) => void;
};

const LinksForm: React.FC<Props> = ({ links, setLinks }) => {
  const [newLink, setNewLink] = useState<SocialLink>({
    label: '',
    url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SocialLink) => {
    setNewLink({ ...newLink, [field]: e.target.value });
  };

  const handleAddLink = () => {
    if (newLink.label.trim() && newLink.url.trim()) {
      setLinks([...links, { ...newLink, id: Date.now().toString() }]);
      setNewLink({ label: '', url: '' });
    }
  };

  const handleDeleteLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setLinks([]);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold text-base mb-3 uppercase">Social Links</h3>
        
        {/* Existing Links */}
        {links.length > 0 && (
          <div className="mb-4 space-y-2">
            {links.map((link, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-base-200 rounded">
                <div className="flex-1">
                  <p className="text-sm font-medium">{link.label}</p>
                  <p className="text-xs text-gray-600 truncate">{link.url}</p>
                </div>
                <button
                  onClick={() => handleDeleteLink(idx)}
                  className="btn btn-ghost btn-xs"
                  title="Delete link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Link */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Link Label (e.g., LinkedIn, GitHub, Portfolio)"
            value={newLink.label}
            onChange={(e) => handleChange(e, 'label')}
            className="input input-bordered w-full input-sm"
          />
          <input
            type="url"
            placeholder="URL (e.g., https://linkedin.com/in/yourname)"
            value={newLink.url}
            onChange={(e) => handleChange(e, 'url')}
            className="input input-bordered w-full input-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAddLink}
          className="btn btn-primary btn-sm flex-1"
        >
          <Plus className="w-4" />
          Add Link
        </button>
        {links.length > 0 && (
          <button
            onClick={handleReset}
            className="btn btn-ghost btn-sm"
          >
            <Trash2 className="w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LinksForm;

import React, { ChangeEvent, FormEvent } from 'react';
import { RequestData } from '../types/RequestData';

interface Props {
  formData: RequestData;
  setFormData: React.Dispatch<React.SetStateAction<RequestData>>;
  handlePhotoUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  getLocation: () => void;
  submitRequest: (e: FormEvent) => void;
}

const RequestForm: React.FC<Props> = ({
  formData,
  setFormData,
  // handlePhotoUpload,
  getLocation,
  submitRequest
}) => {
  return (
    <form onSubmit={submitRequest} className="max-w-lg w-full mx-auto p-6 bg-gray-100 shadow-lg rounded-lg space-y-4" action="/upload" method='POST' encType='multipart/form-data'>
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
      Name
    </label>
    <input
      id="name"
      type="text"
      placeholder="Your name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      className="w-full border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>

  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
  Message
</label>
<textarea
  id="message"
  placeholder="Type your message here"
  value={formData.message}
  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
  className="w-full border bg-white border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>


  <div>
    <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-1">
      What do you need?
    </label>
    <select
      id="needs"
      value={formData.needs}
      onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
      className="w-full border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="">Select a need</option>
      <option value="food">Food</option>
      <option value="water">Water</option>
      <option value="medical">Medical</option>
      <option value="shelter">Shelter</option>
    </select>
  </div>

  <div>
    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
      Upload a photo
    </label>
    <input
      id="photo"
      title="image"
      type="file"
      accept="image/*"
      // onChange={handlePhotoUpload}
      className="w-full bg-white"
    />
  </div>

  <div className="flex flex-col sm:flex-row gap-3">
    <button
      type="button"
      onClick={getLocation}
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
    >
      Get Location
    </button>
    <button
      type="submit"
      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200"
    >
      Submit Request
    </button>
  </div>
    <div>
    <p className="font-semibold">Offline Access:</p>
    <p>Call: 1-800-XXX-XXXX (leave voicemail with name, needs, location)</p>
    </div>
</form>

  );
};

export default RequestForm;

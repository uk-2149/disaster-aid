import React from 'react';
import { RequestData } from '../types/RequestData';

const RequestCard: React.FC<{ request: RequestData }> = ({ request }) => {
  return (
    <div className={`border p-4 ${request.status === 'pending_manual' ? 'bg-red-100' : ''}`}>
      <p><strong>Name:</strong> {request.name}</p>
      <p><strong>Needs:</strong> {request.needs}</p>
      <p>
        <strong>Location:</strong>{' '}
        {request.location?.address || `${request.location?.lat}, ${request.location?.lng}`}
      </p>
      <p><strong>Status:</strong> {request.status}</p>
      <p><strong>Source:</strong> {request.source}</p>
      {request.photo && (
        <p>
          <strong>Photo:</strong>{' '}
<a href={typeof request.photo === 'string' ? request.photo : '#'} target="_blank" rel="noopener noreferrer">
  View
</a>

        </p>
      )}
      {request.recording && (
        <p>
          <strong>Voicemail:</strong>{' '}
          <a href={request.recording} target="_blank">Listen</a>
        </p>
      )}
    </div>
  );
};

export default RequestCard;

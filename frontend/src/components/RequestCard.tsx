import React, { useEffect, useState } from "react";
import { RequestData } from "../types/RequestData";

const RequestCard: React.FC<{ request: RequestData }> = ({ request }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setAudioError("No token found in localStorage");
          console.error("No token found in localStorage");
          return;
        }

        const res = await fetch(
          `http://localhost:3000/api/recording/${request.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errText = await res.text();
          setAudioError(`Failed to fetch audio: ${res.status} ${errText}`);
          console.error("Fetch audio error:", res.status, errText);
          return;
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        return () => URL.revokeObjectURL(url);
      } catch (err) {
        setAudioError(`Error fetching audio: ${err}`);
        console.error("Error in fetchAudio:", err);
      }
    };

    if (request.recording) {
      fetchAudio();
    }
  }, [request.id, request.recording]);

  return (
    <div
      className={`rounded-lg p-6 shadow-md border transition-all duration-200 ${
        request.status === "pending_manual"
          ? "bg-red-100 border-red-300"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="space-y-2 text-gray-800">
        <p>
          <span className="font-semibold text-gray-600">Name:</span>{" "}
          {request.name}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Needs:</span>{" "}
          {request.needs}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Message:</span>{" "}
          {request.message}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Phone:</span>{" "}
          {request.phone}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Location:</span>{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${request.location?.lat},${request.location?.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            {request.location?.address ||
              `${request.location?.lat}, ${request.location?.lng}`}
          </a>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Status:</span>
          <span
            className={`ml-1 px-2 py-1 rounded text-xs font-medium ${
              request.status === "pending_manual"
                ? "bg-red-200 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {request.status}
          </span>
        </p>
        <p>
          <span className="font-semibold text-gray-600">Source:</span>{" "}
          {request.source}
        </p>
        {request.photo && (
          <p>
            <span className="font-semibold text-gray-600">Photo:</span>{" "}
            <a
              href={typeof request.photo === "string" ? request.photo : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View
            </a>
          </p>
        )}
        {request.recording && audioUrl && (
          <div className="mt-2">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        {request.recording && audioError && (
          <p className="text-red-600">{audioError}</p>
        )}
      </div>
    </div>
  );
};

export default RequestCard;

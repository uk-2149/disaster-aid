import { useState, useEffect } from "react";
import RequestCard from "../components/RequestCard";
import { RequestData } from "../types/RequestData";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import NavBar from "../components/NavBar";

function AdminDashboard() {
  const [filter, setFilter] = useState<string>("all");
  const [requests, setRequests] = useState<RequestData[]>([]);

  const getRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const requestList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RequestData[];

      setRequests(requestList);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => req.source === filter);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Aid Requests
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 shadow rounded-lg mb-6">
          <div className="mb-2 sm:mb-0">
            <label className="text-gray-700 font-medium mr-2">
              Filter by Source:
            </label>
            <select
              title="request medium"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="all">All</option>
              <option value="web">Web</option>
              <option value="call">Call</option>
            </select>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredRequests.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

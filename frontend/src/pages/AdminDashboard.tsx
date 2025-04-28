import { useState } from "react";
import RequestCard from "../components/RequestCard"
import { RequestData } from "../types/RequestData";

function AdminDashboard() {

    const [filter, setFilter] = useState<string>('all');
    const [requests, setRequests] = useState<RequestData[]>([]);


    const filteredRequests =
    filter === 'all' ? requests : requests.filter((req) => req.source === filter);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Aid Requests</h2>
      <div className="mb-4">
        <label className="mr-2">Filter by Source:</label>
        <select
          title='request medium'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="web">Web</option>
          <option value="audio">Audio</option>
          <option value="mms">MMS</option>
        </select>
      </div>
      {filteredRequests.map((req) => (
        <RequestCard request={req} />
      ))}

    </div>
  )
}

export default AdminDashboard

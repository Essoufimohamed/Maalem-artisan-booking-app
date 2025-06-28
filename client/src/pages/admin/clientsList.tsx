import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle } from "lucide-react";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchClients = async (currentPage) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:5000/api/users/clients?page=${currentPage}`
            );
            setClients(res.data.clients || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.error("Failed to fetch clients", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients(page);
    }, [page]);

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UserCircle className="w-6 h-6" />
                Clients
            </h1>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="text-center p-6">
                                    Loading...
                                </td>
                            </tr>
                        ) : clients.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-6">
                                    No clients found.
                                </td>
                            </tr>
                        ) : (
                            clients.map((client) => (
                                <tr key={client._id} className="border-b">
                                    <td className="px-6 py-4">{client.name}</td>
                                    <td className="px-6 py-4">
                                        {client.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.phone || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.location || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            client.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between p-4">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Clients;

import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/contact"; // Backend URL

// ✅ User info aur token localStorage se lo
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  const user = getUser();
  return user?.token || null;
};

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);

  // ✅ Send Contact Message
  const sendContactMessage = async (formData) => {
    setLoading(true);
    setError(null);

    const user = getUser();
    if (!user) {
      setError("User not logged in");
      setLoading(false);
      return null;
    }

    try {
      const res = await axios.post(`${API_URL}/send/${user._id}`, formData);

      if (!res.data?.success) {
        setError("Failed to send message");
        return null;
      }

      setContacts((prev) => [...prev, res.data.data]);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get Contacts by User ID
  const getContactsByUserId = useCallback(async () => {
    setLoading(true);
    setError(null);

    const user = getUser();
    if (!user) {
      setError("User not logged in");
      setLoading(false);
      return [];
    }

    try {
      const res = await axios.get(`${API_URL}/user/${user._id}`);

      if (!res.data?.success) {
        setError("No messages found for this user");
        return [];
      }

      setContacts(res.data.data);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch messages");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    contacts,
    sendContactMessage,
    getContactsByUserId,
  };
};

export default useContact;

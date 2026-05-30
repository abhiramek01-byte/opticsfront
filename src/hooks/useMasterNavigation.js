import { useState, useEffect } from "react";

export function useMasterNavigation(endpoint, defaultData) {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [formData, setFormData] = useState(defaultData);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(data);
      // We can start by selecting the first item if list is not empty, or leave it ready to create.
      // Usually users want clear screen to create, and can navigate to view past.
      // Let's keep it cleared.
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setFormData(items[nextIndex]);
      setIsEditMode(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setFormData(items[prevIndex]);
      setIsEditMode(false);
    }
  };

  const handleClear = () => {
    setFormData(defaultData);
    setCurrentIndex(-1);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    if (currentIndex >= 0 && items.length > 0) {
      setIsEditMode(true);
    }
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      // Determine if we are updating an existing record or creating a new one
      const isUpdating = currentIndex >= 0 && isEditMode && formData.id;
      const method = isUpdating ? "PUT" : "POST";
      const url = isUpdating 
        ? `${import.meta.env.VITE_API_URL}/${endpoint}/${formData.id}` 
        : `${import.meta.env.VITE_API_URL}/${endpoint}`;

      // Clean payload for POST
      const payload = { ...formData };
      if (method === "POST") {
        delete payload.id;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        throw new Error("Failed to save data");
      }
      
      const data = await res.json();
      alert(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Saved Successfully!`);
      
      await fetchItems();
      handleClear();
    } catch (err) {
      console.error(err);
      alert(`Error saving ${endpoint}`);
    }
  };

  // State derivations for the UI
  // Cannot go previous if no items or at the start
  const isFirst = items.length === 0 || currentIndex <= 0;
  // Cannot go next if no items, or at the end, or if currently in "new" mode (currentIndex == -1)
  const isLast = items.length === 0 || currentIndex === items.length - 1 || currentIndex === -1;
  // Viewing is true if we are looking at an existing record, and NOT editing.
  // When viewing, form inputs should be disabled/readonly.
  const isViewing = currentIndex >= 0 && !isEditMode;
  
  return {
    items,
    formData,
    setFormData,
    handleNext,
    handlePrevious,
    handleClear,
    handleEdit,
    handleSave,
    isFirst,
    isLast,
    isViewing,
    isEditMode,
    currentIndex
  };
}

import { useState, useEffect } from "react";

const UpdateItem = ({ itemId }) => {
    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${itemId}`;
    
    const [item, setItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState("");
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(API_URI);
                if (!response.ok) throw new Error("Failed to fetch item");
                const data = await response.json();
                setItem(data);
                setUpdatedItem(data.name || "");
            } catch (error) {
                console.error(error);
            }
        };
        fetchItem();
    }, [API_URI]);

    const handleInputChanges = (e) => {
        setUpdatedItem(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URI, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedItem }),
            });
            const data = await response.json();
            setApiResponse(data);
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <div>
            {item ? (
                <form onSubmit={handleSubmit}>
                    <p>Existing Item: {item.name}</p>
                    <input type="text" value={updatedItem} onChange={handleInputChanges} />
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
            {apiResponse && <p>Update Successful: {JSON.stringify(apiResponse)}</p>}
        </div>
    );
};

export default UpdateItem;
import React, { useState } from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, closeModal, sendDataToBackend }) => {
    const [formData, setFormData] = useState({
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendDataToBackend(formData);
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
        >
            <h2>Modal Title</h2>
            <form onSubmit={handleSubmit}>
                {/* Your form inputs */}
                <label>
                    Data:
                    <input
                        type="text"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    );
};

export default CustomModal;

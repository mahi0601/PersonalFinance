import React, { useState } from 'react';
import axios from '../../utils/api';
import '../../assets/css/transactionmanagement.css';

const CsvPage = () => {
    const [file, setFile] = useState(null);

    const handleFileUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('/transactions/transactions/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };

    const handleFileDownload = async () => {
        try {
            const response = await axios.get('/transactions/download', {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download file');
        }
    };

    return (
        <div className="csv-page">
            <h1>CSV Import/Export</h1>
            <div className="upload-section">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".csv"
                />
                <button onClick={handleFileUpload}>Upload CSV</button>
            </div>
            <div className="download-section">
                <button onClick={handleFileDownload}>Download Transactions</button>
            </div>
        </div>
    );
};

export default CsvPage;

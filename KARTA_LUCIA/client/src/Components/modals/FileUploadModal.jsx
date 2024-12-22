import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const FileUploadModal = ({ isOpen, onClose, onUpload }) => {
    const [uploads, setUploads] = useState([]);

    const onDrop = (acceptedFiles) => {
        // Create upload entries for each file
        const newUploads = acceptedFiles.map(file => ({
            file,
            progress: 0,
            id: Math.random().toString(36).substring(7)
        }));

        setUploads(prev => [...prev, ...newUploads]);

        // Simulate upload progress for each file
        newUploads.forEach(upload => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                setUploads(prev =>
                    prev.map(u =>
                        u.id === upload.id
                            ? { ...u, progress }
                            : u
                    )
                );

                if (progress >= 100) {
                    clearInterval(interval);
                    onUpload?.(upload.file);
                }
            }, 100);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        multiple: true
    });

    const handleClose = () => {
        onClose();
        // Clear uploads after a brief delay
        setTimeout(() => {
            setUploads([]);
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg mx-4">
                <h2 className="text-2xl text-center text-black-500 mb-8">UPLOAD YOUR FILES</h2>

                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 mb-6 cursor-pointer transition-colors
            ${isDragActive ? 'border-black-500 bg-blue-50' : 'border-gray-300 hover:border-black'}`}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-black-500 mb-4" />
                        <p className="text-black text-center">
                            {isDragActive
                                ? "Drop your files here"
                                : "Drag files here or browse files to upload"
                            }
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            You can select multiple files
                        </p>
                    </div>
                </div>

                {uploads.length > 0 && (
                    <div className="max-h-48 overflow-y-auto">
                        {uploads.map(upload => (
                            <div key={upload.id} className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {upload.file.name}
                  </span>
                                    <span className="text-sm text-gray-500">
                    {upload.progress}%
                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-black h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${upload.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className=" flex justify-end">
                    <button
                        onClick={handleClose}
                        className="px-4 text-gray-500 hover:text-gray-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploadModal;
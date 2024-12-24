import React, { useEffect, useState } from "react";
import {
  createPortfolio,
  getPortfolioByIdOrAll,
  updatePortfolio,
} from "../services/portfolioService";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FileUploadModal from '../Components/modals/FileUploadModal'
import { X } from 'lucide-react';
import Constants from '../utilities/constants'; 

const Loader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div>
);



const FilePreviewList = ({ files, onDelete }) => {
   if( !files || typeof files === 'string' ||  files.length <= 0 ) {
     return <div></div>
   }
  return (
      <div className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md p-4 mb-4 w-[40vw] min-h-[40px]">
        <div className="grid grid-cols-2 gap-4">
          {files.map((file, index) => (
              <div
                  key={index}
                  className="relative group bg-white p-2 rounded-lg shadow-sm"
              >
                {/* Preview */}
                <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                  <img
                      src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.png"; // Add a placeholder image path
                      }}
                  />
                </div>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
          ))}
        </div>
      </div>
  );
};

const WorkAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  let portfolioId = null;

  if (searchParams.has("id")) {
    portfolioId = searchParams.get("id");
  }
  function parseImages(imageUrl) {
    if(!imageUrl) return;
    let url=[];
    try {
      const imageArray = JSON.parse(imageUrl);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        url = imageArray;
      }
    } catch (e) {
      url=[imageUrl]
    }
   setUploadedFiles(url)
  }

  useEffect(() => {
    const fetchPlanById = async () => {
      try {
        const data = await getPortfolioByIdOrAll(portfolioId);
        parseImages(data.data.imageUrl);
        setBannerUrl(data.data.bannerUrl);
        setAboutUrl(data.data.aboutUrl);
        setImageUrl(data.data.imageUrl);
        setVideoUrl(data.data.videoUrl);
        setAbout(data.data.about);
        setTitle(data.data.title);
        setDesc(data.data.desc);
        setWorkUrl_1(data.data.workUrl_1);
        setWorkUrl_2(data.data.workUrl_2);
        setWorkUrl_3(data.data.workUrl_3);
        setWorkUrl_4(data.data.workUrl_4);
        setWorkUrl_5(data.data.workUrl_5);
        setWorkUrl_6(data.data.workUrl_6);
        setWorkUrl_7(data.data.workUrl_7);
        setWorkUrl_8(data.data.workUrl_8);
        setWorkUrl_9(data.data.workUrl_9);
        setWorkUrl_10(data.data.workUrl_10);
        setWorkUrl_11(data.data.workUrl_11);
        setWorkUrl_12(data.data.workUrl_12);
        setWorkUrl_13(data.data.workUrl_13);
        setWorkUrl_14(data.data.workUrl_14);
        setWorkUrl_15(data.data.workUrl_15);
        setWorkUrl_16(data.data.workUrl_16);
        setWorkUrl_17(data.data.workUrl_17);
        setWorkUrl_18(data.data.workUrl_18);
      } catch (error) {
        console.error("Error fetching plan details:", error);
      }
    };

    fetchPlanById();
  }, [portfolioId]);

  const [bannerUrl, setBannerUrl] = useState("");
  const [aboutUrl, setAboutUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const [workUrl_1, setWorkUrl_1] = useState("");
  const [workUrl_2, setWorkUrl_2] = useState("");
  const [workUrl_3, setWorkUrl_3] = useState("");
  const [workUrl_4, setWorkUrl_4] = useState("");
  const [workUrl_5, setWorkUrl_5] = useState("");
  const [workUrl_6, setWorkUrl_6] = useState("");
  const [workUrl_7, setWorkUrl_7] = useState("");
  const [workUrl_8, setWorkUrl_8] = useState("");
  const [workUrl_9, setWorkUrl_9] = useState("");
  const [workUrl_10, setWorkUrl_10] = useState("");
  const [workUrl_11, setWorkUrl_11] = useState("");
  const [workUrl_12, setWorkUrl_12] = useState("");
  const [workUrl_13, setWorkUrl_13] = useState("");
  const [workUrl_14, setWorkUrl_14] = useState("");
  const [workUrl_15, setWorkUrl_15] = useState("");
  const [workUrl_16, setWorkUrl_16] = useState("");
  const [workUrl_17, setWorkUrl_17] = useState("");
  const [workUrl_18, setWorkUrl_18] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //TODO:- WILL REMOVE
  console.log("Title:", title);
  console.log("Desc:", desc);

  const handleFileUpload = (file) => {
    setUploadedFiles(prev => [...prev, file]);
    // Here you can handle the file, e.g., send it to a server
    console.log('File uploaded:', file);
  };


  const handleDeleteFile = (indexToDelete) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const MAX_FILES = 12;

  const validateFiles = (files, existingFiles = []) => {
    // Check for total number of files
    const totalFiles = files.length + existingFiles.length;
    if (totalFiles > MAX_FILES) {
      alert(`Cannot upload more than ${MAX_FILES} images. Currently selected: ${totalFiles}`);
      return false;
    }

    // Check each new file
    for (const file of files) {
      // Skip if it's a string (existing URL)
      if (typeof file === 'string') continue;

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        alert(`File "${file.name}" exceeds 10MB size limit`);
        return false;
      }

      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        alert(`File "${file.name}" is not an image`);
        return false;
      }
    }

    return true;
  };


  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (!title.trim() ) {
        alert("Required fields are missing");
        setIsLoading(false)
        return;
      }
      // Validate files before processing
      if (!validateFiles(uploadedFiles)) {
        setIsLoading(false);
        return;
      }

      // Upload files first
      // Handle file uploads to Cloudinary
      let uploadedUrls = [];
      const filesFromCloudinary = [];

      if (uploadedFiles.length > 0) {
        try {
          // Process each file for upload
          const uploadPromises = uploadedFiles.map(async (file) => {
            // If the file is already a URL (previously uploaded), keep it
            if (typeof file === 'string') {
              filesFromCloudinary.push(file);
              return null;
            }

            // Create FormData for each file
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'kartalucia');
            data.append('cloud_name', 'dulvlbprk');
            data.append('resource_type', 'auto');

            // Upload to Cloudinary
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dulvlbprk/image/upload',
                {
                  method: 'POST',
                  mode: "cors",
                  body: data,
                  headers: {
                    'Accept': 'application/json'
                  }
                }
            );

            if (!response.ok) {
              alert('Upload failed', );
              setIsLoading(false);
              return;
            }

            const responseData = await response.json();
            return responseData.secure_url;
          });

          // Wait for all uploads to complete
          const results = await Promise.all(uploadPromises);
          // Filter out null values (from existing URLs) and add to uploadedUrls
          uploadedUrls = results.filter(url => url !== null);

          console.log('Upload successful:', uploadedUrls);
          setIsLoading(false);
        } catch (error) {
          alert('Upload Failed', error.message)
          setIsLoading(false);
          console.error('Upload failed:', error);
          return
        }
      }

      const portfolioData = {
        bannerUrl,
        aboutUrl,
        title,
        imageUrl: uploadedUrls?.length > 0 ? JSON.stringify([...uploadedUrls,...filesFromCloudinary]) :JSON.stringify( [...filesFromCloudinary]), // Use existing imageUrl if no new uploads
        videoUrl,
        about:'.',
        desc,
        workUrl_1: workUrl_1,
        workUrl_2: workUrl_2,
        workUrl_3: workUrl_3,
        workUrl_4: workUrl_4,
        workUrl_5: workUrl_5,
        workUrl_6: workUrl_6,
        workUrl_7: workUrl_7,
        workUrl_8: workUrl_8,
        workUrl_9: workUrl_9,
        workUrl_10: workUrl_10,
        workUrl_11: workUrl_11,
        workUrl_12: workUrl_12,
        workUrl_13: workUrl_13,
        workUrl_14: workUrl_14,
        workUrl_15: workUrl_15,
        workUrl_16: workUrl_16,
        workUrl_17: workUrl_17,
        workUrl_18: workUrl_18,
      };

      if (portfolioId) {
        await updatePortfolio(portfolioId, portfolioData);
        alert("Portfolio updated successfully!");
      } else {
        await createPortfolio(portfolioData);
        alert("Portfolio created successfully!");
      }

      navigate("/WorkList");

    } catch (error) {
      console.error("Error:", error);
      alert("Error in saving portfolio" , error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex items-center h-screen">
      <Sidebar />

      <div className="flex flex-col justify-center items-center flex-grow">
        {isLoading && <Loader />}
        <div className="bg-white rounded-md shadow-md p-6">
          {portfolioId ? (
            <h2 className="text-xl text-black text-center font-bold m-4">
              Update Work
            </h2>
          ) : (
            <h2 className="text-xl text-black text-center font-bold m-4">
              Add Work
            </h2>
          )}

          <div
            className="w-full overflow-y-auto"
            style={{ maxHeight: "70vh", width: "70vw" }}
          >
            <div>
              <div className="mb-6">
                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>Title: </label>

                  <input
                      placeholder="Title"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={title}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>Desc: </label>

                  <input
                      placeholder="Desc"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={desc}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setDesc(e.target.value)}
                  />
                </div>


                <div className="flex !justify-between items-center mr-5">
                  {/* Upload Button */}
                  <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  >
                    Upload Images
                  </button>

                  {/* Display uploaded files */}
                        <FilePreviewList
                            files={uploadedFiles}
                            onDelete={handleDeleteFile}
                        />

                  {/* File Upload Modal */}
                  <FileUploadModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onUpload={handleFileUpload}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Video Url:{" "}
                  </label>
                  <input
                      placeholder="Video Url"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={videoUrl}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>


                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 1:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 1"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_1}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_1(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 2:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 2"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_2}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_2(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 3:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 3"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_3}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_3(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 4:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 4"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_4}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_4(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 5:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 5"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_5}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_5(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 6:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 6"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_6}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_6(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 7:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 7"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_7}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_7(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 8:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 8"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_8}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_8(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 9:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 9"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_9}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_9(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 10:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 10"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_10}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_10(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 11:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 11"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_11}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_11(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 12:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 12"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_12}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_12(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 13:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 13"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_13}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_13(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 14:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 14"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_14}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_14(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 15:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 15"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_15}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_15(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 16:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 16"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_16}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_16(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 17:{" "}
                  </label>

                  <input
                      placeholder="Work -  URL 17"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_17}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_17(e.target.value)}
                  />
                </div>

                <div className="flex !justify-between items-center mr-5">
                  <label style={{textTransform: "uppercase"}}>
                    Work - URL 18:{" "}
                  </label>
                  <input
                      placeholder="Work -  URL 18"
                      className="bg-gray-300 text-gray-700 border border-gray-400 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={workUrl_18}
                      style={{width: "40vw", textAlign: "center"}}
                      onChange={(e) => setWorkUrl_18(e.target.value)}
                  />
                </div>
              </div>
              <div style={{textAlign: "center"}}>
                <button
                    className="mx-auto bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkAdmin;

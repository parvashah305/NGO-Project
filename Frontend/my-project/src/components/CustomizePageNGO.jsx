import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import img1 from "../assets/img1.jpg";

const CustomizePageNGO = () => {
  const [ngoName, setNgoName] = useState("Your NGO Name");
  const [description, setDescription] = useState(`
    <p>
      Welcome to our NGO! We are dedicated to making the world a better place 
      by addressing critical social issues. Our initiatives aim to empower 
      communities, provide education, and support sustainable development.
    </p>
    <br/>
    <p>
      Welcome to our NGO! We are dedicated to making the world a better place 
      by addressing critical social issues. Our initiatives aim to empower 
      communities, provide education, and support sustainable development.
    </p>
    <br/>
    <p>
      Welcome to our NGO! We are dedicated to making the world a better place 
      by addressing critical social issues. Our initiatives aim to empower 
      communities, provide education, and support sustainable development.
    </p>
  `);
  const [image, setImage] = useState([img1]);
  const [contactInfo, setContactInfo] = useState({
    phone: "123-456-7890",
    email: "contact@ngo.org",
    address: "123 NGO Street, City, Country",
  });
  const [blogs, setBlogs] = useState(`
    <p>Start writing your blog content here...</p>
  `);
  const [media, setMedia] = useState({
    images: [],
    videos: [],
  });

  const descriptionEditor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  const blogsEditor = useEditor({
    extensions: [StarterKit],
    content: blogs,
    onUpdate: ({ editor }) => {
      setBlogs(editor.getHTML());
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 600;
          const maxHeight = 600;

          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = width * ratio;
            height = height * ratio;
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          const resizedImage = canvas.toDataURL("image/jpeg");

          setImage([...image, resizedImage]);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "image") {
        setMedia({ ...media, images: [...media.images, url] });
      } else if (type === "video") {
        setMedia({ ...media, videos: [...media.videos, url] });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NGO Header */}
      <div className="bg-black text-white text-center py-6">
        <h1
          contentEditable
          suppressContentEditableWarning
          className="text-4xl font-bold"
          onBlur={(e) => setNgoName(e.target.textContent)}
        >
          {ngoName}
        </h1>
      </div>

      {/* About Us Section */}
      <div className="bg-white px-6 lg:px-20 py-12 ">
        <h2 className="text-4xl font-bold mb-6 text-center ">About Us</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between pt-6">
          

          <div className="lg:w-1/2 lg:pr-10  lg:text-left">
            <EditorContent editor={descriptionEditor} />
          </div>
          
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={image}
              alt="NGO"
              className="w-full h-auto object-contain rounded"
            />
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-white text-black py-12 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
        <div className="flex flex-col space-y-8 lg:space-y-10">
          
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 text-white rounded-full p-4">
              <i className="ri-home-line text-2xl"></i>
            </div>
            <div>
              <p className="font-semibold text-xl">Address</p>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-lg"
                onBlur={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    address: e.target.textContent,
                  })
                }
              >
                {contactInfo.address}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 text-white rounded-full p-4">
              <i className="ri-phone-line text-2xl"></i>
            </div>
            <div>
              <p className="font-semibold text-xl">Phone</p>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-lg"
                onBlur={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    phone: e.target.textContent,
                  })
                }
              >
                {contactInfo.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 text-white rounded-full p-4">
              <i className="ri-mail-line text-2xl"></i>
            </div>
            <div>
              <p className="font-semibold text-xl">Email</p>
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-lg"
                onBlur={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    email: e.target.textContent,
                  })
                }
              >
                {contactInfo.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Media and Blogs Section */}
      <div className="bg-white py-12 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-6">Media and Blogs</h2>
        <div className="mt-4">
          <EditorContent editor={blogsEditor} />
        </div>
        
        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">
            Upload an Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleMediaUpload(e, "image")}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded px-3 py-2"
          />
          {media.images.map((img, index) => (
            <div key={index} className="mt-4">
              <img
                src={img}
                alt={`Uploaded Image ${index + 1}`}
                className="max-w-full max-h-72 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">
            Upload a Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleMediaUpload(e, "video")}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded px-3 py-2"
          />
          {media.videos.map((video, index) => (
            <div key={index} className="mt-4">
              <video controls className="w-full max-h-72">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizePageNGO;

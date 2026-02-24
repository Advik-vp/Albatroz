"use client";
import Sidebar from "../../../components/Sidebar";
import { userdetails } from "../../../../utils/api";
import { useRef, useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";

export default function MyProfilePage() {
  useEffect(() => {
    const fetchUserDetails = async () => {
      const useremail = localStorage.getItem("user-email");
      const res = await userdetails(useremail);
      if (res.success) {
        setFormData({
          firstName: res.data.user.firstname,
          lastName: res.data.user.lastname,
          email: res.data.user.email,
          password: res.data.user.password,
        });
      } else {
        Error("Error fetching user details:", res.message);
      }
    };
    fetchUserDetails();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("Image must be less than 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen bg-purple-100 text-gray-900">
      <Sidebar />
      <main className="min-h-screen p-7 w-[1250px]">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="text-gray-700 mb-4">
          Manage your profile details and credentials.
        </p>
        <hr className="mt-2 border-2 border-purple-200 rounded mb-5 " />
        {/* Add editable profile info form */}
        <div className="relative bg-white shadow-2xl rounded-3xl p-8">
          {/* <div className="flex flex-col items-center mb-6">
            <div
              className="relative w-32 h-32 rounded-full  overflow-hidden  shadow-lg cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={image || "/user-male-circle.png"}
                alt="Profile"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                
              />
              <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-3xl">
                  <LiaUserEditSolid />
                </span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={formData.firstName.length !== 0}
                  placeholder="First Name"
                  className="mt-1 w-full disabled:bg-gray-100 rounded-lg border-2 border-blue-900 border-opacity-50 px-2 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={formData.lastName.length !== 0}
                  placeholder="Last Name"
                  className="mt-1 w-full disabled:bg-gray-100 rounded-lg border-2 border-blue-900 border-opacity-50 px-2 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={formData.email.length !== 0}
                placeholder="Email"
                className="mt-1 w-full disabled:bg-gray-100 rounded-lg border-2 border-blue-900 border-opacity-50 px-2 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={formData.password.length !== 0}
                placeholder="Password"
                className="mt-1 w-full disabled:bg-gray-100 rounded-lg border-2 border-blue-900 border-opacity-50 px-2 py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={
                formData.firstName.length !== 0 ||
                formData.lastName.length !== 0 ||
                formData.email.length !== 0 ||
                formData.password.length !== 0
              }
              className="w-full bg-blue-900 text-white font-medium py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Camera, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "@/config/axios";
import { setUser } from "@/slices/authSlice";

const ProfileModel = ({ setOpenProfileModel }) => {
  const { user } = useSelector((state) => state.auth);
  const [userInputs, setUserInputs] = useState({});
  const [hovered, setHovered] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(user?.profile_pic);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setUserInputs((values) => ({ ...values, profile_pic: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setUserInputs({
      name: user?.name,
      email: user?.email,
      profile_pic: user?.profile_pic,
      password: "",
      user_id: user?._id,
    });
  }, [user]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInputs((values) => ({ ...values, [name]: value }));
  };

  const EditProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", userInputs?.name);
    formData.append("email", userInputs?.email);
    formData.append("profile_pic", userInputs?.profile_pic);
    formData.append("user_id", userInputs?.user_id);
    if (userInputs?.password) {
      formData.append("password", userInputs?.password);
    }
    try {
      const response = await axios.put("/user/update_user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      toast.success("User updated Successfully");

      let dataFromApi = response?.data?.data;

      let tempUser = {
        ...user,
        profile_pic: dataFromApi.profile_pic,
        email: dataFromApi.email,
        name: dataFromApi.name,
      };

      dispatch(setUser(tempUser));
      localStorage.setItem("userInfo", JSON.stringify(tempUser));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <div className="bg-white w-80  h-auto p-2 rounded-md ">
          <div className="grid place-content-end">
            <X
              onClick={() => setOpenProfileModel(false)}
              className="cursor-pointer bg-red-500 rounded-full p-1 text-white"
              size={25}
            />
          </div>
          <div className="flex items-center flex-col gap-3">
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative w-40 h-40"
            >
              {/* <Avatar
                alt={userInputs?.name}
                src={imagePreviewUrl}
                sx={{ width: 156, height: 156 }}
                className={` w-full h-full object-cover rounded-full shadow-lg ${
                  hovered ? "blur-sm " : ""
                } transition duration-300`}
              /> */}

              <Avatar className="w-40 h-40 rounded-full overflow-hidden">
                <AvatarImage
                  src={imagePreviewUrl}
                  className={` w-full h-full object-cover rounded-full shadow-lg ${
                    hovered ? "blur-sm " : ""
                  } transition duration-300`}
                />
                <AvatarFallback>
                  {userInputs?.name
                    ? userInputs?.name.substring(0, 2).toUpperCase()
                    : null}
                </AvatarFallback>
              </Avatar>

              {hovered && (
                <div
                  onClick={handleButtonClick}
                  className="absolute inset-0 flex items-center justify-center  text-white text-sm font-bold cursor-pointer rounded-full "
                >
                  <Camera size={30} />
                </div>
              )}

              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="mt-3 gap-2 flex flex-col">
              <input
                type="text"
                placeholder="Your Name"
                value={userInputs.name || ""}
                onChange={handleChange}
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg  w-full p-2 outline-none"
              />

              <input
                type="email"
                placeholder="name@company.com"
                value={userInputs.email || ""}
                onChange={handleChange}
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg  w-full p-2 outline-none"
              />

              <input
                type="password"
                placeholder="••••••••"
                value={userInputs.password || ""}
                onChange={handleChange}
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg  w-full p-2 outline-none"
              />

              <button
                className="w-full bg-slate-900  py-2.5 text-white tracking-wider hover:bg-slate-950 transition-colors duration-300  rounded-lg mt-2 disabled:cursor-not-allowed"
                onClick={EditProfile}
                disabled={loading}
              >
                {loading ? "Loading..." : " Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfileModel;

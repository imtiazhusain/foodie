import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import axios from "@/config/axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AddItem = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image) {
      toast.error("Please upload product image");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("image", image);
    try {
      let result = await axios.post("/food/add_item", formData, {
        headers: {
          "Content-Type": "multipart/form-data ",
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      toast.success("Product added successfully");

      setData({
        name: "",
        // description: "",
        category: "Salad",
        price: "",
      });
      setImage(null);
    } catch (error) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto w-full ">
      <div className="flex flex-col items-start justify-center gap-7 ">
        <h2 className="font-semibold text-lg">Add New Item</h2>
        <form
          action=""
          className="flex flex-col gap-4  "
          onSubmit={handleOnSubmit}
        >
          <div>
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload image"
                className="max-w-28"
              />
            </label>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="product-name" className="text-gray-500">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Product Name"
              id="product-name"
              value={data.name || ""}
              onChange={handleOnchange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500" htmlFor="description">
              Product Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Describe Product"
              rows={6}
              value={data.description || ""}
              onChange={handleOnchange}
              required
            ></textarea>
          </div>

          <div className="grid  xs:grid-cols-2 gap-3 ">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="category" className="text-gray-500">
                Product Category
              </label>
              <select
                name="category"
                id="category"
                className=""
                value={data.category}
                onChange={handleOnchange}
                required
              >
                <option value="Salad">salad</option>
                <option value="Rolls">Roll</option>
                <option value="Deserts">Desert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="price" className="text-gray-500">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="$20"
                value={data.price || ""}
                onChange={handleOnchange}
                required
              />
            </div>
          </div>
          <Button disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;

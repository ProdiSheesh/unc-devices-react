import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { InventoryTable } from "./InventoryTable";
import axios from "axios";
import { URL } from "../../config/global";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const [devices, setDevices] = useState([]); // put fetch data here
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const response = await axios.get(`${URL}/devices`);

      setDevices(response.data);

      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${URL}/devices/${id}`);
      console.log(response);
      setIsLoading(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSearch(data) {
    try {
      setIsLoading(true);

      const response = await axios.get(`${URL}/devices?q=${data.query}`);

      setDevices(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="bg-[#fdfdfd] h-screen">
      <Sidebar />

      <section className="ml-[17rem] p-8">
        {isLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <InventoryTable
              data={devices}
              onDelete={handleDelete}
              onNavigate={navigate}
              onSearch={handleSearch}
            />
          </div>
        )}
      </section>
    </main>
  );
}

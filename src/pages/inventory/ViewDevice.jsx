import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config/global";
import { MdArrowBack, MdDeleteOutline, MdEdit } from "react-icons/md";
import { useCookies } from "react-cookie";

export default function ViewDevice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        };

        const response = await axios.get(`${URL}/devices/${id}`, config);
        console.log(response.data);
        setDevice(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [cookies.token, id]);

  async function handleDelete(id) {
    try {
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      };

      const response = await axios.delete(`${URL}/devices/${id}`, config);
      console.log(response);
      setIsLoading(false);
      navigate("/inventory");
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
          <Card className="h-full w-full shadow-none bg-[#fdfdfd]">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div className="flex gap-3">
                  <MdArrowBack
                    className="w-6 h-6 mt-1 hover:cursor-pointer"
                    onClick={() => navigate("/inventory")}
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      {device.name}
                    </Typography>
                    <Typography className="w-fit mt-1 font-normal">
                      {device.status === "AVAILABLE" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={device.status}
                          color="green"
                        />
                      )}
                      {device.status === "NOT AVAILABLE" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={device.status}
                          color="gray"
                        />
                      )}
                      {device.status === "MISSING" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={device.status}
                          color="red"
                        />
                      )}
                      {device.status === "DEFECTIVE" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={device.status}
                          color="yellow"
                        />
                      )}
                    </Typography>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <Typography color="black" variant="paragraph">
                  Tag Number:{" "}
                  <span className="font-normal">{device.tagNumber}</span>
                </Typography>
                <Typography color="black" variant="paragraph">
                  Serial Number:{" "}
                  <span className="font-normal">{device.serialNumber}</span>
                </Typography>
                <Typography color="black" variant="paragraph">
                  <p>Remarks:</p>
                  <p>
                    <span className="font-normal text-gray-800">
                      {device.remarks
                        ? device.remarks
                        : "No description provided."}
                    </span>
                  </p>
                </Typography>
              </div>
              <div className=" flex gap-4 mt-8">
                <Button
                  onClick={() => navigate(`/inventory/${device.id}/update`)}
                  className="flex items-center gap-3"
                  size="sm"
                  color="blue-gray"
                >
                  <MdEdit className="h-4 w-4" /> Edit Device
                </Button>
                <Button
                  onClick={() => handleDelete(id)}
                  className="flex items-center gap-3"
                  size="sm"
                  color="red"
                >
                  <MdDeleteOutline className="h-4 w-4" /> Delete Device
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </section>
    </main>
  );
}

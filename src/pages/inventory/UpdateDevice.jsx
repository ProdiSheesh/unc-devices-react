import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Sidebar from "../../components/Sidebar";
import { MdArrowBack, MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config/global";

export default function UpdateDevice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [device, setDevice] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const categoriesRes = await axios.get(`${URL}/categories`);
        const deviceRes = await axios.get(`${URL}/devices/${id}`);

        setCategories(categoriesRes.data);
        setDevice(deviceRes.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      data.categoryId = parseInt(data.categoryId);
      console.log(data);

      const response = await axios.patch(`${URL}/devices/${id}`, data);

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
          <div>
            <Card className="h-full w-full shadow-none bg-[#fdfdfd]">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="mb-8 flex items-center justify-between gap-8">
                  <div className="flex gap-3">
                    <MdArrowBack
                      className="w-6 h-6 mt-1 hover:cursor-pointer"
                      onClick={() => navigate("/inventory")}
                    />
                    <div>
                      <Typography variant="h5" color="blue-gray">
                        Edit Device
                      </Typography>

                      <Typography color="gray" className="mt-1 font-normal">
                        Please fill up the form to edit your existing device
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="">
                <form className="w-5/6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-2/5 mb-6 flex flex-col gap-5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-bold"
                    >
                      Device Name
                      {errors.name && (
                        <span className="ml-3 text-xs text-red-400 italic">
                          *This field is required
                        </span>
                      )}
                    </Typography>
                    <Input
                      size="md"
                      placeholder="ex. chromebook"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      {...register("name", {
                        required: true,
                        value: `${device.name}`,
                      })}
                    />
                  </div>

                  <div className="flex justify-between mb-6">
                    <div className="w-2/5 mb-1 flex flex-col gap-5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-bold"
                      >
                        Tag Number
                        {errors.tagNumber && (
                          <span className="ml-3 text-xs text-red-400 italic">
                            *This field is required
                          </span>
                        )}
                      </Typography>
                      <Input
                        size="md"
                        placeholder="ex. 123456789"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        {...register("tagNumber", {
                          required: true,
                          value: `${device.tagNumber}`,
                        })}
                      />
                    </div>
                    <div className="w-2/5 mb-1 flex flex-col gap-5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-bold"
                      >
                        Serial Number
                        {errors.serialNumber && (
                          <span className="ml-3 text-xs text-red-400 italic">
                            *This field is required
                          </span>
                        )}
                      </Typography>
                      <Input
                        size="md"
                        placeholder="ex. 123456789"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        {...register("serialNumber", {
                          required: true,
                          value: `${device.serialNumber}`,
                        })}
                      />
                    </div>
                  </div>

                  <div className="w-full mb-6 flex flex-col gap-5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-bold"
                    >
                      Remarks
                      {errors.remarks && (
                        <span className="ml-3 text-xs text-red-400 italic">
                          *This field is required
                        </span>
                      )}
                    </Typography>
                    <Textarea
                      {...register("remarks", { value: `${device.remarks}` })}
                    />
                  </div>

                  <div className="w-1/3 mb-6 flex flex-col gap-5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-bold"
                    >
                      Category
                      {errors.category && (
                        <span className="ml-3 text-xs text-red-400 italic">
                          *This field is required
                        </span>
                      )}
                    </Typography>
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      label="Device Type"
                      {...register("categoryId", {
                        required: true,
                        value: `${device.category.id}`,
                      })}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/3 mb-6 flex flex-col gap-5">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-bold"
                    >
                      Status
                      {errors.status && (
                        <span className="ml-3 text-xs text-red-400 italic">
                          *This field is required
                        </span>
                      )}
                    </Typography>
                    <select
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      label="Device Type"
                      {...register("status", {
                        required: true,
                        value: `${device.status}`,
                      })}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="NOT AVAILABLE">NOT AVAILABLE</option>
                      <option value="DEFECTIVE">DEFECTIVE</option>
                      <option value="MISSING">MISSING</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="flex items-center gap-3"
                      size="sm"
                    >
                      <MdEdit className="h-4 w-4" /> Edit Device
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        )}
      </section>
    </main>
  );
}

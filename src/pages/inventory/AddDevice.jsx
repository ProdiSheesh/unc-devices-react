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
import { MdAdd, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config/global";
import { useCookies } from "react-cookie";

export default function AddDevice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

        const response = await axios.get(`${URL}/categories`, config);

        console.log(response.data);
        setCategories(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [cookies.token]);

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      data.categoryId = parseInt(data.categoryId);

      const config = {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      };

      const response = await axios.post(`${URL}/devices`, data, config);

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
                        Add New Device
                      </Typography>

                      <Typography color="gray" className="mt-1 font-normal">
                        Please fill up the form to add your new device
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
                      {...register("name", { required: true })}
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
                        {...register("tagNumber", { required: true })}
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
                        {...register("serialNumber", { required: true })}
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
                    <Textarea {...register("remarks")} />
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
                      {...register("categoryId", { required: true })}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="flex items-center gap-3"
                      size="sm"
                    >
                      <MdAdd className="h-4 w-4" /> Add Device
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

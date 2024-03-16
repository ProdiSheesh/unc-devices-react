/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
  MdAdd,
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
  MdOutlineSearch,
} from "react-icons/md";

const TABLE_HEAD = ["Name", "Tag Number", "Category", "Status", ""];

export function InventoryTable({ data, onDelete, onNavigate, onSearch }) {
  const { register, handleSubmit } = useForm();

  return (
    <Card className="h-full w-full shadow-none bg-[#fdfdfd]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Device Inventory
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              You have a total of {data.length} Devices
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <form onSubmit={handleSubmit(onSearch)} className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MdOutlineSearch className="h-5 w-5" />}
                {...register("query")}
              />
              <button type="submit" hidden></button>
            </form>
            <Button
              onClick={() => onNavigate("/inventory/devices/add")}
              className="flex items-center gap-3"
              size="sm"
            >
              <MdAdd className="h-4 w-4" /> Add Device
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, tagNumber, category, status }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {tagNumber}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">{category.name}</div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      {status === "AVAILABLE" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color="green"
                        />
                      )}
                      {status === "NOT AVAILABLE" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color="gray"
                        />
                      )}
                      {status === "MISSING" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color="red"
                        />
                      )}
                      {status === "DEFECTIVE" && (
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color="yellow"
                        />
                      )}
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="View">
                      <IconButton
                        variant="text"
                        onClick={() => onNavigate(`/inventory/${id}`)}
                      >
                        <MdOutlineRemoveRedEye className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit">
                      <IconButton
                        variant="text"
                        onClick={() => onNavigate(`/inventory/${id}/update`)}
                      >
                        <MdOutlineEdit className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <IconButton variant="text" onClick={() => onDelete(id)}>
                        <MdDeleteOutline className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

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
import { MdAdd, MdOutlineEdit, MdOutlineSearch } from "react-icons/md";

const TABLE_HEAD = ["Name", "Tag Number", "Type", "Status", "Remarks", ""];

const TABLE_ROWS = [
  {
    name: "Chromebook 2013",
    tagNumber: "123456789",
    type: "ChromeBook",
    status: "Available",
    remarks: "New arrival",
  },
  {
    name: "Chromebook 2013",
    tagNumber: "123456789",
    type: "ChromeBook",
    status: "Available",
    remarks: "New arrival",
  },
  {
    name: "Chromebook 2013",
    tagNumber: "123456789",
    type: "ChromeBook",
    status: "Available",
    remarks: "New arrival",
  },
  {
    name: "Chromebook 2013",
    tagNumber: "123456789",
    type: "ChromeBook",
    status: "Available",
    remarks: "New arrival",
  },
  {
    name: "Chromebook 2013",
    tagNumber: "123456789",
    type: "ChromeBook",
    status: "Available",
    remarks: "New arrival",
  },
];

export function InventoryTable() {
  return (
    <Card className="h-full w-full shadow-none bg-[#fdfdfd]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Device Inventory
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              You have a total of 1,000 Devices
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MdOutlineSearch className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
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
            {TABLE_ROWS.map(
              ({ name, tagNumber, type, status, remarks }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
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
                      <div className="w-max">{type}</div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status ? "Available" : "Not Available"}
                          color={status ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {remarks}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Device">
                        <IconButton variant="text">
                          <MdOutlineEdit className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
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

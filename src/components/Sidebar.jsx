import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineGroups2,
  MdOutlineInventory2,
  MdOutlineLogout,
} from "react-icons/md";

export default function Sidebar() {
  return (
    <Card className="h-screen fixed left-0 w-full max-w-[17rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-16 p-4">
        <Typography variant="h4" color="blue-gray">
          <span className="text-red-800">UNC</span>Devices
        </Typography>
      </div>

      <div className="flex flex-col h-full justify-between">
        <List>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineDashboard className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineInventory2 className="h-5 w-5" />
            </ListItemPrefix>
            Inventory
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineGroups2 className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
        </List>

        <List>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineAccountCircle className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineLogout className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
    </Card>
  );
}

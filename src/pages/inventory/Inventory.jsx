import Sidebar from "../../components/Sidebar";
import { InventoryTable } from "./InventoryTable";

export default function Inventory() {
  return (
    <main className="bg-[#fdfdfd] h-screen">
      <Sidebar />

      <section className="ml-[17rem] p-8">
        <div>
          <InventoryTable />
        </div>
      </section>
    </main>
  );
}

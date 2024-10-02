import { Plus } from "lucide-react";

import { columns } from "./user-columns";
import { getUsers } from "@/lib/api/users.service";

import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateUserDialog from "./components/create-user-dialog/create-user-dialog";

export default function Users() {
  const data = getUsers();

  return (
    <div className="container mx-auto py-10">
      <div className="flex mb-4">
        <Dialog>
          <h1 className="text-3xl font-bold">Usuarios</h1>

          <DialogTrigger asChild>
            <Button variant="success" className="ml-auto">
              <Plus className="w-6 h-6 mr-2" />
              Crear usuario
            </Button>
          </DialogTrigger>
          <CreateUserDialog />
        </Dialog>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

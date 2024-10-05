import { columns } from "./user-columns";
import { getUsers } from "@/lib/api/users.service";

import { DataTable } from "@/components/DataTable";

import CreateUserDialogRoot from "./components/create-user-dialog/dialog";

// TODO - Loading state
export default async function Users() {
  const data = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <div className="flex mb-4">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <CreateUserDialogRoot />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

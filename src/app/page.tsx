import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
import { cookies } from "next/headers";

export default async function Home() {
const {data, error} = await userService.getSession();
  return (
    <div>
      <Button variant={"outline"}>Click</Button>
    </div>
  );
}

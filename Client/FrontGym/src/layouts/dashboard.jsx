import { Members } from "../components/members";
import { Employees } from "../components/employees";
import { Navbar } from "../components/navbar";
import { Panel } from "../components/panel";
export function Dashboard() {
  return (
    <div>
      <Navbar />
      <Panel />
      <Members />
      <Employees />
    </div>
  );
}

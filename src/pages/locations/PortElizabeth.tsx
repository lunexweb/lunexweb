import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const PortElizabeth = () => {
  return <LocationPage {...locationData["port-elizabeth"]} />;
};

export default PortElizabeth;


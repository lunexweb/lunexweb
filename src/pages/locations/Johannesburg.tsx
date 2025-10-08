import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Johannesburg = () => {
  return <LocationPage {...locationData["johannesburg"]} />;
};

export default Johannesburg;


import { LocationPage } from "@/components/LocationPage";
import { locationData } from "@/data/locations";

const Durban = () => {
  return <LocationPage {...locationData["durban"]} />;
};

export default Durban;


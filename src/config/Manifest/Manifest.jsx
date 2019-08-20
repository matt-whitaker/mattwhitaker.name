import loadable from "@loadable/component";
import axios from "axios";

const Manifest = loadable(async () => {
  Manifest._mw_cache = Manifest._mw_cache || await axios.get("/articles/manifest.json");

  return ({ children: fn }) => fn(Manifest._mw_cache.data);
});

export default Manifest;
// app/utils/leaflet-routing-machine.d.ts
import * as L from "leaflet";

declare module "leaflet-routing-machine" {
  const Routing: {
    control: (options?: any) => any;
  };

  export = Routing;
}

declare module "leaflet" {
  namespace Routing {
    function control(options?: any): any;
  }
}

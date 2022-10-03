import { refreshClients, clients } from "../../private/clients.js";

export class App {
  async updateDefinitions() {
    await refreshClients();

    for (let functionName in this.definitions.methods)
      delete this[functionName];

    this.definitions.methods = {};

    for (let clientName in clients) {
      this.definitions.methods[clientName] = {
        arguments: [],
        autoRun: true,
        name: clientName + " is connected.",
      };

      this[clientName] = async () => {
        return (await clients[clientName].request("core", "services", []))
          .result;
      };
    }
  }
}

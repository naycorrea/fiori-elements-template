sap.ui.define(
  ["sap/ui/core/util/MockServer", "example/fiori/app/utils/Reader"],
  (MockServer, Reader) => {
    "use strict";

    const originPath = "example/fiori/app";
    const mockPath = `${originPath}/localService/data`;

    async function getRequests() {
      return [
        {
          method: "GET",
          path: /.+/,
          response: (oXhr) => {
            oXhr.respondJSON(200, {}, {});
            return true;
          },
        },
      ];
    }

    return {
      async _initMockData() {
        const mockserver = new MockServer({
          rootUri: "https://localhost:3000/OTC_GHQ_V2_PAY_APP/",
        });

        const metadataPath = sap.ui.require.toUrl(
          `${originPath}/localService/metadata.xml`
        );
        const dataPath = sap.ui.require.toUrl(mockPath);

        MockServer.config({
          autoRespond: true,
          autoRespondAfter: 300,
        });

        mockserver.simulate(metadataPath, {
          sMockdataBaseUrl: dataPath,
          bGenerateMissingMockData: true,
        });

        mockserver.start();
      },

      async init() {
        await this._initMockData();

        const manifest = await Reader.getJson(`${originPath}/manifest.json`);
        const rootUri = manifest.envs.url + "/";

        const mockServer = new MockServer({
          rootUri,
          requests: await getRequests(),
        });

        MockServer.config({
          autoRespond: true,
          autoRespondAfter: 300,
        });

        mockServer.start();
      },
    };
  }
);

// keycloak.ts
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8081/",
  realm: "WiseWander_v1.1",
  clientId: "my_app_client",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloakConfig;

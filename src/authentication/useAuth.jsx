import { useEffect, useState, useRef } from 'react';
import Keycloak from "keycloak-js";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;
    
    const client = new Keycloak({
      url: "http://localhost:8081/",
      realm: "WiseWander_v1.1",
      clientId: "my_app_client",
      credentials: {
        secret: "kFlPc85lEGJbHp16VZqsY8jW3ne2pmoH"
      }
    });

    client.init({ onLoad: 'login-required' })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setKeycloak(client);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Keycloak init error:", err);
        setIsLoading(false);
      });
  }, []);

  // Return both authentication status and loading state
  return { isAuthenticated, isLoading, keycloak };
}

export default useAuth;
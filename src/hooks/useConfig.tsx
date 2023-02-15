import React, { useContext, useState } from "react";
import ConfigSelector from "../pages/Configurator/ConfigSelector";
import { Config, getAllConfigs } from "../services/configurations";
import { updateUser } from "../services/users";
import { AuthContext } from "./useAuth";

export const ConfigContext = React.createContext<ReturnType<typeof useConfig>>(null!);

const localStorageCartKey = "CONFIGURATOR";


export function useConfig() {

  const { user, userInfo } = useContext(AuthContext);

  const [configs, setConfigs] = useState<Config[]>(() => {
    const configs = localStorage.getItem(localStorageCartKey);
    if (configs) {
      return JSON.parse(configs);
    }
    return []
  });


  // React.useEffect(() => {
  //     // fetch configs from DB

  //     getAllConfigs().then(setConfigs);
  // },[]);

  React.useEffect(() => {
    localStorage.setItem(localStorageCartKey, JSON.stringify(configs));

    // localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
    if (user) {
      console.log("Updating");
      updateUser(user.uid, { configs });

    }
  }, [configs]);

  function emptyConfigs() {
    setConfigs([]);
  }

  function addConfigs(configuration: Config) {
    const currentConfig = configs.find(config => config.name === configuration.name);
    if (!currentConfig) {
      setConfigs([...configs, configuration]);
    }

  }
  function deleteConfigs(configuration: Config) {
    setConfigs(configs.filter((el) => el.name !== configuration.name))
  }

  return {
    configs,
    emptyConfigs,
    addConfigs,
    deleteConfigs
  }

}

export const ConfigsContextProvider: React.FC = ({ children }) => {
  const configs = useConfig();
  return <ConfigContext.Provider value={configs}>
    {children}
  </ConfigContext.Provider>
}

import { useApi } from "../../api/api";
import collections from "./access_tree.json";
import { useToast } from "../ToastProvider";
import { useEffect, useState } from "react";
import { useData } from "./DataProvider";

const base_provider = {
  get: {},
  post: {},
  patch: {},
  del: {},
};

const success_toast = (collection, method) => {
  return {
    icon: "done",
    text: `${collection.name} ${method} successful`,
  };
};

const error_toast = (error) => {
  return {
    icon: "error",
    text: error.message,
    error: true,
  };
};

export const useMethods = (setData) => {
  const functions = useApi();
  const { showToast } = useToast();
  const [provider, setProvider] = useState(base_provider);

  useEffect(() => {
    generateProvider();
  }, []);

  const updateData = async (collectionName, data) => {
    setData((prevData) => {
      return { ...prevData, [collectionName]: data };
    });
  };

  const generateProvider = () => {
    const base = base_provider;

    collections.forEach((collection) => {
      const cn = collection.name.toLowerCase();
      Object.keys(collection.methods).forEach((method) => {
        collection.methods[method].forEach((details) => {
          const f = generateFunction(functions, cn, method, details);
          base[method][cn] = (...args) =>
            f(...args)
              .then((data) => {
                updateData(cn, data);
                if (method != "get") {
                  showToast(success_toast(collection, method));
                }
              })
              .catch((error) => {
                showToast(error_toast(error));
              });
        });
      });
    });
    console.log(base);
    setProvider(base);
  };

  return provider;
};

const generateFunction = (functions, collection, method) => {
  switch (method) {
    case "get":
      return () => functions.get(collection);
    case "post":
      return (body) => functions.post(collection, body);
    case "patch":
      return (id, body) => functions.patch(collection, id, body);
    case "del":
      return (id) => functions.del(collection, id);
    default:
      return null;
  }
};

export const useLoad = (collection) => {
  const { get, ...rest } = useData();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    get[collection]().then(() => setLoading(false));
  }, []);
  return { loading, [collection]: rest[collection] };
};

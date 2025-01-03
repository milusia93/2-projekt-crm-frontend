import axios from "axios";
import config from "../config";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddClientForm from "../components/AddClientForm";

const AddClient = () => {
  const params = useParams();
  const id = params.id;
  
  const [addedClient, setAddedClient] = useState({
    name: "",
    address: {
      street: "",
      zipCode: "",
      city: "",
    },
    nip: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: {
      street: "",
      zipCode: "",
      city: "",
    },
    nip: "",
  });

  const getSingleClient = () => {
    axios
      .get(`http://localhost:3005/clients/${id}`)
      .then((res) => {
        setAddedClient(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (id) {
      getSingleClient();
    }

    return () => {
        resetForm()
    }
  }, [id]);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setAddedClient({
      ...addedClient,
      [name]: target.value,
    });
  };

  const handleAddressChange = (e) => {
    const target = e.target;
    const name = target.name;
    const address = { ...addedClient.address, [name]: target.value };
    setAddedClient({
      ...addedClient,
      address: address,
    });
  };

  const saveClient = (clientObj) => {
    // console.log(clientObj);
    axios
      .post(config.api.url + "/clients/add", clientObj, { mode: "cors" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateClient = (clientObj) => {
    // console.log(clientObj);
    axios
      .put(config.api.url + `/clients/update/${clientObj._id}`, clientObj, {
        mode: "cors",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetForm = () => {
    setAddedClient({
      name: "",
      address: {
        street: "",
        zipCode: "",
        city: "",
      },
      nip: "",
    });
    setErrors({
      name: "",
      address: {
        street: "",
        zipCode: "",
        city: "",
      },
      nip: "",
    });
  };

  const validateForm = (e) => {
    let validationErrors = {
      name: false,
      address: {
        street: false,
        zipCode: false,
        city: false,
      },
      nip: false,
    };

    if (addedClient.name.trim() === "") {
      validationErrors.name = true;

      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          name: "Wpisz nazwę firmy.",
        };
      });
    } else {
      validationErrors.name = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          name: "",
        };
      });
    }

    if (addedClient.address.street.trim() === "") {
      validationErrors.address.street = true;
      setErrors((prevErrors) => {
        let address = { ...prevErrors.address, street: "Wpisz ulicę." };
        return {
          ...prevErrors,
          address: address,
        };
      });
    } else {
      validationErrors.address.street = false;
      setErrors((prevErrors) => {
        let address = { ...prevErrors.address, street: "" };
        return {
          ...prevErrors,
          address: address,
        };
      });
    }

    if (addedClient.address.zipCode.trim() === "") {
      validationErrors.address.zipCode = true;
      setErrors((prevErrors) => {
        let address = { ...prevErrors.address, zipCode: "Wpisz kod pocztowy." };
        return {
          ...prevErrors,
          address: address,
        };
      });
    } else {
      validationErrors.address.zipCode = false;
      setErrors((prevErrors) => {
        let address = { ...prevErrors.address, zipCode: "" };
        return {
          ...prevErrors,
          address: address,
        };
      });
    }

    if (addedClient.address.city.trim() === "") {
      validationErrors.address.city = true;
      setErrors((prevErrors) => {
        let address = { ...prevErrors.address, city: "Wpisz Miasto." };
        return {
          ...prevErrors,
          address: address,
        };
      });
    } else {
      validationErrors.address.city = false;
      setErrors((prevErrors) => {
        let address = { ...prevErrors.address, city: "" };
        return {
          ...prevErrors,
          address: address,
        };
      });
    }

    if (addedClient.nip.trim() === "") {
      validationErrors.nip = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          nip: "Wpisz NIP.",
        };
      });
    } else if (addedClient.nip.trim().length < 10) {
      validationErrors.nip = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          nip: "Nip musi miec 10 cyfr.",
        };
      });
    } else {
      validationErrors.nip = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          nip: "",
        };
      });
    }

    // console.log(validationErrors)
    return (
      validationErrors.name ||
      validationErrors.address.street ||
      validationErrors.address.zipCode ||
      validationErrors.address.city ||
      validationErrors.nip
    );
  };
  // console.log(errors)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      return;
    }

    if (id) {
      updateClient(addedClient);
    } else {
      saveClient(addedClient);
      resetForm();
    }
  };
  return (
    <div className="formBackgroundAddClient">
      <div className="formContainer">
        <AddClientForm
          handleInputChange={handleInputChange}
          handleAddressChange={handleAddressChange}
          handleSubmit={handleSubmit}
          addedClient={addedClient}
          errors={errors}
        />
      </div>
      <div></div>
    </div>
  );
};

export default AddClient;

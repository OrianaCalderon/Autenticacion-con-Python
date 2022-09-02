const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: localStorage.getItem("token") || "",
      users: [],
    },
    actions: {
      userRegister: async (user) => {
        let store = getStore();
        try {
          let response = await fetch(`http://localhost:3001/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(user),
          });
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },
      login: async (user) => {
        try {
          let response = await fetch(`http://localhost:3001/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (response.ok) {
            let data = await response.json();
            setStore({ token: data.token });
            localStorage.setItem("token", data.token);
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },
      logout: () => {
        localStorage.removeItem("token");

        setStore({ token: "" });
      },
      handleUser: async () => {
        let store = getStore();
        try {
          let response = await fetch("http://127.0.0.1:3001/api/user", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
          });
          if (response.ok) {
            let data = await response.json();
            setStore({ users: data });
            // setAllUser(data);
          }
        } catch (error) {
          console.log("error" + error);
        }
      },
    },
  };
};

export default getState;

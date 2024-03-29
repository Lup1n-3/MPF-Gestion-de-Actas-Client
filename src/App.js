import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logo2 from "assets/logo2.png";
import { getUsers, setCurrentUser, admin, createUsers } from "./redux/actions";
import { Fallback, NavBar, NotFound } from "components/index";
import { Home, AddActa, AddPeritos, AddIntegrantes, AddBolsas, ActaRemove, AdminHome, UserDashboard } from "pages/index";

function App() {
  const dispatch = useDispatch();

  const adminState = useSelector((s) => JSON.parse(localStorage.getItem("admin")) || s.admin);
  const users = useSelector((s) => JSON.parse(localStorage.getItem("users")) || s.users);
  const currentUser = useSelector((s) => JSON.parse(localStorage.getItem("currentUser")) || s.currentUser);

  const [flag, setFlag] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setFlag(true);
      dispatch(setCurrentUser(currentUser));
    }
  }, []);

  React.useEffect(() => {
    setUser("");
  }, [flag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = users.find((u) => u.username === user.username);
    if (user.username && user.password) {
      if (currentUser.password.toLowerCase() === user.password.toLowerCase()) {
        if (user.username === "admin") {
          dispatch(admin());
        }
        toast.success("¡Usuario autenticado con exito!");
        dispatch(setCurrentUser(currentUser));
        setFlag(true);
      } else {
        toast.error("¡Contraseña incorrecta!");
        setUser({ ...user, password: "" });
      }
    } else if (user.username === "") {
      toast.warning("¡Primero elige un Usuario!");
    } else {
      toast.warning("¡Escribe tu contraseña!");
    }
  };

  const handleCreateUsers = () => {
    const res = prompt("s/n");
    if (res === "s") {
      dispatch(createUsers());
    }
  };

  if (!flag) {
    return (
      <div data-aos="zoom-in" className="flexContainer100x100 hexagonsBg">
        <img className="absolute top-0 mt-10" src={logo2} onDoubleClick={() => handleCreateUsers()} />
        <form className="basicForm50x50" onSubmit={handleSubmit}>
          <div className="mb-5 flex h-[15%] w-[40%] flex-col items-center justify-center ">
            <label className="mb-1 self-start text-white">Usuario</label>
            <select className="select" onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username}>
              <option value="">Usuario</option>
              {users &&
                users.map((u) => (
                  <option value={u.username} key={u.legajo}>
                    {u.username}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex h-[15%] w-[40%] flex-col items-center justify-center">
            <label className="mb-1 self-start text-white">Contraseña</label>
            <input
              className="h-full w-full rounded-md border-principal text-center focus:border-principal focus:outline-none"
              type="password"
              value={user.password}
              placeholder="Contraseña"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <input
            className="mt-5 rounded-md border-2 border-white bg-white px-6 py-1 text-principal  transition hover:cursor-pointer hover:bg-principal hover:text-white"
            type="submit"
            value="Ingresar"
          />
        </form>
      </div>
    );
  } else {
    return (
      <Router>
        <Suspense fallback={<Fallback />}>
          <NavBar setFlag={setFlag} />
          <Routes>
            {/*Router Error*/}
            <Route path="*" element={<NotFound />} />
            {/*Router Actas*/}
            <Route path="/" exact element={<Home />} />
            <Route path="/actas/crear/1" exact element={<AddActa />} />
            {currentUser.username === "admin" && <Route path="/actas/crear/2" exact element={<AddPeritos />} />}
            <Route path="/actas/crear/3" exact element={<AddIntegrantes />} />
            <Route path="/actas/crear/4" exact element={<AddBolsas />} />
            {/*Admin*/}
            {adminState === true && (
              <>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/eliminarActa" element={<ActaRemove />} />
                <Route path="/admin/users" element={<UserDashboard />} />
              </>
            )}
          </Routes>
        </Suspense>
      </Router>
    );
  }
}

export default App;

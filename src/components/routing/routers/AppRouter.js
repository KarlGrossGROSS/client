import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../views/Login";
import { RegistrationGuard } from "../routeProtectors/RegistrationGuard";
import Registration from "../../views/Registration";
import Profile from "../../views/Profile";
import EditProfile from "../../views/EditProfile";
import Game from "../../views/Game"

// <Route element={<GameGuard />}>
//          <Route path="/game/*" element={<GameRouter base="/game" />} />
//        </Route>

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginGuard />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path ="/game" element={<GameGuard />}>
          <Route path="/game" element={<Game />} />
        </Route>


        <Route path="/registration" element={<RegistrationGuard />}>
          <Route path="/registration" element={<Registration />} />
        </Route>

        <Route path= "/game/profile/:userid" element={<GameGuard />}>
          <Route path="/game/profile/:userid" element={<Profile />} />
        </Route>

        <Route path= "/game/profile/:userid/edit" element={<GameGuard />}>
          <Route path="/game/profile/:userid/edit" element={<EditProfile />} />
        </Route>

        <Route path="/" element={<Navigate to="/game" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
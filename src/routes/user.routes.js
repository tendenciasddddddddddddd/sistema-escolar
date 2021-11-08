import { Router } from "express";
const router = Router();

import * as usuariosCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

router.get("/buscadorusuarioss", usuariosCtrl.getBuscadorUsuarios);

router.get("/newrol", usuariosCtrl.getRoles);

router.get("/:id", usuariosCtrl.getUsuariosById);

router.get(
    "/", 
    [authJwt.verifyToken  ,  authJwt.isAdmin],
    usuariosCtrl.getUsuarios
    );


router.put("/:usuariosId", usuariosCtrl.updateUsuariosById);

router.delete("/:id", usuariosCtrl.deleteUsuariosById);

export default router;
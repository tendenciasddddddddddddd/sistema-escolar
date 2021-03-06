import { Router } from "express";
const router = Router();

import * as taskCtrl from "../../controllers/AulasVirtuales/task.controller";


router.put("/send/:taskId", taskCtrl.createTaskArbol2ById); //INSERTAMOS DATOS DE MATERIA Y DOCENTES EN NOTAS

router.put("/removetask/:taskId", taskCtrl.deleteTaskById);

router.put("/:aulaId", taskCtrl.createTaskById);  //RUTA CREAR NUEVA TAREAS DE DOCENTES



export default router;


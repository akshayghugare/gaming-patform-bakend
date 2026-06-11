import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { clientAuth } from "../middlewares/clientAuth.middleware";
import {
  postScore,
  getStandings,
} from "../modules/tournament-leaderboard/controller/tournament-leaderboard.controller";

const router = Router();

// Games platform → gamru: add a player's tournament points (s2s).
router.post("/:tournamentId/score", clientAuth, postScore);

// Backoffice: view the standings.
router.get("/:tournamentId", auth, getStandings);

export default router;

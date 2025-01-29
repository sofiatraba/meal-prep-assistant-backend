import { Router } from "express";
import RecipeController from "../controllers/recipeController";

const router = Router();

router.get("/recipes", (req, res, next) => {
  RecipeController.getAllRecipes(req, res, next).catch(next);
});
router.get("/recipes/:id", (req, res, next) => {
  RecipeController.getRecipe(req, res, next).catch(next);
});
router.post("/recipes", (req, res, next) => {
  RecipeController.createRecipe(req, res, next).catch(next);
});
router.put("/recipes/:id", (req, res, next) => {
  RecipeController.updateRecipe(req, res, next).catch(next);
});
router.delete("/recipes/:id", (req, res, next) => {
  RecipeController.deleteRecipe(req, res, next).catch(next);
});


export default router;
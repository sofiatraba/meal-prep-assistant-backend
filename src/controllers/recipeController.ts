import { NextFunction, Request, Response } from 'express';
import Recipe from '../models/Recipe';

//Fetch all recipes
export const getAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const recipes = await Recipe.find();
        return res.status(200).json(recipes);
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
}

// Fetch a single recipe by id
export const getRecipe = async (req: Request, res: Response, next: NextFunction): Promise<Response | void>  => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        return res.status(200).json(recipe);
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
};

// Create a new recipe
export const createRecipe = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const newRecipe = new Recipe({
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            cookTime: req.body.cookTime,
            category: req.body.category
        });
        return res.status(201).json(await newRecipe.save());
    }
    catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
}

// Update a recipe
export const updateRecipe = async (req:Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json(updatedRecipe);
    }
    catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
}

// Delete a recipe
export const deleteRecipe = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ recipe: deletedRecipe, message: "Recipe deleted successfully" });        
    }
    catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
}

const RecipeController = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};

export default RecipeController;
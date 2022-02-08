import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICategory } from "../types";

const categoriesKey = "@categories";

const addCategory = async (newCategory: ICategory) => {
  try {
    const value = await getAllCategories();
    if (
      value.filter(
        (category: ICategory) =>
          category.name === newCategory.name &&
          category.type === newCategory.type
      ).length !== 0
    ) {
      throw new Error("Category already exist");
    }
    newCategory.id = new Date().getTime();
    newCategory.amount = 0;
    console.log("cat:" + newCategory)
    value.push(newCategory);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(categoriesKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(categoriesKey);
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    alert(e);
  }
  return [];
};

const deleteCategory = async (categoryId: number) => {
  try {
    const value = await getAllCategories();
    const categories = value.filter((category: ICategory) => category.id !== categoryId);
    const jsonValue = JSON.stringify(categories);
    await AsyncStorage.setItem(categoriesKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const deleteAllCategories = async () => {
  try {
    await AsyncStorage.removeItem(categoriesKey);
  } catch (e) {
    alert(e);
  }
};

const updateCategory = async (oldCategoryId: number, newCategoryName?: string, newCategoryIcon?: string) => {
  try {
    const value = await getAllCategories();
    value.map((category: ICategory) => {
      if(category.id === oldCategoryId){
        category.name = newCategoryName ? newCategoryName : category.name;
        category.icon = newCategoryIcon ? newCategoryIcon : category.icon;
      }
    }
    );
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(categoriesKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};

const updateCategoryAmount = async (oldCategoryId: number, newCategoryAmount: number) => {
  try {
    const value = await getAllCategories();
    value.map((category: ICategory) => {
      if(category.id === oldCategoryId){
        category.amount += newCategoryAmount;
      }
    }
    );
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(categoriesKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};


export { addCategory, getAllCategories, deleteCategory, deleteAllCategories, updateCategory, updateCategoryAmount };

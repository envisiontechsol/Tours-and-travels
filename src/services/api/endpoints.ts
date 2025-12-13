export const ApiKey = {
  login: "/auth/signin/admin/",
  getStates: "/states",

  // Category--------------------------------------
  getCategory_Key: "/categories",
  addCategory_Key: "/categories",
  updateCategory_Key: "/categories",
  deleteCategory_Key: "/categories",

  // SubCategory--------------------------------------
  getSubCategory_Key: "/subcategories",
  addSubCategory_Key: "/subCategories",
  updateSubCategory_Key: "/subCategories",
  deleteSubCategory_Key: "/subCategories",

  // MicroCategory--------------------------------------
  getMicroCategory_Key: "/microSubcategories",
  addMicroCategory_Key: "/microSubcategories",
  updateMicroCategory_Key: "/microSubcategories",
  deleteMicroCategory_Key: "/microSubcategories",

  // Blogs--------------------------------------
  getBlogs_Key: "/blogs",
  addBlogs_Key: "/blogs",
  updateBlogs_Key: "/blogs",
  deleteBlogs_Key: "/blogs",

  // User--------------------------------------
  getUsersList_Key: "/profiles",
  getUserProfileKey: "/",
  getUserDetails_key: "/profiles",
  getDashboardStats_key: "/dashboard/counts",

  // products-----------------------------
  productDetails_key: "/products", // products/:id
  productsListByStatus_key: "/products?status=",
  updateProdStatus_key: "/products/review",
  // Languages--------------------------------------
  getLanguage_Key: "/language/getAll",
  addLanguage_Key: "/language/create",
  updateLanguage_Key: "/language",
  deleteLanguage_Key: "/language",
};

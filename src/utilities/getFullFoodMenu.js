import Category from "@/models/categoryModel";

const getFullFoodMenu = async () => {
  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "menuitems", // The name of the menuItems collection in database
          localField: "_id",
          foreignField: "category",
          as: "itemsInTheCategory",
        },
      },
      {
        $project: {
          categoryName: 1,
          itemsInTheCategory: {
            _id: 1,
            title: 1,
            itemCode: 1,
            description: 1,
            price: 1,
            images: 1,
          },
        },
      },
    ];

    const menuData = await Category.aggregate(aggregationPipeline);
    return menuData;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw error;
  }
};

export default getFullFoodMenu;

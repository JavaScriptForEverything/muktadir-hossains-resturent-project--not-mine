import Link from "next/link";
import FoodItemCard from "../FoodItemCard";

const MenuAreaWrapper = ({ allFoodItems: allFoodItemsJSON }) => {
  // Convert String to JSON
  const allFoodItems = JSON.parse(allFoodItemsJSON);
  return (
    <section className="container mx-auto w-9/12 md:pb-2 pb-20 relative">
      <h2 className="text-center font-bold text-4xl mb-5">
        Explore Food by category
      </h2>
      {/* Food Category Section::  ::START::*/}
      <div className="grid grid-cols-6 gap-2 md:mx-2 sticky top-0 z-10 p-2 shadow-md shadow-neutral-300 bg-white/20 transition-colors duration-500 dark:bg-slate-800/80 backdrop-blur-2xl dark:shadow-black">
        {allFoodItems.map((cat, id) => {
          return (
            cat.itemsInTheCategory.length > 0 && (
              <div
                key={id}
                className="rounded-sm p-2 bg-red-500 hover:bg-red-600 duration-300 hover:shadow-sm hover:shadow-slate-500 text-white  hover:dark:shadow-slate-600"
              >
                <Link href={`/#${cat._id}`}>
                  <p className="text-center font-mono text-xs">
                    {cat.categoryName}
                  </p>
                </Link>
              </div>
            )
          );
        })}
      </div>

      {/* Food Category Section::   ::END::*/}

      {allFoodItems.map((cat, Idx) => (
        <div key={Idx} className="px-5 pb-2" id={`${cat._id}`}>
          {cat.itemsInTheCategory.length > 0 && (
            <h3
              className={`text-3xl text-center font-semibold pt-5 text-red-500 dark:text-indigo-200`}
            >
              {cat.categoryName}
            </h3>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 m-3">
            {cat.itemsInTheCategory.map((item, Idx) => {
              const plainItem = item.toJSON
                ? item.toJSON()
                : JSON.parse(JSON.stringify(item));
              return <FoodItemCard item={plainItem} key={item._id} />;
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuAreaWrapper;

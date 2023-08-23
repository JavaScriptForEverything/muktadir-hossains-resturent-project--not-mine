import Link from "next/link";
import FoodItemCard from "../FoodItemCard";

const MenuAreaWrapper = ({ allFoodItems }) => {
  return (
    <section className="container mx-auto w-9/12 md:pb-2 pb-20 relative">
      <h2 className="text-center font-bold text-4xl mb-5">
        Explore Food by category
      </h2>
      {/* Food Category Section::  ::START::*/}
      <div className="grid grid-cols-6 gap-2 mx-2 sticky top-0 z-10  bg-white p-2 shadow-sm shadow-neutral-300">
        {allFoodItems.map((cat, id) => {
          return (
            cat.itemsInTheCategory.length > 0 && (
              <div
                key={id}
                className="rounded-sm p-2 bg-red-500 hover:bg-red-600 duration-300 hover:shadow-md hover:shadow-slate-500 text-white "
              >
                <Link href={`/#${cat._id}`}>
                  <p className="text-center font-mono text-xs">{cat.categoryName}</p>
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
            <h3 className={`text-3xl text-center font-semibold text-red-500`}>
              {cat.categoryName}
            </h3>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 m-3">
            {cat.itemsInTheCategory.map((item, Idx) => {
              const plainItem = item.toJSON
                ? item.toJSON()
                : JSON.parse(JSON.stringify(item));
              return (
                <FoodItemCard
                  // addToCartHandler={addToCartHandler}
                  item={plainItem}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuAreaWrapper;

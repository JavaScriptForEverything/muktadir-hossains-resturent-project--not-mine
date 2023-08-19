import React from 'react'
import FoodItemCard from '../FoodItemCard';

const MenuAreaWrapper = ({allFoodItems,addToCartHandler}) => {
  return (
    <section className="container mx-auto w-9/12">
    <h2 className="text-center font-bold text-4xl mb-5">
      Explore Food by category
    </h2>

    {allFoodItems.map((cat, Idx) => (
      <div key={Idx} className="px-5">
        {cat.itemsInTheCategory.length > 0 && (
          <h3
            className={`text-3xl text-center font-semibold text-red-500`}
          >
            {cat.categoryName}
          </h3>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 m-3">
          {cat.itemsInTheCategory.map((item, Idx) => {
            const plainItem = item.toJSON
              ? item.toJSON()
              : JSON.parse(JSON.stringify(item));
            return <FoodItemCard addToCartHandler={addToCartHandler} item={plainItem} key={item._id} />;
          })}
        </div>
      </div>
    ))}
  </section>
  )
}

export default MenuAreaWrapper
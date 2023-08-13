import FoodItemCard from "@/components/FoodItemCard";
import connectToDB from "@/config/connectDb";
import MenuItems from "@/models/menuItemsModel";
import Image from "next/image";

connectToDB();

export default async function Home() {
  const foodItems = await MenuItems.find();
  return (
    <main className="min-h-screen">
      <div className="flex justify-evenly flex-wrap">
        {
          foodItems.map(item =>{
            return <FoodItemCard item={item} key={item._id}/>
          })
        }

      </div>
      {/* <div className="container mx-auto">
        {foodItems.map((food) => {
          const imgUrlArray = food.images[0].replace("http://localhost:3000", "")
          return (
            <div key={food._id}>
              <div className="flex justify-evenly">
                    <Image
                      className="m-2 border border-green-400"
                      src={imgUrlArray}
                      height={200}
                      width={200}
                    />
              </div>
              <h2 className="text-3xl">{food.title}</h2>
              <h2>Price: ${food.price}</h2>
              <p>
                Description:
                <br />
                {food.description}
              </p>
            </div>
          );
        })}
      </div> */}
    </main>
  );
}

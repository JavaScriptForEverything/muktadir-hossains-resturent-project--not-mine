import OrderSectionWrapper from "@/components/ordering-section/OrderSectionWrapper";
import connectToDB from "@/config/connectDb";

import getFullFoodMenu from "@/utilities/getFullFoodMenu";

connectToDB();

export default async function Home() {
  const allFoodItems = await getFullFoodMenu();

  return (
    <main className="min-h-screen bg-slate-100 relative">
      <OrderSectionWrapper allFoodItems={allFoodItems}/>
    </main>
  );
}

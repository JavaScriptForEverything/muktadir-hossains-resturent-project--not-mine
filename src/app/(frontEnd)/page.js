import OrderSectionWrapper from "@/components/ordering-section/OrderSectionWrapper";
import connectToDB from "@/config/connectDb";

import getFullFoodMenu from "@/utilities/getFullFoodMenu";

connectToDB();

export default async function Home() {
  const allFoodItems = await getFullFoodMenu();

  /// ::Convert JSON to String  to avoid warning:: ///
  const allFoodItemsJSON = JSON.stringify(allFoodItems);

  return (
    <main className="min-h-screen bg-slate-100 relative dark:bg-slate-900 dark:text-slate-200 ">
      <OrderSectionWrapper allFoodItems={allFoodItemsJSON} />
    </main>
  );
}

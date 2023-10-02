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
       <div className="absolute left-[8%] top-28 hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]"></div>
      <OrderSectionWrapper allFoodItems={allFoodItemsJSON} />
    </main>
  );
}

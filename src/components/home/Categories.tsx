import { Pizza, Utensils, Coffee, Beer, IceCream, Soup } from "lucide-react"; // Icons from Lucide library
import Link from "next/link";

const categories = [
  { id: 1, name: "Pizza", icon: Pizza },
  { id: 2, name: "Burger", icon: Utensils }, // Using Utensils as generic for now
  { id: 3, name: "Asian", icon: Soup },
  { id: 4, name: "Dessert", icon: IceCream },
  { id: 5, name: "Drinks", icon: Beer },
  { id: 6, name: "Coffee", icon: Coffee },
];

export default function Categories() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Browse by <span className="text-primary">Category</span>
      </h2>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/meals?category=${cat.name}`}
            className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-orange-50 transition-all duration-300 cursor-pointer"
          >
            <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center border group-hover:border-primary group-hover:scale-110 transition-transform duration-300">
              <cat.icon className="h-8 w-8 text-gray-600 group-hover:text-primary transition-colors" />
            </div>
            <span className="font-medium group-hover:text-primary transition-colors">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
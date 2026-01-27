import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function Hero() {
  return (
    <section className="relative h-125 flex items-center justify-center bg-orange-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      <div className="container px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Delicious Food, <br />
          <span className="text-primary">Delivered To You.</span>
        </h1>
        
        <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Choose from thousands of restaurants and get your favorite meals delivered fast. Fresh, hot, and tasty!
        </p>

        {/* Search Bar */}
        <div className="flex w-full max-w-sm mx-auto items-center space-x-2 bg-white p-2 rounded-lg shadow-lg border">
          <Input type="text" placeholder="Search for burger, pizza..." className="border-0 shadow-none focus-visible:ring-0" />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg" className="rounded-full">Order Now</Button>
          <Button variant="outline" size="lg" className="rounded-full">View Menu</Button>
        </div>
      </div>
    </section>
  );
}
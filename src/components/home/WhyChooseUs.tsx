import { Clock, CheckCircle, Truck } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Clock,
    title: "Fastest Delivery",
    description: "We promise to deliver your food within 30 minutes, or it's free."
  },
  {
    id: 2,
    icon: CheckCircle,
    title: "Fresh Quality",
    description: "We work with top-rated restaurants to ensure high quality and taste."
  },
  {
    id: 3,
    icon: Truck,
    title: "Free Shipping",
    description: "Get free delivery on your first order and for all orders over $50."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why <span className="text-primary">Choose Us?</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are more than just a delivery service. We are your partner in ending hunger with taste and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="h-16 w-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import AllCars from "@/components/Main/AllCars";

export default function SubscribePage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="relative overflow-hidden bg-white py-12">
        <div className="absolute inset-0">
          <div className="absolute right-0 w-1/2 h-full dots-pattern opacity-[0.15]"></div>
          <div
            className="absolute right-0 w-3/4 h-full"
            style={{
              background:
                "linear-gradient(to left, rgba(128, 0, 32, 0.1), transparent)",
            }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Subscribe to your next car
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl">
            Browse our collection of vehicles available for subscription. Each
            timepiece is authenticated and maintained to the highest standards.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <AllCars limit="4" showPagenation />
      </div>
    </div>
  );
}

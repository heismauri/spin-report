import StatsForm from "@/components/StatsForm";

const Home = () => {
  return (
    <div className="container max-w-xl mx-auto p-12">
      <main>
        <h1 className="text-5xl font-extrabold text-left mb-4">Spin Report</h1>
        <StatsForm />
      </main>
    </div>
  );
}

export default Home;

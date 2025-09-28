import StatsForm from "@/components/StatsForm";

const Home = () => {
  return (
    <div className="container max-w-xl mx-auto p-12">
      <main>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center sm:text-left">Spin Report</h1>
        <StatsForm />
      </main>
    </div>
  );
}

export default Home;

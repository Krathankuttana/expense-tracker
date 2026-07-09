import { Link } from "react-router-dom";
import { MdTrendingUp, MdPieChart, MdSecurity } from "react-icons/md";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="text-xl font-bold text-primary-600">💰 ExpenseTracker</span>
        <div className="flex gap-3">
          <Link to="/login" className="btn-secondary">Log In</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-5">
          Take control of your <span className="text-primary-600">money</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
          Track expenses and income, visualize your spending habits, and build
          better financial habits — all in one clean dashboard.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn-primary text-base px-6 py-3">Get Started Free</Link>
          <Link to="/login" className="btn-secondary text-base px-6 py-3">I already have an account</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-20">
        <div className="card text-center">
          <MdTrendingUp size={32} className="mx-auto text-primary-600 mb-3" />
          <h3 className="font-semibold mb-1">Real-time Dashboard</h3>
          <p className="text-sm text-gray-500">See your balance, income, and expenses at a glance.</p>
        </div>
        <div className="card text-center">
          <MdPieChart size={32} className="mx-auto text-primary-600 mb-3" />
          <h3 className="font-semibold mb-1">Visual Reports</h3>
          <p className="text-sm text-gray-500">Pie, bar, and line charts to understand spending patterns.</p>
        </div>
        <div className="card text-center">
          <MdSecurity size={32} className="mx-auto text-primary-600 mb-3" />
          <h3 className="font-semibold mb-1">Secure by Design</h3>
          <p className="text-sm text-gray-500">JWT authentication and hashed passwords protect your data.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
return ( <div className="min-h-screen flex flex-col bg-gray-50"> <Navbar />

  <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">
      About ProductDescriptionAI
    </h1>

    <p className="text-gray-600 leading-relaxed mb-6">
      ProductDescriptionAI is an intelligent content-generation platform
      designed to help businesses, sellers, and marketers create
      high-quality product descriptions effortlessly. By leveraging
      advanced artificial intelligence, our platform transforms basic
      product details into compelling, professional, and customer-focused
      descriptions within seconds.
    </p>

    <p className="text-gray-600 leading-relaxed mb-6">
      Writing effective product descriptions is essential for attracting
      customers and improving conversions. ProductDescriptionAI eliminates
      the time and effort required to craft engaging content by generating
      clear, persuasive, and SEO-friendly descriptions tailored to your
      products.
    </p>

    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Key Features
      </h2>

      <ul className="space-y-3 text-gray-600">
        <li> AI-powered product description generation</li>
        <li> Instant and easy-to-use interface</li>
        <li> Professional and marketing-focused content</li>
        <li> SEO-friendly descriptions for better visibility</li>
        <li> Tailored content for various product categories</li>
        <li> Helps improve customer engagement and conversions</li>
      </ul>
    </div>

    <p className="text-gray-600 leading-relaxed">
      Our mission is to empower businesses of all sizes with AI-driven
      content creation tools that save time, enhance productivity, and
      improve online product presentation. Whether you're managing an
      e-commerce store, launching a new product, or scaling your business,
      ProductDescriptionAI helps you create descriptions that sell.
    </p>
  </main>

  <Footer />
</div>

);
}

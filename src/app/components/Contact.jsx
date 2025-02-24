// components/Contact.jsx
"use client"; // Add this line at the very top of the file

const Contact = () => (
  <section id="contact" className="py-16 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Contact</h2>
      <form action="#" method="POST" className="mt-8 max-w-lg mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          required
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded">
          Send Message
        </button>
      </form>
    </div>
  </section>
);

export default Contact;

import React from 'react';

const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    alert('Thanks for reaching out! This form doesn’t store messages — If really want to connect please email me directly using the address at the bottom.');

  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Let's talk</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Have an idea or just want to connect? I’m always open to learning, collaborating, or contributing to exciting projects. Let’s create something meaningful together.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for contact
              </label>
              <select
                id="reason"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select an option</option>
                <option value="collaboration">Collaboration Opportunity</option>
                <option value="project">Project Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>I try to respond as soon as possible — feel free to drop me an email anytime <span className="text-blue-600">samwork9065@gmail.email</span></p>
        </div>
      </div>
    </div>
  );
};

export default About;
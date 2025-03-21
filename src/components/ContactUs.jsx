import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation

const ContactUs = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
  };

  // Animation variants for staggered form fields
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="contact-us py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("contact.description")}
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="bg-white p-8 md:p-12 rounded-lg shadow-lg"
          initial="hidden"
          whileInView="visible"
          variants={formVariants}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
        >
          <motion.div className="space-y-6">
            {/* Name Field */}
            <motion.div variants={fieldVariants}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t("contact.form.namePlaceholder")}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                required
              />
            </motion.div>

            {/* Contact Field */}
            <motion.div variants={fieldVariants}>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                {t("contact.form.contact")}
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder={t("contact.form.contactPlaceholder")}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                required
              />
            </motion.div>

            {/* Query Field */}
            <motion.div variants={fieldVariants}>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700"
              >
                {t("contact.form.query")}
              </label>
              <textarea
                id="query"
                name="query"
                rows="5"
                placeholder={t("contact.form.queryPlaceholder")}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                required
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fieldVariants}>
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("contact.form.submit")}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactUs;
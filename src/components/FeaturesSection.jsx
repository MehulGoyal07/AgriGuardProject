import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation
import TitleBorder1 from "../assets/title-border1.svg"; // Update the path to your SVG
import TitleBorder2 from "../assets/title-border2.svg"; // Update the path to your SVG

const FeaturesSection = () => {
  const { t } = useTranslation(); // Initialize useTranslation

  // Initialize AOS
  AOS.init({ duration: 1000, once: true });

  // Features data
  const features = [
    {
      title: t("features.instantDiseaseDetection.title"),
      description: t("features.instantDiseaseDetection.description"),
    },
    {
      title: t("features.personalizedTreatment.title"),
      description: t("features.personalizedTreatment.description"),
    },
    {
      title: t("features.userFriendlyInterface.title"),
      description: t("features.userFriendlyInterface.description"),
    },
    {
      title: t("features.extensiveDiseaseDatabase.title"),
      description: t("features.extensiveDiseaseDatabase.description"),
    },
    {
      title: t("features.accurateAndReliable.title"),
      description: t("features.accurateAndReliable.description"),
    },
    {
      title: t("features.realTimeFeedback.title"),
      description: t("features.realTimeFeedback.description"),
    },
  ];

  return (
    <section
      className="py-16 bg-gradient-to-r from-green-50 to-green-100"
      id="Features"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-4 mb-12" data-aos="fade-up">
          <img src={TitleBorder1} alt="Border Decoration" className="w-16 md:w-24" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("features.title")}
          </h2>
          <img src={TitleBorder2} alt="Border Decoration" className="w-16 md:w-24" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/90 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-green-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
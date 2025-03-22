import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { useNavigate } from "react-router-dom"; // Import useNavigate
import TitleBorder1 from "../assets/title-border1.svg";
import TitleBorder2 from "../assets/title-border2.svg";

const CropDiagnosisSection = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState({
    prediction: "N/A",
    suggestions: "N/A",
    remedies: "N/A",
  });
  const { t } = useTranslation(); // Initialize useTranslation
  const navigate = useNavigate(); // Initialize useNavigate

  // Initialize AOS
  AOS.init({ duration: 1000, once: true });

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image before submitting.");
      return;
    }

    setIsSubmitted(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://agriguard-server.onrender.com/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;

      setDiagnosisResult({
        prediction: result.prediction || "Unknown",
        suggestions: result.suggestions || "No suggestions available.",
        remedies: result.remedies || "No remedies available.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to analyze image. Please try again.");
    }

    setIsSubmitted(false);
  };

  // Handle order pesticides/medicines
  const handleOrder = () => {
    const user = localStorage.getItem("user"); // Check if user is logged in
    if (!user) {
      navigate("/auth"); // Redirect to Sign-In/Sign-Up page
    } else {
      navigate("/marketplace"); // Redirect to Marketplace page
    }
  };

  return (
    <section
      className="crop-diagnosis py-16 bg-gradient-to-r from-green-50 to-green-100"
      id="Diagnosis"
    >
      {/* Title Section */}
      <div className="title flex justify-center items-center gap-4 mt-12" data-aos="fade-up">
        <img src={TitleBorder1} alt="Border Top" className="w-16 md:w-24" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          {t("diagnosis.title")}
        </h2>
        <img src={TitleBorder2} alt="Border Bottom" className="w-16 md:w-24" />
      </div>

      {/* Diagnosis Container */}
      <div className="crop-diagnosis-container max-w-4xl mx-auto px-6 md:px-12 mt-12">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
          data-aos="fade-up"
        >
          {t("diagnosis.heading")}
        </h2>
        <h3
          className="text-lg md:text-xl text-gray-600 text-center mt-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("diagnosis.subheading")}
        </h3>

        {/* Description Section */}
        <div className="mt-8 space-y-6" data-aos="fade-up" data-aos-delay="200">
          <p className="text-gray-600">
            <strong>{t("diagnosis.howItWorks")}</strong>
          </p>
          <p className="text-gray-600">
            <strong>{t("diagnosis.whyChooseUs")}</strong>
          </p>
          <p className="text-gray-600">
            <strong>{t("diagnosis.tipsForBestResults.title")}</strong>
            <br />
            • {t("diagnosis.tipsForBestResults.tip1")}
            <br />
            • {t("diagnosis.tipsForBestResults.tip2")}
            <br />
            • {t("diagnosis.tipsForBestResults.tip3")}
          </p>
        </div>

        {/* Image Upload Form */}
        <motion.form
          id="cropDiagnosisForm"
          className="mt-12"
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <motion.label
            htmlFor="cropImage"
            className="custom-file-upload flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="file"
              id="cropImage"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <span className="text-gray-600">{fileName || t("diagnosis.chooseFile")}</span>
          </motion.label>
          <motion.button
            type="submit"
            className="w-full md:w-auto mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("diagnosis.submit")}
          </motion.button>
        </motion.form>

        {/* Submission Message */}
        {isSubmitted && (
          <motion.div
            className="mt-8 text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t("diagnosis.analyzingImage")}
          </motion.div>
        )}

        {/* Result Box */}
        {diagnosisResult.prediction !== "N/A" && (
          <motion.div
            className="crop-diagnosis-result mt-12 bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-2xl font-bold text-gray-800 mb-6">
              {t("diagnosis.diagnosisResults.title")}
            </h5>
            <p className="text-gray-600 mb-4">
              <strong>{t("diagnosis.diagnosisResults.prediction")}</strong> {diagnosisResult.prediction}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>{t("diagnosis.diagnosisResults.suggestions")}</strong> {diagnosisResult.suggestions}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>{t("diagnosis.diagnosisResults.remedies")}</strong> {diagnosisResult.remedies}
            </p>

            {/* Order Pesticides/Medicines Button */}
            <motion.button
              onClick={handleOrder}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("diagnosis.orderPesticides")}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CropDiagnosisSection;
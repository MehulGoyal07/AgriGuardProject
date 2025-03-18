import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
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

  return (
    <section
      className="crop-diagnosis py-16 bg-gradient-to-r from-green-50 to-green-100"
      id="Diagnosis"
    >
      {/* Title Section */}
      <div className="title flex justify-center items-center gap-4 mt-12" data-aos="fade-up">
        <img src={TitleBorder1} alt="Border Top" className="w-16 md:w-24" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Disease Diagnosis
        </h2>
        <img src={TitleBorder2} alt="Border Bottom" className="w-16 md:w-24" />
      </div>

      {/* Diagnosis Container */}
      <div className="crop-diagnosis-container max-w-4xl mx-auto px-6 md:px-12 mt-12">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
          data-aos="fade-up"
        >
          Get Your Crop Diagnosed with AgriGuard
        </h2>
        <h3
          className="text-lg md:text-xl text-gray-600 text-center mt-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Upload an Image and Get Instant Insights
        </h3>

        {/* Description Section */}
        <div className="mt-8 space-y-6" data-aos="fade-up" data-aos-delay="200">
          <p className="text-gray-600">
            <strong>How It Works:</strong> Upload a clear image of your crop, and our advanced AI
            model will analyze it to detect any potential diseases. You'll receive immediate feedback
            on the health of your crop, including detailed information about the condition, suggested
            actions, and remedies to address any issues.
          </p>
          <p className="text-gray-600">
            <strong>Why Choose Us:</strong> Our state-of-the-art technology leverages the latest in
            machine learning to provide accurate diagnoses and actionable insights. Whether you're a
            smallholder farmer or managing large fields, AgriGuard offers reliable support to ensure
            your crops stay healthy and productive.
          </p>
          <p className="text-gray-600">
            <strong>Tips for Best Results:</strong>
            <br />
            • Ensure your image is clear and well-lit.
            <br />
            • Try to capture the affected area of the crop.
            <br />
            • Avoid taking photos with excessive shadows or glare.
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
            <span className="text-gray-600">{fileName || "Choose File"}</span>
          </motion.label>
          <motion.button
            type="submit"
            className="w-full md:w-auto mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
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
            Analyzing your image... Please wait.
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
            <h5 className="text-2xl font-bold text-gray-800 mb-6">Diagnosis Results</h5>
            <p className="text-gray-600 mb-4">
              <strong>Prediction:</strong> {diagnosisResult.prediction}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Suggestions:</strong> {diagnosisResult.suggestions}
            </p>
            <p className="text-gray-600">
              <strong>Remedies:</strong> {diagnosisResult.remedies}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CropDiagnosisSection;

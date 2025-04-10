import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaDiagnoses, FaLeaf, FaShoppingCart, FaUpload } from 'react-icons/fa';
import { GiPlantRoots, GiPlantWatering } from 'react-icons/gi';
import { MdHealthAndSafety, MdOutlineScience } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Shared/Navbar';

const DiseaseDetectionPage = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad'
    });
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setDiagnosisResult(null); // Clear previous results when new file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image before submitting.");
      return;
    }

    setIsSubmitted(true);

    // Simulate API call (replace with your actual API call)
    setTimeout(() => {
      setDiagnosisResult({
        isPlant: true,
        plantProbability: 0.95,
        isHealthy: false,
        healthProbability: 0.25,
        diseases: [
          { name: "Powdery Mildew", probability: 0.87, description: "Fungal disease appearing as white powdery spots on leaves and stems." },
          { name: "Leaf Rust", probability: 0.65, description: "Causes orange-brown pustules on the undersides of leaves." }
        ]
      });
      setIsSubmitted(false);
    }, 2000);
  };

  const handleOrderRemedies = () => {
    const user = localStorage.getItem("user");
    navigate(user ? "/marketplace" : "/auth");
  };

  const features = [
    {
      icon: <MdOutlineScience className="text-4xl text-green-600" />,
      title: "AI-Powered Analysis",
      description: "Our deep learning models analyze images with laboratory-grade precision."
    },
    {
      icon: <GiPlantWatering className="text-4xl text-green-600" />,
      title: "50+ Crops Supported",
      description: "From staple crops to specialty plants, we've got you covered."
    },
    {
      icon: <MdHealthAndSafety className="text-4xl text-green-600" />,
      title: "Preventive Advice",
      description: "Get recommendations to prevent disease spread in your fields."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="mt-20 flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-700 to-green-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/path/to/leaf-pattern.png')] bg-repeat"></div>
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <FaDiagnoses className="text-6xl text-green-300" />
            </motion.div>
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              data-aos="fade-up"
            >
              AI-Powered Crop Disease Detection
            </h1>
            <p 
              className="text-xl max-w-3xl mx-auto mb-10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Upload a photo of your crop and get instant diagnosis with treatment recommendations
            </p>
          </div>
        </section>

        {/* Main Detection Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Upload Form */}
                <motion.div
                  className="bg-gray-50 p-8 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Crop Image</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <motion.label
                      htmlFor="cropImage"
                      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-all"
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
                      <FaUpload className="text-4xl text-gray-400 mb-4" />
                      <span className="text-gray-600 text-center">
                        {fileName || "Click to select an image of your crop"}
                      </span>
                    </motion.label>

                    {preview && (
                      <motion.div
                        className="mt-6 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={preview}
                          alt="Selected preview"
                          className="max-w-full h-48 object-contain rounded shadow-md border border-gray-200"
                        />
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={!file || isSubmitted}
                      className={`w-full mt-6 px-8 py-3 rounded-lg font-semibold flex items-center justify-center ${
                        !file || isSubmitted
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      } transition-all`}
                      whileHover={{ scale: !file || isSubmitted ? 1 : 1.05 }}
                      whileTap={{ scale: !file || isSubmitted ? 1 : 0.95 }}
                    >
                      {isSubmitted ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FaDiagnoses className="mr-2" />
                          Analyze Image
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips for Best Results:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Take photos in natural daylight for best clarity
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Focus on affected leaves or stems
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Include both healthy and affected areas if possible
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Results Panel */}
                <div>
                  {diagnosisResult ? (
                    <motion.div
                      className="bg-white p-8 rounded-xl shadow-lg border border-green-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <FaDiagnoses className="text-green-600 mr-3" />
                        Diagnosis Results
                      </h2>

                      <div className="space-y-6">
                        <div className={`p-4 rounded-lg ${
                          diagnosisResult.isPlant ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                          <h3 className="font-semibold flex items-center">
                            <FaLeaf className={`mr-2 ${diagnosisResult.isPlant ? 'text-green-600' : 'text-red-600'}`} />
                            Plant Detection
                          </h3>
                          <p className="mt-1">
                            {diagnosisResult.isPlant ? (
                              <span className="text-green-700">Plant detected ({(diagnosisResult.plantProbability * 100).toFixed(1)}% confidence)</span>
                            ) : (
                              <span className="text-red-700">No plant detected in the image</span>
                            )}
                          </p>
                        </div>

                        {diagnosisResult.isPlant && (
                          <>
                            <div className={`p-4 rounded-lg ${
                              diagnosisResult.isHealthy ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
                            }`}>
                              <h3 className="font-semibold flex items-center">
                                <MdHealthAndSafety className={`mr-2 ${diagnosisResult.isHealthy ? 'text-green-600' : 'text-amber-600'}`} />
                                Plant Health
                              </h3>
                              <p className="mt-1">
                                {diagnosisResult.isHealthy ? (
                                  <span className="text-green-700">Healthy plant ({(diagnosisResult.healthProbability * 100).toFixed(1)}% confidence)</span>
                                ) : (
                                  <span className="text-amber-700">Unhealthy plant detected ({(diagnosisResult.healthProbability * 100).toFixed(1)}% confidence)</span>
                                )}
                              </p>
                            </div>

                            {!diagnosisResult.isHealthy && diagnosisResult.diseases.length > 0 && (
                              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <h3 className="font-semibold flex items-center text-red-700">
                                  <GiPlantRoots className="mr-2 text-red-600" />
                                  Detected Diseases
                                </h3>
                                <div className="mt-3 space-y-4">
                                  {diagnosisResult.diseases.map((disease, index) => (
                                    <div key={index} className="p-3 bg-white rounded border border-gray-200">
                                      <h4 className="font-medium text-gray-800">
                                        {disease.name} ({(disease.probability * 100).toFixed(1)}% confidence)
                                      </h4>
                                      <p className="text-sm text-gray-600 mt-1">{disease.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {diagnosisResult.isPlant && !diagnosisResult.isHealthy && (
                          <motion.button
                            onClick={handleOrderRemedies}
                            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <FaShoppingCart className="mr-2" />
                            Order Recommended Treatments
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="bg-gray-50 p-8 rounded-xl shadow-md h-full flex flex-col items-center justify-center text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FaDiagnoses className="text-5xl text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Analysis Results Will Appear Here</h3>
                      <p className="text-gray-500">Upload an image of your crop to get started with disease detection</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">
                Why Choose Our AI Diagnosis?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Advanced technology designed specifically for agricultural needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
              Protect Your Crops Today
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="200">
              Early detection can save your entire harvest. Try our AI diagnosis now.
            </p>
            <motion.button
              onClick={() => document.getElementById('cropImage')?.click()}
              className="bg-white text-green-800 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Upload Crop Image
            </motion.button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DiseaseDetectionPage;
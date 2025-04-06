"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";

const guidelines = [
  {
    title: "Healthy Eating",
    description: "Maintain a balanced diet to keep your sugar levels stable.",
    fullDescription:
      "Eating healthy is one of the most effective ways to manage diabetes. Focus on whole foods like vegetables, fruits, whole grains, and lean proteins. Fiber-rich foods help regulate blood sugar levels, while healthy fats from nuts and seeds support heart health. Avoid processed foods, excessive sugar, and trans fats, as they can lead to blood sugar spikes. Meal planning and portion control also play a significant role in maintaining stable glucose levels.",
    image: "/images/guidelines/healthy-eating.jpg",
  },
  {
    title: "Regular Exercise",
    description: "Engage in physical activities to enhance insulin sensitivity.",
    fullDescription:
      "Regular physical activity is essential for diabetes management. Engaging in exercises like walking, jogging, cycling, or strength training improves insulin sensitivity and helps maintain a healthy weight. Exercise also reduces stress and enhances cardiovascular health. Experts recommend at least 150 minutes of moderate-intensity exercise per week, which can be broken down into manageable sessions. Simple lifestyle changes, like taking the stairs or stretching during breaks, can also make a significant impact. Always consult a healthcare provider before starting a new workout routine.",
    image: "/images/guidelines/exercise.jpg",
  },
  {
    title: "Monitor Blood Sugar",
    description: "Regular monitoring helps maintain a healthy glucose level.",
    fullDescription:
      "Keeping track of blood sugar levels is essential for diabetes management. Regular monitoring helps identify patterns, prevent complications, and adjust diet, exercise, or medication accordingly. Use a glucometer or a continuous glucose monitor (CGM) to check your levels as recommended by your healthcare provider. Maintaining a log of readings can help in detecting trends and ensuring better control. Monitoring before and after meals, workouts, or stressful events provides valuable insights into how different factors impact blood sugar. Consistency is key to staying healthy and avoiding sudden spikes or drops.",
    image: "/images/guidelines/blood-sugar.jpg",
  },
  {
    title: "Stay Hydrated",
    description: "Drinking enough water helps regulate blood sugar.",
    fullDescription:
      "Proper hydration plays a vital role in diabetes management. Water helps flush out excess sugar through urine, preventing dehydration and sudden blood sugar spikes. Aim for at least 8 glasses (2 liters) of water per day, or more if you're active. Avoid sugary drinks like soda and fruit juices, as they can cause glucose levels to rise rapidly. Herbal teas and infused water are great alternatives. Keeping a water bottle handy and setting hydration reminders can help maintain consistent water intake throughout the day.",
    image: "/images/guidelines/hydration.jpg",
  },
];

const diseases = [
  {
    title: "Cardiovascular Disease",
    icon: "❤️",
    desc: "High blood sugar can damage blood vessels, leading to heart problems.",
    image: "/images/guidelines/cardiovascular.jpeg",
    fullText: [
      "✅ Control Blood Sugar: Maintain a normal glucose level to prevent artery damage.",
      "✅ Heart-Healthy Diet: Eat fiber-rich foods (oats, nuts, beans) and reduce saturated fats.",
      "✅ Exercise Regularly: 30 minutes of daily walking helps reduce heart risks.",
      "✅ Monitor Blood Pressure & Cholesterol: Keep BP below 130/80 and LDL cholesterol low.",
      "✅ Quit Smoking & Limit Alcohol: Both increase heart disease risk.",
    ],
  },
  {
    title: "Neuropathy (Nerve Damage)",
    icon: "🦵",
    desc: "High blood sugar damages nerve endings, causing numbness and tingling.",
    image: "/images/guidelines/nerve_damage.jpeg",
    fullText: [
      "✅ Keep Blood Sugar in Check: A1C should be below 7% to prevent nerve damage.",
      "✅ Foot Care Routine: Inspect feet daily for cuts or sores. Keep them moisturized.",
      "✅ Stay Active: Regular movement improves blood circulation to nerves.",
      "✅ Pain Management: Use warm baths, gentle stretching, and doctor-approved medications.",
    ],
  },
  {
    title: "Nephropathy (Kidney Disease)",
    icon: "🩸",
    desc: "Diabetes can weaken kidney function, leading to kidney failure over time.",
    image: "/images/guidelines/kidney_damage.jpeg",
    fullText: [
      "✅ Control Blood Sugar & Blood Pressure: Target BP below 130/80, A1C below 7%.",
      "✅ Low-Sodium Diet: Avoid processed foods, salty snacks, and red meat.",
      "✅ Drink More Water: Keeps kidneys functioning properly.",
      "✅ Regular Kidney Tests: Check urine protein levels every 6-12 months.",
      "✅ Avoid Overuse of Painkillers: NSAIDs (like ibuprofen) can harm kidneys over time.",
    ],
  },
  {
    title: "Retinopathy (Eye Disease)",
    icon: "👀",
    desc: "Diabetes can damage the retina, causing blurry vision or blindness.",
    image: "/images/guidelines/retinopathy.jpeg",
    fullText: [
      "✅ Regular Eye Exams: Get a retinal screening once a year.",
      "✅ Control Blood Sugar & Blood Pressure: Prevents further eye damage.",
      "✅ Eat Eye-Friendly Foods: Leafy greens (spinach, kale), Vitamin A-rich foods (carrots, fish, eggs).",
      "✅ Use Proper Lighting & Reduce Screen Time: Protects eye health.",
      "✅ Report Any Vision Changes Immediately: Blurriness, floaters, or dark spots need urgent attention.",
    ],
  },
];

const Guidelines = () => {
  useEffect(() => {
    document.title = "Guidelines | Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Guidelines to make your health better.");

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedGuideline(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const [expandedGuideline, setExpandedGuideline] = useState<number | null>(null);
  const [expandedDisease, setExpandedDisease] = useState<number | null>(null);
  
  return (
    <>
      <Breadcrumb
        pageName="GuideLines"
        description="Our diabetes detection tool helps you assess your risk of diabetes by analyzing key health indicators."
      />

      <section id="guidelines" className="pt-8 md:pt-10 lg:pt-14 relative">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Guidelines to Improve Your Health
        </h2>
        <p className="text-body-color mb-10 text-lg text-center">
          Follow these simple guidelines to make yourself healthier and control your diabetes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto relative">
          {guidelines.map((guide, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all dark:bg-gray-dark cursor-pointer relative z-10 hover:scale-[1.02]"
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: expandedGuideline === index ? 1.05 : 1,
                opacity: expandedGuideline !== null && expandedGuideline !== index ? 0.3 : 1,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpandedGuideline(expandedGuideline === index ? null : index)}
            >
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full object-cover rounded-t-2xl h-48"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-900">{guide.title}</h3>
                <p className="text-gray-500">{guide.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Card */}
        <AnimatePresence>
          {expandedGuideline !== null && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedGuideline(null)}
            >
              <motion.div
                className="bg-dark rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={guidelines[expandedGuideline].image}
                  alt={guidelines[expandedGuideline].title}
                  className="w-full h-80 object-cover rounded-t-2xl"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-900">
                    {guidelines[expandedGuideline].title}
                  </h3>
                  <p className="text-gray-400 mt-4">{guidelines[expandedGuideline].fullDescription}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Disease Guidelines Section */}
        <h2 className="text-3xl font-bold text-center mt-10">Diabetes-Related Diseases</h2>
        <p className="text-body-color mb-10 text-lg text-center">
          Learn about common complications of diabetes and how to manage them effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-6">
          {diseases.map((disease, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all dark:bg-gray-dark cursor-pointer relative z-10 hover:scale-[1.02]"
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: expandedDisease === index ? 1.05 : 1,
                opacity: expandedDisease !== null && expandedDisease !== index ? 0.3 : 1,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpandedDisease(expandedDisease === index ? null : index)}
            > 
            
              <div className="flex items-center p-5">
                <span className="text-3xl mr-3">{disease.icon}</span>
                <h3 className="text-xl font-semibold">{disease.title}</h3>
              </div>
              <p className="text-gray-600 px-5 pb-5">{disease.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Expanded Disease Card Modal */}
        <AnimatePresence>
          {expandedDisease !== null && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedDisease(null)}
            >
              <motion.div
                className="bg-dark rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
              <img
                  src={diseases[expandedDisease].image}
                  alt={diseases[expandedDisease].title}
                  className="w-full h-80 object-cover rounded-t-2xl"
              />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-900">
                    {diseases[expandedDisease].icon} {diseases[expandedDisease].title}
                  </h3>
                  <p className="text-gray-400 mt-4">{diseases[expandedDisease].desc}</p>
                  <div className="mt-4 text-left">
                    {diseases[expandedDisease].fullText.map((point, i) => (
                      <p key={i} className="text-gray-400 mb-2">✔ {point}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


      </section>
    </>
  );
};

export default Guidelines;

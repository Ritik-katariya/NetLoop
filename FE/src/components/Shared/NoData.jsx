import React from "react";
import { Card } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NoData = () => {
  return (
    <Card className="bg-transparent shadow-none flex flex-col items-center justify-center w-full h-full text-center">
      <div className="relative flex items-center justify-center w-40 h-40 sm:w-56 sm:h-56">
        {/* Outer Circle */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-cyan-400 shadow-lg"
              style={{
                top: "45%",
                left: "46%",
                transform: `rotate(${index * 30}deg) translate(90px)`,
                opacity: 1 - index * 0.07,
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>

        {/* Middle Circle */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          {[...Array(20)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-300 shadow-md"
              style={{
                top: "46%",
                left: "46%",
                transform: `rotate(${index * 36}deg) translate(65px)`,
                opacity: 1 - index * 0.08,
              }}
            />
          ))}
        </motion.div>

        {/* Inner Circle */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-200"
              style={{
                top: "47%",
                left: "46%",
                transform: `rotate(${index * 45}deg) translate(40px)`,
                opacity: 1 - index * 0.09,
              }}
            />
          ))}
        </motion.div>

     
      </div>

      <motion.p
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent tracking-wide mt-4"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            textShadow: ["0 0 8px rgba(34,211,238,0.3)", "0 0 16px rgba(34,211,238,0.5)", "0 0 8px rgba(34,211,238,0.3)"]
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          Data Not Found
        </motion.p>
        
        <Link to="/">
          <motion.div
            className="flex items-center justify-center gap-2 text-cyan-700 hover:text-cyan-500 transition-colors"
            whileHover={{ gap: "12px" }}
          >
            <span className="font-medium text-lg sm:text-xl">Return to Home Base</span>
            <motion.span
              className="text-2xl"
              animate={{ x: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.div>
        </Link>
    </Card>
  );
};

export default NoData;

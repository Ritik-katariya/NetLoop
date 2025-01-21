// import React, { useState } from 'react';
// import { 
//   PlusIcon, 
//   LinkIcon, 
//   PaletteIcon, 
//   TypeIcon, 
//   SmileIcon, 
//   EyeIcon, 
//   CopyIcon, 
//   CheckIcon 
// } from "lucide-react";

// const PromotionCreator = () => {
//   const [promotions, setPromotions] = useState([]);
//   const [currentPromotion, setCurrentPromotion] = useState({
//     backgroundColor: '#FF5733',
//     textColor: '#FFFFFF',
//     text: '',
//     emoji: '',
//     link: '',
//   });
//   const [isPreview, setIsPreview] = useState(false);
//   const [copiedIndex, setCopiedIndex] = useState(null);

//   const predefinedColors = [
//     '#FF5733', '#33FF57', '#3357FF', '#FF33F6', 
//     '#33FFF6', '#F6FF33', '#FF3333', '#33FF33'
//   ];

//   const predefinedEmojis = ['🎉', '🎨', '🎁', '💫', '⭐', '🔥', '💎', '🎯'];

//   const handleCreate = () => {
//     if (currentPromotion.text.trim()) {
//       setPromotions([...promotions, { ...currentPromotion, id: Date.now() }]);
//       setCurrentPromotion({
//         backgroundColor: '#FF5733',
//         textColor: '#FFFFFF',
//         text: '',
//         emoji: '',
//         link: '',
//       });
//     }
//   };

//   const handleCopyLink = (link, index) => {
//     navigator.clipboard.writeText(link);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   const PromotionCard = ({ promotion, index }) => (
//     <div 
//       className="relative group rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-102"
//       style={{ backgroundColor: promotion.backgroundColor }}
//     >
//       <div className="p-6">
//         <div 
//           className="text-xl mb-4"
//           style={{ color: promotion.textColor }}
//         >
//           {promotion.emoji && <span className="mr-2">{promotion.emoji}</span>}
//           {promotion.text}
//         </div>
//         {promotion.link && (
//           <div className="flex items-center gap-2">
//             <LinkIcon size={16} style={{ color: promotion.textColor }} />
//             <a 
//               href={promotion.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//               style={{ color: promotion.textColor }}
//             >
//               {promotion.link}
//             </a>
//             <button
//               onClick={() => handleCopyLink(promotion.link, index)}
//               className="ml-auto p-2 rounded-full hover:bg-white/20 transition-colors"
//             >
//               {copiedIndex === index ? (
//                 <CheckIcon size={16} style={{ color: promotion.textColor }} />
//               ) : (
//                 <CopyIcon size={16} style={{ color: promotion.textColor }} />
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Creator Section */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold">Create Promotion</h2>
//           <button
//             onClick={() => setIsPreview(!isPreview)}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
//           >
//             <EyeIcon size={20} />
//             {isPreview ? 'Edit' : 'Preview'}
//           </button>
//         </div>

//         {!isPreview ? (
//           <div className="space-y-6">
//             {/* Color Selection */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 text-gray-700">
//                 <PaletteIcon size={20} />
//                 Background Color
//               </label>
//               <div className="flex gap-2 flex-wrap">
//                 {predefinedColors.map((color) => (
//                   <button
//                     key={color}
//                     onClick={() => setCurrentPromotion({ ...currentPromotion, backgroundColor: color })}
//                     className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
//                       currentPromotion.backgroundColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
//                     }`}
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//                 <input
//                   type="color"
//                   value={currentPromotion.backgroundColor}
//                   onChange={(e) => setCurrentPromotion({ ...currentPromotion, backgroundColor: e.target.value })}
//                   className="w-8 h-8"
//                 />
//               </div>
//             </div>

//             {/* Text Color Selection */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 text-gray-700">
//                 <TypeIcon size={20} />
//                 Text Color
//               </label>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPromotion({ ...currentPromotion, textColor: '#FFFFFF' })}
//                   className={`w-8 h-8 rounded-full bg-gray-900 transition-transform hover:scale-110 ${
//                     currentPromotion.textColor === '#FFFFFF' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
//                   }`}
//                 />
//                 <button
//                   onClick={() => setCurrentPromotion({ ...currentPromotion, textColor: '#000000' })}
//                   className={`w-8 h-8 rounded-full bg-white border border-gray-200 transition-transform hover:scale-110 ${
//                     currentPromotion.textColor === '#000000' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
//                   }`}
//                 />
//                 <input
//                   type="color"
//                   value={currentPromotion.textColor}
//                   onChange={(e) => setCurrentPromotion({ ...currentPromotion, textColor: e.target.value })}
//                   className="w-8 h-8"
//                 />
//               </div>
//             </div>

//             {/* Emoji Selection */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 text-gray-700">
//                 <SmileIcon size={20} />
//                 Add Emoji
//               </label>
//               <div className="flex gap-2 flex-wrap">
//                 {predefinedEmojis.map((emoji) => (
//                   <button
//                     key={emoji}
//                     onClick={() => setCurrentPromotion({ ...currentPromotion, emoji })}
//                     className={`w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors ${
//                       currentPromotion.emoji === emoji ? 'ring-2 ring-blue-500' : ''
//                     }`}
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Text Input */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 text-gray-700">
//                 <TypeIcon size={20} />
//                 Promotion Text
//               </label>
//               <textarea
//                 value={currentPromotion.text}
//                 onChange={(e) => setCurrentPromotion({ ...currentPromotion, text: e.target.value })}
//                 placeholder="Enter your promotion text..."
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows={3}
//               />
//             </div>

//             {/* Link Input */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 text-gray-700">
//                 <LinkIcon size={20} />
//                 Link (Optional)
//               </label>
//               <input
//                 type="url"
//                 value={currentPromotion.link}
//                 onChange={(e) => setCurrentPromotion({ ...currentPromotion, link: e.target.value })}
//                 placeholder="https://example.com"
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               onClick={handleCreate}
//               className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
//             >
//               <PlusIcon size={20} />
//               Create Promotion
//             </button>
//           </div>
//         ) : (
//           <PromotionCard promotion={currentPromotion} />
//         )}
//       </div>

//       {/* Display Section */}
//       {promotions.length > 0 && (
//         <div className="space-y-6">
//           <h2 className="text-2xl font-bold">Your Promotions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {promotions.map((promotion, index) => (
//               <PromotionCard key={promotion.id} promotion={promotion} index={index} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PromotionCreator;